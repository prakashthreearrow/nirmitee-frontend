import validator from "validator";

function validateForgotPassword(data) {
  const errors = {};

  // Check if email is empty or invalid
  if (!data.email || validator.isEmpty(data.email.trim())) {
    errors.email = "Email is required.";
  } else if (!validator.isEmail(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0, // `isValid` is true if there are no errors
  };
}

export default validateForgotPassword;
