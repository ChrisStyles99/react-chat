import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions';

export const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const [isActive, toggleSidebar] = useState(false);

  const logoutBtn = async () => {
    await dispatch(logout);
  };

  return (
    <nav className="bg-blue-700 shadow flex justify-between items-center h-20">
      <h1 className="text-4xl text-white ml-2">
        <Link to="/">Messact</Link>
      </h1>
      <svg onClick={() => toggleSidebar(!isActive)} className="w-8 h-8 mr-2 cursor-pointer md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      <ul className={`text-white block absolute left-0 top-20 bg-blue-700 h-full transform ${isActive ? 'translate-x-0' : '-translate-x-full'} transition md:translate-x-0 md:flex md:flex-row items-center md:static`}>
        {isLoggedIn ? (
          <>
            <li className="mx-5 md:mx-4 p-3 md:p-0">
              <Link
                className="text-xl hover:bg-blue-400 p-2 transition rounded-lg"
                to="/profile"
              >
                Profile
              </Link>
            </li>
            <li className="mx-5 md:mx-4 p-3 md:p-0">
              <button
                className="text-xl hover:bg-blue-400 p-2 transition rounded-lg"
                onClick={logoutBtn}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="mx-5 md:mx-4 p-3 md:p-0">
              <Link
                className="text-xl hover:bg-blue-400 p-2 transition rounded-lg"
                to="/register"
              >
                Register
              </Link>
            </li>
            <li className="mx-5 md:mx-4 p-3 md:p-0">
              <Link
                className="text-xl hover:bg-blue-400 p-2 transition rounded-lg"
                to="/login"
              >
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
