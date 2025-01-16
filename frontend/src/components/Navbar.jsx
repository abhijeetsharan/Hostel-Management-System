import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import dropdown from '../assets/dropdown_icon.svg';
import logo from '../assets/bitlogo.png';
import menu from '../assets/menu_icon.svg'
import cross from '../assets/cross_icon.png'

const Navbar = () => {
  const location = useLocation();

  // Paths where the Navbar should not be displayed
  const excludedPaths = ['/login', '/register'];
  if (excludedPaths.includes(location.pathname)) {
    return null;
  }

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/login');
  };

  const menuItems = [
    { to: '/', label: 'Home' },
    { to: '/application', label: 'Application Form' },
    { to: '/formstatus', label: 'Form Status' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300 bg-white shadow-md relative">
      {/* Left Navigation Items */}
      <div className="absolute left-0 flex items-center gap-5 ml-5 md:flex">
        {menuItems.map((item, index) => (
          <NavLink key={index} to={item.to} className="nav-item">
            <li className="py-1">{item.label}</li>
          </NavLink>
        ))}
      </div>

      <div className="mx-auto">
        <p className="font-bold text-2xl text-blue-800">Hostel Management System</p>
      </div>

      {/* Right Section (User Profile or Login) */}
      <div className="absolute right-0 flex items-center gap-4 mr-5">
        {token && userData ? (
          <div className="relative flex items-center gap-2 cursor-pointer group">
            {userData.image ? (
              <img className="w-8 rounded-full" src={userData.image} alt="User" />
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
            )}
            <img src={dropdown} alt="Dropdown icon" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-gray-50 rounded shadow-lg flex flex-col gap-4 p-4">
                <p onClick={() => navigate('/my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={() => navigate('/my-applications')} className="hover:text-black cursor-pointer">My Applications</p>
                <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-blue-600 transition-colors"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={menu} alt="Menu" />
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${showMenu ? 'fixed w-full top-0 right-0 bottom-0 bg-white z-20' : 'h-0 w-0'} overflow-hidden transition-all duration-300`}>
        <div className='flex items-center justify-between px-5 py-6'>
          <img src={logo} className='w-16' alt="Logo" />
          <img onClick={() => setShowMenu(false)} src={cross} className='w-7 cursor-pointer' alt="Close Icon" />
        </div>
        <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium">
          <NavLink onClick={() => setShowMenu(false)} to="/" className="menu-item">
            <p className="px-4 py-2 rounded-full inline-block">Home</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/application" className="menu-item">
            <p className="px-4 py-2 rounded-full inline-block">Application Form</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/formstatus" className="menu-item">
            <p className="px-4 py-2 rounded-full inline-block">Form Status</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/contact" className="menu-item">
            <p className="px-4 py-2 rounded-full inline-block">Contact</p>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
