const express = require("express");
const profileRouter = express.Router();
const validateProfileRegisterInput = require("../validation/profile");
var Profile = require("../models/profileRegister");
var User = require("../models/User");
var parentProfile = require("../models/parentProfile");

profileRouter.get("/profileRegistration", function(req, res) {
  /* concat members from both the databases */
  Profile.find(function(err, result) {
    if (err) {
      res.send(err);
    } else {
      parentProfile.find(function(err, results) {
        if (err) {
          res.send(err);
        } else {
          res.json(result.concat(results));
        }
      });
    }
  });
});

profileRouter.post("/profileRegistration", function(req, res) {
  if (req.body.maritalStatus === "unmarried") {
    /* if status is unmarried..register the user in profile */
    const { errors, isValid } = validateProfileRegisterInput(req.body);
    if (!isValid) {
      // return res.status(400).json(errors);
      return res.send({ errors });
    }
    var newUser;
    /* find if user is already registered in profile
        by name, fathername, phone */
    Profile.findOne({
      name: req.body.name,
      "fathersName.name": req.body.fathersName.name,
      phone: req.body.phone
    }).then(user => {
      if (user) {
        return res.status(400).json({
          name: "This profile already exists"
        });
      } else {
        /* find if a requested user is a registered user */
        User.findOne({
          phone: req.body.phone
        }).then(user => {
          if (!user) {
            errors.phone = "please enter correct mobile no";
            return res.status(404).json(errors);
          } else {
            newUser = new Profile();
            newUser.name = req.body.name;
            newUser.fathersName = {
              name: req.body.fathersName.name,
              phone: req.body.fathersName.phone
            };
            newUser.age = req.body.age;
            newUser.address = req.body.address;
            newUser.phone = req.body.phone;
            newUser.gender = req.body.gender;
            newUser.occupation = req.body.occupation;
            newUser.maritalStatus = req.body.maritalStatus;
            newUser.userId = user._id;
            newUser.save(function(err, result) {
              if (err) {
                res.send(err);
              } else {
                //update the child in their parent profile-(not working)
                // parentProfile
                //   .findOne({
                //     name: req.body.fathersName.name,
                //     phone: req.body.fathersName.phone
                //   })
                //   .then(user => {
                //     if (user) {
                //       parentProfile
                //         .findByIdAndUpdate({ _id: user._id }, req.body, {
                //           new: true
                //         })
                //         .then(parent => {
                //           let i = parent.children.length;
                //           console.log("no of children", i);
                //           parent.children[++i] = newUser;
                //           console.log("parent user found", parent);
                //           res.json(result);
                //           return res.json(parent);
                //         });
                //     }
                //   });
                res.json(result);
              }
            });
          }
        });
      }
    });
  } else {
    /*if status is married..register the user in parentprofile */
    const { errors, isValid } = validateProfileRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    /* find if user is already registered in parentprofile
        by name, fathername, phone */
    parentProfile
      .findOne({
        name: req.body.name,
        "fathersName.name": req.body.fathersName.name,
        phone: req.body.phone
      })
      .then(user => {
        if (user) {
          return res.status(400).json({
            name: "This profile already exists"
          });
        } else {
          /* find if a requested user is a registered user */
          User.findOne({
            phone: req.body.phone
          }).then(user => {
            if (!user) {
              errors.phone = "please enter correct mobile no";
              return res.status(404).json(errors);
            } else {
              /* find childrens from profile table
                  as it contains only unmarried members */
              Profile.find({
                "fathersName.name": req.body.name,
                "fathersName.phone": req.body.phone
              }).then(profile => {
                console.log("profile", profile);
                newUser = new parentProfile();
                if (profile.length > 0) {
                  for (i = 0; i < profile.length; i++) {
                    newUser.children[i] = profile[i];
                  }
                }
                newUser.name = req.body.name;
                newUser.fathersName = {
                  name: req.body.fathersName.name,
                  phone: req.body.fathersName.phone
                };
                newUser.age = req.body.age;
                newUser.address = req.body.address;
                newUser.phone = req.body.phone;
                newUser.gender = req.body.gender;
                newUser.occupation = req.body.occupation;
                newUser.maritalStatus = req.body.maritalStatus;
                newUser.userId = user._id;
                newUser.save(function(err, result) {
                  if (err) {
                    res.send(err);
                  } else {
                    res.json(result);
                  }
                });
              });
            }
          });
        }
      });
  }
});

profileRouter.get("/editProfile/:id", function(req, res) {
  Profile.find({ _id: req.params.id }, function(err, result) {
    if (result.length > 0) {
      res.json(result);
    } else {
      parentProfile.find({ _id: req.params.id }, function(err, result) {
        if (err) {
          return res.send({ err });
        }
        if (result.length > 0) {
          res.json(result);
        }
      });
    }
    if (err) {
      return res.send({ err });
    }
  });
});

profileRouter.delete("/editProfile/:id", function(req, res) {
  Profile.remove({ _id: req.params.id }, function(err, result) {
    if (result.length > 0) {
      res.json(result);
    } else {
      parentProfile.remove({ _id: req.params.id }, function(err, result) {
        if (err) {
          res.send(err);
        }
        if (result.length > 0) {
          res.json(result);
        }
      });
    }
    if (err) {
      res.send(err);
    }
  });
});

profileRouter.put("/editProfile/:id", function(req, res) {
  const { errors, isValid } = validateProfileRegisterInput(req.body);
  if (!isValid) {
    return res.send({ errors });
  }
  if (req.body.maritalStatus === "unmarried") {
    Profile.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(user => {
        if (!user) {
          return res.sendStatus(404);
        }
        res.json(user);
      })
      .catch(err => {
        logger.error(err);
        // res.status(404).send(err);
        res.send(err);
      });
  } else {
    parentProfile
      .findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(user => {
        if (!user && req.body.maritalStatus === "married") {
          //delete the user from profile db
          Profile.remove({ _id: req.params.id }, function(err, result) {
            if (result.length > 0) {
              res.json(result);
            }
            if (err) {
              res.send(err);
            }
          });

          // add to the parentprofile db
          parentProfile
            .findOne({
              name: req.body.name,
              "fathersName.name": req.body.fathersName.name,
              phone: req.body.phone
            })
            .then(user => {
              if (user) {
                return res.status(400).json({
                  name: "This profile already exists"
                });
              } else {
                /* find if a requested user is a registered user */
                User.findOne({
                  phone: req.body.phone
                }).then(user => {
                  if (!user) {
                    errors.phone = "please enter correct mobile no";
                    return res.status(404).json(errors);
                  } else {
                    /* find childrens from profile table
                      as it contains only unmarried members */
                    Profile.find({
                      "fathersName.name": req.body.name,
                      "fathersName.phone": req.body.phone
                    }).then(profile => {
                      console.log("profile", profile);
                      var newUser = new parentProfile();
                      if (profile.length > 0) {
                        for (i = 0; i < profile.length; i++) {
                          newUser.children[i] = profile[i];
                        }
                      }
                      newUser.name = req.body.name;
                      newUser.fathersName = {
                        name: req.body.fathersName.name,
                        phone: req.body.fathersName.phone
                      };
                      newUser.age = req.body.age;
                      newUser.address = req.body.address;
                      newUser.phone = req.body.phone;
                      newUser.gender = req.body.gender;
                      newUser.occupation = req.body.occupation;
                      newUser.maritalStatus = req.body.maritalStatus;
                      newUser.userId = user._id;
                      newUser.save(function(err, result) {
                        if (err) {
                          res.send(err);
                        } else {
                          res.json(result);
                        }
                      });
                    });
                  }
                });
              }
            });
        } else if (!user) {
          return res.sendStatus(404);
        } else {
          res.json(user);
        }
      })
      .catch(err => {
        logger.error(err);
        // res.status(404).send(err);
        res.send(err);
      });
  }
});

//to see fathers detail
profileRouter.get("/fatherDetails/:name/:phone", function(req, res) {
  parentProfile.find(
    { name: req.params.name, phone: req.params.phone },
    function(err, result) {
      if (err) {
        return res.send({ err });
      }
      res.json(result);
    }
  );
});

module.exports = profileRouter;
