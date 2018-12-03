const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const User = require("../models/User");

// var flash = require("connect-flash");
// router.use(flash());
// const passport = require("passport");
// const Token = require("../models/Token");
// var uid = require("uid2");
// function generateToken(number) {
//   return uid(number);
// }

router.post("/register", function(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  /* find if user already exists.
      users must have unique email ids.. */
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.email =
        "User with email already exists!! Please enter another email address";
      return res.status(404).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        avatar
      });
      /* convert password into hash */
      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error("There was an error", err);
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.error("There was an error", err);
            else {
              newUser.password = hash;
              newUser.save().then(user => {
                res.json(user);
              });
            }
          });
        }
      });
    }
  });
});

router.get("/login", function(req, res) {
  User.find(function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

router.post(
  "/login",
  // passport.authenticate("jwt", {
  //   successRedirect: "/dashboard",
  //   failureRedirect: "/api/users/login",
  //   failureFlash: true
  // }),
  (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then(user => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      // issue a remember me cookie if the option was checked
      // if (!req.body.rememberMe) {
      //   return next();
      // }
      // if (req.body.rememberMe) {
      //   var token = generateToken(64);
      //   Token.save(token, { userId: user._id }, function(err, done) {
      //     if (err) {
      //       return done(err);
      //     }
      //     res.cookie("remembeMe", token, {
      //       path: "/",
      //       httpOnly: true,
      //       maxAge: 604800000
      //     }); // 7 days
      //     return next();
      //   });
      // }

      /* compare the req password with that in database by bcrypt */
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            fullName: user.fullName,
            phone: user.phone,
            avatar: user.avatar
          };
          jwt.sign(
            payload,
            "secret",
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) console.error("There is some error in token", err);
              else {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
                return res.redirect("/dashboard");
              }
            }
          );
        } else {
          errors.password = "Incorrect Password";
          return res.status(400).json(errors);
        }
      });
    });
  }
);

router.get("/editUser/:id", function(req, res) {
  User.find({ _id: req.params.id }, function(err, result) {
    if (err) {
      return res.send({ err });
    }
    res.json(result);
  });
});

router.put("/editUser/:id", function(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.send({ errors });
  }
  User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  })
    .then(user => {
      if (!user) {
        return res.sendStatus(404);
      }
      res.json(user);
    })
    .catch(err => {
      logger.error(err);
      // res.status(422).send(err.errors);
      res.send(err);
    });
});

router.post("/reset", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  const newPassword = req.body.newPassword;
  /* find user with the req email */
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    /* compare old password with the new one
        if yes then convert new password into 
        hash and store */
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          name: user.name,
          password: newPassword,
          avatar: user.avatar
        };
        bcrypt.genSalt(10, (err, salt) => {
          if (err) console.error("There was an error", err);
          else {
            bcrypt.hash(payload.password, salt, (err, hash) => {
              if (err) console.error("There was an error", err);
              else {
                payload.password = hash;
                User.findByIdAndUpdate({ _id: user.id }, payload, {
                  new: true
                }).then(user => {
                  if (!user) {
                    return res.sendStatus(404);
                  }
                  jwt.sign(
                    payload,
                    "secret",
                    {
                      expiresIn: 3600
                    },
                    (err, token) => {
                      if (err)
                        console.error("There is some error in token", err);
                      else {
                        res.json({
                          success: true,
                          token: `Bearer ${token}`,
                          payload
                        });
                        return res.redirect("/login");
                      }
                    }
                  );
                });
              }
            });
          }
        });
      } else {
        errors.password = "";
        return res.status(400).json(errors);
      }
    });
  });
});

router.post("/forgot", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const newPassword = req.body.newPassword;
  /* find user with the req email */
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    const payload = {
      name: user.name,
      password: newPassword,
      avatar: user.avatar
    };
    /* compare new password with the exisiting one
        if same then no need to update */
    bcrypt.compare(newPassword, user.password).then(isMatch => {
      if (isMatch) {
        errors.newPassword =
          "This Password is same as exisiting. Please login with this password!!";
        return res.status(404).json(errors);
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) console.error("There was an error", err);
          else {
            bcrypt.hash(payload.password, salt, (err, hash) => {
              if (err) console.error("There was an error", err);
              else {
                payload.password = hash;
                User.findByIdAndUpdate({ _id: user.id }, payload, {
                  new: true
                }).then(user => {
                  if (!user) {
                    return res.sendStatus(404);
                  }
                  jwt.sign(
                    payload,
                    "secret",
                    {
                      expiresIn: 3600
                    },
                    (err, token) => {
                      if (err)
                        console.error("There is some error in token", err);
                      else {
                        res.json({
                          success: true,
                          token: `Bearer ${token}`,
                          payload
                        });
                        return res.redirect("/login");
                      }
                    }
                  );
                });
              }
            });
          }
        });
      }
    });
  });
});

// router.get(
//   "/me",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     return res.json({
//       id: req.user.id,
//       name: req.user.name,
//       email: req.user.email
//     });
//   }
// );

module.exports = router;
