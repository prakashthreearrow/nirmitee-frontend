import React, { useState } from "react";
import { useDispatch } from "react-redux";
import validateSignUp from "../validation/registration"; // Add validation for sign-up
import { registration } from "../redux/actions"; // Add signUp action
import EmailVerifyModal from "./EmailVerifyModal";

const SignUpModal = ({ isOpen, onClose }) => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
    });
    const [isEmailVerifyOpen, setIsEmailVerifyOpen] = useState(false);

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
        const { errors, isValid } = validateSignUp(form);
        if (!isValid) {
            setError(errors);
            return;
        }
        if (isValid) {
            setLoading(true);
            dispatch(
                registration({
                    data: form,
                    callback: (data) => {
                        if (data?.meta?.code === 200) {
                            setIsEmailVerifyOpen(true); // Open Email Verification Modal
                            setLoading(false);
                        }
                    },
                })
            );
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {!isEmailVerifyOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="firstName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={changeHandler}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter your firstname"
                                />
                                {error.firstName && (
                                    <div className="text-red-500 mt-2 text-sm">{error.firstName}</div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="lastName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={changeHandler}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter your lastname"
                                />
                                {error.lastName && (
                                    <div className="text-red-500 mt-2 text-sm">{error.lastName}</div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="userName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    id="userName"
                                    name="userName"
                                    value={form.userName}
                                    onChange={changeHandler}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter your username"
                                />
                                {error.userName && (
                                    <div className="text-red-500 mt-2 text-sm">{error.userName}</div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
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
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
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
                                    Sign Up
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
                    </div>
                </div>
            )}
            {isEmailVerifyOpen && (
                <EmailVerifyModal
                    isOpenEmail={isEmailVerifyOpen}
                    onCloseEmail={setIsEmailVerifyOpen}
                    onClose={onClose}
                />
            )}
        </>
    );
};

export default SignUpModal;
