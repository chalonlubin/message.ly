"use strict";

const { NotFoundError, BadRequestError } = require("../expressError");
const db = require("../db");
const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")

/** User of the site. */

class User {

  /** Register new user.
   *  Returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({ username, password, first_name, last_name, phone }) {
    await this.checkDupUsername(username);

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, phone, join_at, last_login_at)
         VALUES
           ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)
         RETURNING username, password, first_name, last_name, phone`,
      [username, hashedPassword, first_name, last_name, phone]);

    return result.rows[0];
  }

  /** Authenticate: is username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT password
         FROM users
         WHERE username = $1`,
      [username]);
  const user = result.rows[0];

  return (user && await bcrypt.compare(password, user.password) === true);
  // if (user) {
  //   if (await bcrypt.compare(password, user.password) === true) {
  //     return res.json({ message: "Logged in!" });
  //   }
  // }
  // throw new UnauthorizedError("Invalid user/password");
  }


  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    const result = await db.query(
      `UPDATE users
       SET last_login_at = current_timestamp
         WHERE username = $1
         RETURNING username, last_login_at`,
    [username]);
  const user = result.rows[0];

  if (!user) throw new NotFoundError(`No such user: ${username}`);

  return user;
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name}, ...] */

  static async all() {
    const results = await db.query(
      `SELECT username, first_name, last_name
       FROM users
       ORDER BY username`
    )
    return results.rows
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          last_login_at,
   *          join_at } */

  static async get(username) {
    const results = await db.query(
      `SELECT username,first_name,last_name,phone,join_at,last_login_at
       FROM users
       WHERE username = $1`,
       [username])

       const user = results.rows[0];

       if (!user) throw new NotFoundError(`No such user: ${username}`);

       return user;
  }

  static async checkDupUsername(username){
    const user = await db.query(
      `SELECT username
       FROM users
       WHERE username = $1`,
       [username])

    if(user.rows[0]){
      throw new BadRequestError(`Username ${username} is already taken.`)
    }
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(fromUser) {

    const results = await db.query(
      `SELECT m.id AS id,
              m.to_username,
              m.body,
              m.sent_at,
              m.read_at,
              u.username,
              u.first_name,
              u.last_name,
              u.phone
       FROM messages AS m
       JOIN users AS u ON m.to_username = u.username
       WHERE m.from_username = $1`,
      [fromUser]);

    const msgFrom = results.rows;

    if (!msgFrom) throw new NotFoundError(`No such user: ${username}`)

    return msgFrom.map(m => {
      return {
          id: m.id,
          body: m.body,
          read_at: m.read_at,
          sent_at: m.sent_at,
          to_user:{
            first_name: m.first_name,
            last_name: m.last_name,
            phone: m.phone,
            username: m.username
          }
        };
    })
  }



  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) {
    const results = await db.query(
      `SELECT m.id AS id,
              m.to_username,
              m.body,
              m.sent_at,
              m.read_at,
              u.username,
              u.first_name,
              u.last_name,
              u.phone
       FROM messages AS m
       JOIN users AS u ON m.from_username = u.username
       WHERE m.to_username = $1`,
      [username]);

    const msgTo = results.rows;

    return msgTo.map(m => {
      return {
          id: m.id,
          body: m.body,
          sent_at: m.sent_at,
          read_at: m.read_at,
          from_user:{
            first_name: m.first_name,
            last_name: m.last_name,
            phone: m.phone,
            username: m.username
          }
        };
    })
  }
}


module.exports = User;
