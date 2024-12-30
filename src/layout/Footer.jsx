// src/components/Footer.js
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-auto">
            <div className="text-center">
                <p>&copy; 2024 Your Website. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <button className="text-gray-400 hover:text-gray-300">Privacy Policy</button>
                    <button className="text-gray-400 hover:text-gray-300">Terms of Service</button>
                    <button className="text-gray-400 hover:text-gray-300">Contact Us</button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
