import validator from "validator";

function validateEmailVerify(data) {
  const errors = {};

  // Check if password is empty
  if (!data.otp || validator.isEmpty(data.otp.trim())) {
    errors.otp = "Password is required.";
  }

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

export default validateEmailVerify;
