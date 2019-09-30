// // const passport = require("passport");
// const LocalStrategy = require("passport-local");

// const db = require("../models");

// module.exports = passport => {
//   passport.use(
//     "local",
//     new LocalStrategy((username, password, done) => {
//       db.User.findOne({ name: username })
//         .then(user => {
//           console.log(user);
//           if (user.validatePassword(password, user.password)) {
//             return done(null, user);
//           }
//           return done(null, false, {
//             errors: { "username or password": "is invalid" }
//           });
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     })
//   );
// };
// // module.exports = passport;
