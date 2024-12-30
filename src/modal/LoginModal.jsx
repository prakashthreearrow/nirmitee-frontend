import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import validateLogin from "../validation/login";
import { getUserDetail, login } from "../redux/actions";
import ForgotPasswordModal from "./ForgotPasswordModal";
import EmailVerifyModal from "./EmailVerifyModal";

const LoginModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    userName: "",
    password: "",
  });
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [isEmailVerifyOpen, setIsEmailVerifyOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    const { errors, isValid } = validateLogin(form);
    if (!isValid) {
      setError(errors);
      return;
    }
    if (isValid) {
      setLoading(true);
      dispatch(
        login({
          data: form,
          callback: (data) => {
            setLoading(false);
            if (data?.meta?.code === 200) {
              dispatch(getUserDetail());
              navigate("/dashboard"); // Redirect to the desired route
            } else {
              if (data?.data?.emailVerify === null) {
                setIsEmailVerifyOpen(true); // Open Email Verification Modal
              }
            }
          },
        })
      );
    }
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    setForgotPasswordOpen(true); // Open ForgotPasswordModal after closing LoginModal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
              Email/Username
            </label>
            <input
              type="userName"
              id="userName"
              name="userName"
              value={form.userName}
              onChange={changeHandler}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your email/username"
              autoComplete="userName"
            />
            {error.userName && (
              <div className="text-red-500 mt-2 text-sm">{error.userName}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={changeHandler}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              autoComplete="password"
            />
            {error.password && (
              <div className="text-red-500 mt-2 text-sm">{error.password}</div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <button
              disabled={loading}
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
            <button
              type="button"
              onClick={() => onClose(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleForgotPasswordClick}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {isForgotPasswordOpen && (
        <ForgotPasswordModal
          isOpenForgotPassword={isForgotPasswordOpen}
          onCloseForgotPassword={setForgotPasswordOpen}
          onClose={onClose}
        />
      )}
      {isEmailVerifyOpen && (
        <EmailVerifyModal
          isOpenEmail={isEmailVerifyOpen}
          onCloseEmail={setIsEmailVerifyOpen}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default LoginModal;
