const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const config = require("./db");
const users = require("./routes/user");
const profiles = require("./routes/profile");
var cors = require("cors");
var cookieParser = require("cookie-parser");

// const User = require("./models/User");
// const bcrypt = require("bcryptjs");
// const LocalStrategy = require("passport-local").Strategy;
// const Token = require("./models/Token");
// const RememberMeStrategy = require("passport-remember-me").Strategy;
// var utils = require("npm-utils");

mongoose
  .connect(
    config.DB,
    { useNewUrlParser: true }
  )
  .then(
    () => {
      console.log("Database is connected");
    },
    err => {
      console.log("Can not connect to the database" + err);
    }
  );

const app = express();

app.use(
  require("express-session")({
    secret: "Sky",
    resave: false,
    saveUninitialized: false
  })
);
app.use(cookieParser());

app.use(passport.initialize());
require("./passport")(passport);
app.use(passport.session());

// app.use(passport.authenticate("remember-me"));
// passport.use(
//   new LocalStrategy(function(username, password, done) {
//     User.getUserByEmail(username, function(error, results) {
//       if (error) throw error;

//       bcrypt.compare(password, results[0].password, function(err, res) {
//         if (res === true) {
//           return done(null, results[0]);
//         } else {
//           return done(null, false, { message: "Invalid password" });
//         }
//       });
//     });
//   })
// );
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
// passport.deserializeUser(function(id, done) {
//   console.log(id);
//   User.getUserById(id, function(error, results) {
//     if (error) throw error;
//     done(error, results[0]);
//   });
// });

app.use(
  cors({
    credentials: true
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/profiles", profiles);

app.get("/", function(req, res) {
  res.send("hello");
});

// passport.use(
//   new RememberMeStrategy(
//     function(token, done) {
//       Token.consume(token, function(err, user) {
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           return done(null, false);
//         }
//         return done(null, user);
//       });
//     },
//     function(user, done) {
//       var token = utils.generateToken(64);
//       Token.save(token, { userId: user.id }, function(err) {
//         if (err) {
//           return done(err);
//         }
//         return done(null, token);
//       });
//     }
//   )
// );

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
