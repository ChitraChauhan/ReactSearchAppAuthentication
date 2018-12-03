const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.fullName = !isEmpty(data.fullName) ? data.fullName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password_confirm = !isEmpty(data.password_confirm)
    ? data.password_confirm
    : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 to 30 chars";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isLength(data.fullName, { min: 2, max: 30 })) {
    errors.fullName = "FullName must be between 2 to 30 chars";
  }

  if (Validator.isEmpty(data.fullName)) {
    errors.fullName = "FullName field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!Validator.isLength(data.phone, { min: 9, max: 11 })) {
    errors.phone = "Invalid Mobile No";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Mobile No is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (data.password_confirm) {
    if (!Validator.isLength(data.password_confirm, { min: 6, max: 30 })) {
      errors.password_confirm = "Password must have 6 chars";
    }

    if (!Validator.equals(data.password, data.password_confirm)) {
      errors.password_confirm = "Password and Confirm Password must match";
    }

    if (Validator.isEmpty(data.password_confirm)) {
      errors.password_confirm = "Password is required";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
