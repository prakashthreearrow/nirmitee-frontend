import React, { useState } from 'react';
import validateEditProfile from "../validation/editProfile";

const ProfileModal = ({ isOpen, onClose, onSubmit, setLoading, loading }) => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        image: null,
    });

    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        imageUrl: null,
        imageFile: null,
    });

    const profileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prevForm) => ({
                ...prevForm,
                imageFile: file,
            }));
            setError((prevState) => ({
                ...prevState,
                imageFile: "",
            }));

            const reader = new FileReader();
            reader.onload = () => {
                setForm((prevForm) => ({
                    ...prevForm,
                    imageUrl: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                imageUrl: null,
                imageFile: null,
            }));
        }
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
        setError((prevError) => ({
            ...prevError,
            [name]: '', // Clear error for the specific field
        }));
    };

    const handleSubmit = () => {
        const { errors, isValid } = validateEditProfile(form);
        if (!isValid) {
            setError(errors);
            return;
        }
        if (isValid) {
            setLoading(true);
            onSubmit(form);
            onClose(false); // Close the modal
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Update Your Profile</h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={form.firstName}
                            onChange={changeHandler}
                            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            placeholder="Enter your first name"
                        />
                        {error.firstName && (
                            <div className="text-red-500 mt-2 text-sm">{error.firstName}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={form.lastName}
                            onChange={changeHandler}
                            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            placeholder="Enter your last name"
                        />
                        {error.lastName && (
                            <div className="text-red-500 mt-2 text-sm">{error.lastName}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Profile Image
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={profileChangeHandler}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <button
                                type="button"
                                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 flex justify-center items-center"
                            >
                                {form.imageUrl ? (
                                    <img
                                        src={form.imageUrl}
                                        alt="Profile Preview"
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="text-sm">Choose an Image</span>
                                )}
                            </button>
                        </div>
                        {error.image && (
                            <div className="text-red-500 mt-2 text-sm">{error.image}</div>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <button
                        onClick={() => onClose(false)}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300"
                    >
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;