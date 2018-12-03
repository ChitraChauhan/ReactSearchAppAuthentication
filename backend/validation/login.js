const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (data.password) {
    if (!Validator.isLength(data.password, { min: 6 })) {
      errors.password = "Password must have 6 chars";
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = "Password is required";
    }
  }

  if (data.newPassword) {
    if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
      errors.password = "Password must have 6 chars";
    }

    if (Validator.isEmpty(data.newPassword)) {
      errors.password = "Password(new) is required";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
