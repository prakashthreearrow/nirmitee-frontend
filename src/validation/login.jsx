import validator from "validator";

function validateLogin(data) {
  const errors = {};

  // Check if userName is empty or invalid
  if (!data.userName || validator.isEmpty(data.userName.trim())) {
    errors.userName = "UserName is required.";
  }
  // Check if password is empty
  if (!data.password || validator.isEmpty(data.password.trim())) {
    errors.password = "Password is required.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0, // `isValid` is true if there are no errors
  };
}

export default validateLogin;
