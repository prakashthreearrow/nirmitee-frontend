import validator from "validator";

function validateResetPassword(data) {
  const errors = {};

  // Check if password is empty
  if (!data.otp || validator.isEmpty(data.otp.trim())) {
    errors.otp = "Password is required.";
  }

  // Check if password is empty
  if (!data.password || validator.isEmpty(data.password.trim())) {
    errors.password = "Password is required.";
  }

  // Check if confirm password is empty
  if (!data.confirmPassword || validator.isEmpty(data.confirmPassword.trim())) {
    errors.confirmPassword = "Confirm password is required.";
  }

  // Check if confirm password is empty
  if (!data.confirmPassword || data.password.trim() !== data.confirmPassword.trim()) {
    errors.confirmPassword = "New password and confirm password should be same.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0, // `isValid` is true if there are no errors
  };
}

export default validateResetPassword;
