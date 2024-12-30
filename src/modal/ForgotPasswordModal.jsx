import React, { useState } from "react";
import { useDispatch } from "react-redux";
import validateForgotPassword from "../validation/forgotPassword";
import { forgotPassword } from "../redux/actions";
import ResetPasswordModal from "./ResetPasswordModal";

const ForgotPasswordModal = ({ isOpenForgotPassword, onCloseForgotPassword, onClose }) => {
  const [form, setForm] = useState({
    email: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    email: ""
  });
  const [isResetPasswordOpen, setResetPasswordOpen] = useState(false);

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setError((prevState) => ({
      ...prevState,
      [name]: "", // Clear error for the specific field
    }));
    setForm((prevState) => ({
      ...prevState,
      [name]: value, // Update form state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = validateForgotPassword(form);
    if (!isValid) {
      setError(errors);
      return;
    }
    if (isValid) {
      setLoading(true);
      dispatch(
        forgotPassword({
          data: form,
          callback: (data) => {
            setLoading(false);
            if (data?.meta?.code === 200) {
              setResetPasswordOpen(true);  // Open ResetPasswordModal
            }
          },
        })
      );
    }
  };

  if (!isOpenForgotPassword) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={changeHandler}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
            {error.email && (
              <div className="text-red-500 mt-2 text-sm">{error.email}</div>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white py-2 px-4 rounded-md w-full"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
        <button
          type="button"
          onClick={() => onCloseForgotPassword(false)}
          className="mt-4 text-gray-500 hover:text-gray-700 w-full text-center"
        >
          Close
        </button>
      </div>
      {isResetPasswordOpen && (
        <ResetPasswordModal
          isOpenResetPassword={isResetPasswordOpen}
          onCloseResetPassword={setResetPasswordOpen}
          onCloseForgotPassword={onCloseForgotPassword}
          email={form.email}
        />
      )}
    </div>
  );
};

export default ForgotPasswordModal;
