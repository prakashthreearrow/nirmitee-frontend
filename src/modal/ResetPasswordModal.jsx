import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import validateResetPassword from "../validation/resetPassword";
import { resendOtp, resetPassword } from "../redux/actions";

const ResetPasswordModal = ({ isOpenResetPassword, onCloseResetPassword, onCloseForgotPassword, email }) => {
  const [form, setForm] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const dispatch = useDispatch();

  // Create refs for each OTP input
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

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

  const handleOtpChange = (e, index) => {
    const { name, value } = e.target;
    if (value.length === 1 && index < 3) {
      otpRefs[index + 1].current.focus(); // Move focus to next input
    }
    const newOtp = form.otp.split("");
    newOtp[index] = value;
    setForm({ ...form, otp: newOtp.join("") });
    setError((prevState) => ({
      ...prevState,
      [name]: "", // Clear error for the specific field
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { errors, isValid } = validateResetPassword(form);
    if (!isValid) {
      setError(errors);
      return;
    }
    if (isValid) {
      setLoading(true);
      let formPayload = {
        otp: form.otp,
        password: form.password,
        email: email,
      }
      dispatch(
        resetPassword({
          data: formPayload,
          callback: (data) => {
            if (data?.meta?.code === 200) {
              setLoading(false);
              onCloseResetPassword(false);
              onCloseForgotPassword(false);
            }
          },
        })
      );
    }
  };

  const handleResendOtp = () => {
    setResendLoading(true);
    dispatch(
      resendOtp({
        data: { email: email },
        callback: (data) => {
          setResendLoading(false);
          if (data?.meta?.code === 200) {
            // Reset OTP value in the form and focus back to the first input
            setForm((prevState) => ({
              ...prevState,
              otp: "", // Clear OTP value
            }));
          }
        },
      })
    );
  };

  if (!isOpenResetPassword) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              OTP (4 Digits)
            </label>
            <div className="flex space-x-2">
              {/* Create 4 input boxes for OTP */}
              {Array.from({ length: 4 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  name="otp"
                  value={form.otp[index] || ""}
                  onChange={(e) => handleOtpChange(e, index)}
                  maxLength="1"
                  className="w-12 p-2 border border-gray-300 rounded-md text-center"
                  placeholder="-"
                  ref={otpRefs[index]} // Attach ref to each input
                />
              ))}
            </div>
            {error.otp && (
              <div className="text-red-500 mt-2 text-sm">{error.otp}</div>
            )}
            <button
              type="button"
              disabled={resendLoading}
              onClick={handleResendOtp}
              className="mt-2 text-blue-500 hover:underline"
            >
              {resendLoading ? "Resending..." : "Resend OTP"}
            </button>
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
              Confirm Password
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
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            <button
              type="button"
              onClick={() => {
                onCloseResetPassword(false);
                onCloseForgotPassword(false);
              }}
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

export default ResetPasswordModal;