import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { FaBars, FaTimes, FaHome, FaUserCog, FaEnvelope, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
    const { backendURL, setIsLoggedIn } = useContext(AppContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);

    // ✅ Sidebar Menu Items
    const menuItems = [
        { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
        { name: "Applications", path: "/applications", icon: <FaUserCog /> },
        { name: "Vacate Requests", path: "/vacate-requests", icon: <FaEnvelope /> },
        { name: "Messages", path: "/messages", icon: <FaEnvelope /> },
    ];

    return (
        <div className={`h-screen ${isOpen ? "w-64" : "w-20"}  text-blue-500 fixed top-0 left-0 transition-all duration-300 shadow-lg`}>
            {/* Sidebar Toggle */}
            <div className="flex items-center justify-between p-4">
                <button className="text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Menu Items */}
            <nav className="mt-5">
                {menuItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-5 py-3 text-lg transition-all duration-200 ${
                                isActive ? "bg-blue-600" : "hover:bg-gray-800"
                            }`
                        }
                    >
                        <span className="text-xl">{item.icon}</span>
                        {isOpen && <span>{item.name}</span>}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
