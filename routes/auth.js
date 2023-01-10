"use strict";

const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");

const Router = require("express").Router;
const router = new Router();

/** POST auth/login: {username, password} => {token} */
router.post("/login", async function (req, res, next) {
  if (req.body === undefined) throw new BadRequestError();

  const { username, password } = req.body;
  const result = await User.authenticate(username, password);

  if (result) {
    let payload = { username };
    let token = jwt.sign(payload, SECRET_KEY);
    return res.json({ token });
  }

  throw new UnauthorizedError("Invalid user/password");
});

/** POST auth/register: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 */

module.exports = router;
