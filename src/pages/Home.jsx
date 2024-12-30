import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../layout/Footer";
import LoginModal from "../modal/LoginModal";
import SignUpModal from "../modal/SignUpModal";

const Home = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const isAuthenticated = useSelector((state) => state?.GetUserDetail?.userDetail);

    // If the user is authenticated, redirect them to the dashboard
    if (isAuthenticated?.meta?.code === 200) {
        return <Navigate to="/dashboard" />;
    }

    const toggleLoginPopup = (e) => {
        e.preventDefault();
        setIsLoginOpen(!isLoginOpen);
    };

    const toggleSignUpPopup = (e) => {
        e.preventDefault();
        setIsSignUpOpen(!isSignUpOpen);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Navbar with Login and Signup buttons */}
            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={(e) => toggleLoginPopup(e)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4"
                >
                    Login
                </button>
                <button onClick={(e) => toggleSignUpPopup(e)} className="bg-green-500 text-white py-2 px-4 rounded-md">
                    Sign Up
                </button>
            </div>

            {/* Hero Section */}
            <section className="flex items-center justify-center flex-grow bg-gradient-to-r from-blue-500 to-green-500 text-white">
                <div className="text-center px-6 md:px-12">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
                    <p className="text-lg mb-6">A professional platform for all your needs. Join us and explore amazing features!</p>
                    <button
                        onClick={toggleLoginPopup}
                        className="bg-white text-blue-500 py-2 px-6 rounded-md font-semibold"
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* Login Popup */}
            {isLoginOpen && (
                <LoginModal isOpen={isLoginOpen} onClose={setIsLoginOpen} />
            )}

            {/* SignUp Popup */}
            {isSignUpOpen && (
                <SignUpModal isOpen={isSignUpOpen} onClose={setIsSignUpOpen} />
            )}

            {/* Footer Component */}
            <Footer />
        </div>
    );
};

export default Home;