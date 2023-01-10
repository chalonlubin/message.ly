
const User = require("./models/user");
const Message = require("./models/message");


// CHALON KEEP THIS
let u2 = User.get("Michael")
.then(u2 => console.log("U2", u2));




// let michael = ({username: "Michael",
//               password: "abc123",
//               first_name: "Michael",
//               last_name: "Pappas",
//               phone: "541"});


// let chalon = ({username: "Chalon",
//               password: "123abc",
//               first_name: "Chalon",
//               last_name: "Lubin",
//               phone: "907"});

// let islandBoi = ({username: "IslandBoi",
//               password: "tacocat",
//               first_name: "Island",
//               last_name: "Boi",
//               phone: "211"});

// const dummyUsers = [michael, chalon, islandBoi]


// async function createUsers (users) {
//   for (let user of users) {
//     await User.register(user)
//     console.log(`${user.username} created`);
//   }
// }

// // createUsers(dummyUsers);


// Message.create({from_username: "Chalon", to_username: "Michael", body: "#1 From Chalon to Michael"});
// Message.create({from_username: "Michael", to_username: "Chalon", body: "#1 From Micheal to Chalon"});
// Message.create({from_username: "Michael", to_username: "Chalon", body: "#2 From Micheal to Chalon"});
// Message.create({from_username: "Michael", to_username: "IslandBoi", body: "From Micheal to IslandBoi"});
// Message.create({from_username: "Chalon", to_username: "Michael", body: "from Chalon to Michael"});



// // function createMessages (messages) {
// //   for (let message of messages) {
// //     Message.create(message)
// //     console.log(`${message} created`);
// //   }
// // }

// //** MESSAGES FROM (USER) */
// SELECT m.id,
//   m.to_username,
//   m.body,
//   m.sent_at,
//   m.read_at,
//   u.username,
//   u.first_name,
//   u.last_name,
//   u.phone
//   FROM messages AS m
//     JOIN users AS u ON m.to_username=u.username
//   WHERE from_username='Michael';

// // //** MESSAGES TO (USER) */
//   SELECT m.id,
//   m.to_username,
//   m.body,
//   m.sent_at,
//   m.read_at,
//   u.username,
//   u.first_name,
//   u.last_name,
//   u.phone
//   FROM messages AS m
//     JOIN users AS u ON m.from_username=u.username
//   WHERE to_username='Michael';

// TO NOTE: We have access to all of this so we can return the data as we see fit.






