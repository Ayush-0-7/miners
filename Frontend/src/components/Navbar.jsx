import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaWallet } from "react-icons/fa";
import { GiWarPick } from "react-icons/gi";
import { auth } from './Firebase';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handlelogout = async() => {
    try {
      await auth.signOut();
      navigate('/');
      console.log("User Logged Out sucessfully.");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <GiWarPick className='text-3xl font-bold' />
          </span>
          <span className="font-bold font-sans">Miners</span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            <li>
              <Link to='/' className="text-sm font-semibold text-gray-800 hover:text-gray-900">Home</Link>
            </li>
            <li>
              <Link to='/about' className="text-sm font-semibold text-gray-800 hover:text-gray-900">About</Link>
            </li>
            <li>
              <button className="text-sm font-semibold text-gray-800 hover:text-gray-900" onClick={handlelogout}>LogOut</button>
            </li>
          </ul>
        </div>
        <div className="hidden lg:block">
          <Link to='/wallet'>
            <FaWallet className='text-2xl' />
          </Link>
        </div>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 cursor-pointer"
            >
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden px-4 pb-4">
          <ul className="space-y-4">
            <li>
              <Link to='/' className="block text-sm font-semibold text-gray-800 hover:text-gray-900">Home</Link>
            </li>
            <li>
              <Link to='/about' className="block text-sm font-semibold text-gray-800 hover:text-gray-900">About</Link>
            </li>
            <li>
              <Link to='/contact' className="block text-sm font-semibold text-gray-800 hover:text-gray-900">Contact</Link>
            </li>
            <li>
              <Link to='/wallet' className="block text-sm font-semibold text-gray-800 hover:text-gray-900">Wallet</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
