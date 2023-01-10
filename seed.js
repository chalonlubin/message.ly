
const User = require("./models/user");
const Message = require("./models/message");

// User.register({username: "islandboi",
//               password: "testing",
//               first_name: "Island",
//               last_name: "Boi",
//               phone: "911"});

// let elie2 = await User.register({username: "elie2",
//                           password: "testing",
//                           first_name: "Elie",
//                           last_name: "Schoppick",
//                           phone: "911"});

Message.create({from_username: "michael", to_username: "Chalon", body: "message from micheal to chalon"});
Message.create({from_username: "michael", to_username: "islandboi", body: "message from micheal to islandboi"});
Message.create({from_username: "michael", to_username: "Kadeem", body: "message from micheal to kadeem"});




