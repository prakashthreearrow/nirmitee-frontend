import validator from "validator";

function validateEditProfile(data) {
  const errors = {};
  if (validator.isEmpty(data.firstName.trim()))
    errors.firstName = "Please enter the firstname.";
  if (validator.isEmpty(data.lastName.trim()))
    errors.lastName = "Please enter the lastname.";
  if (data.imageFile === null) errors.imageFile = "Please select the file.";
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateEditProfile;
