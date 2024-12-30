import validator from "validator";

function validateChangePassword(data) {
  const errors = {};

  // Check if old password is empty
  if (!data.oldPassword || validator.isEmpty(data.oldPassword.trim())) {
    errors.oldPassword = "Old password is required.";
  }

  // Check if password is empty
  if (!data.password || validator.isEmpty(data.password.trim())) {
    errors.password = "New password is required.";
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

export default validateChangePassword;
