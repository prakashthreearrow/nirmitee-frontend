import validator from "validator";

function validateRegistration(data) {
  const errors = {};

  // Check if firstname is empty
  if (!data.firstName || validator.isEmpty(data.firstName.trim())) {
    errors.firstName = "Firstname is required.";
  }

  // Check if lastName is empty
  if (!data.lastName || validator.isEmpty(data.lastName.trim())) {
    errors.lastName = "lastName is required.";
  }

  // Check if userName is empty
  if (!data.userName || validator.isEmpty(data.userName.trim())) {
    errors.userName = "userName is required.";
  }

  // Check if email is empty or invalid
  if (!data.email || validator.isEmpty(data.email.trim())) {
    errors.email = "Email is required.";
  } else if (!validator.isEmail(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
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

export default validateRegistration;
