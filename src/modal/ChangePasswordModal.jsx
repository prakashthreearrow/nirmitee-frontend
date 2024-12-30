import React, { useState } from "react";
import validateChangePassword from "../validation/changePassword"; // Custom validation function

const ChangePasswordModal = ({ isOpenChangePassword, onCloseChangePassword, onSubmit, setLoading, loading }) => {
  const [form, setForm] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError((prevState) => ({
      ...prevState,
      [name]: "", // Clear error for the specific field
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { errors, isValid } = validateChangePassword(form);
    if (!isValid) {
      setError(errors);
      return;
    }

    if (isValid) {
      setLoading(true);
      onSubmit(form);
    }
  };

  if (!isOpenChangePassword) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={form.oldPassword}
              onChange={changeHandler}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your old password"
            />
            {error.oldPassword && (
              <div className="text-red-500 mt-2 text-sm">{error.oldPassword}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={changeHandler}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter new password"
            />
            {error.password && (
              <div className="text-red-500 mt-2 text-sm">{error.password}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={changeHandler}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Confirm new password"
            />
            {error.confirmPassword && (
              <div className="text-red-500 mt-2 text-sm">{error.confirmPassword}</div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              disabled={loading}
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md"
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
            <button
              type="button"
              onClick={() => onCloseChangePassword(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
