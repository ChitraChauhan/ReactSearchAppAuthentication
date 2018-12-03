const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.fathersName.name = !isEmpty(data.fathersName.name)
    ? data.fathersName.name
    : "";
  data.fathersName.phone = !isEmpty(data.fathersName.phone)
    ? data.fathersName.phone
    : "";
  data.age = !isEmpty(data.age) ? data.age : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.occupation = !isEmpty(data.occupation) ? data.occupation : "";
  data.maritalStatus = !isEmpty(data.maritalStatus) ? data.maritalStatus : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 to 30 chars";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isLength(data.fathersName.name, { min: 2, max: 30 })) {
    errors.fathersName.name = "Fathers Name must be between 2 to 30 chars";
  }

  if (Validator.isEmpty(data.fathersName.name)) {
    errors.fathersName.name = "Fathers Name is required";
  }

  if (!Validator.isLength(data.fathersName.phone, { max: 11 })) {
    errors.fathersName.phone = "Invalid Mobile No";
  }

  if (Validator.isEmpty(data.fathersName.phone)) {
    errors.fathersName.phone = "Mobile No is required";
  }

  if (data.age === "") {
    errors.age = "Age field is required";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Address is required";
  }

  if (!Validator.isLength(data.phone, { max: 11 })) {
    errors.phone = "Invalid Mobile No";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Mobile No is required";
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender is required";
  }

  if (Validator.isEmpty(data.occupation)) {
    errors.occupation = "Occupation is required";
  }

  if (Validator.isEmpty(data.maritalStatus)) {
    errors.maritalStatus = "Marital Status is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
