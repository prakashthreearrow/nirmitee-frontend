import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import validateEmailVerify from "../validation/emailVerify";
import validateResendOtp from "../validation/resendOtp";
import { emailVerify, resendOtp } from "../redux/actions";

const EmailVerifyModal = ({ isOpenEmail, onCloseEmail, onClose }) => {
  const [form, setForm] = useState({
    otp: "",
    email: "",
  });
  const [error, setError] = useState({
    otp: "",
    email: "",
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
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { errors, isValid } = validateEmailVerify(form);
    if (!isValid) {
      setError(errors);
      return;
    }
    if (isValid) {
      setLoading(true);
      dispatch(
        emailVerify({
          data: form,
          callback: (data) => {
            setLoading(false);
            if (data?.meta?.code === 200) {
              onCloseEmail(false);
              onClose(false);
            }
          },
        })
      );
    }
  };

  const handleResendOtp = () => {
    const { errors, isValid } = validateResendOtp(form);
    if (!isValid) {
      setError(errors);
      return;
    }
    if (isValid) {
      setResendLoading(true);
      dispatch(
        resendOtp({
          data: { email: form.email },
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
    }
  };

  if (!isOpenEmail) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Email Verify</h2>
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
              autoComplete="email"
            />
            {error.email && (
              <div className="text-red-500 mt-2 text-sm">{error.email}</div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <button
              disabled={loading}
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
            <button
              type="button"
              onClick={() => {
                onCloseEmail(false);
                onClose(false);
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

export default EmailVerifyModal;
