import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions';

export const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const logoutBtn = async() => {
    await dispatch(logout);
  }

  return (
    <nav className="bg-blue-700 shadow flex justify-between items-center h-20">
      <h1 className="text-4xl text-white ml-2">
        <Link to="/">Messact</Link>
      </h1>
      {isLoggedIn ? (
        <ul className="flex flex-row items-center text-white">
          <li className="mx-4">
            <Link
              className="text-xl hover:bg-blue-400 p-2 transition rounded-lg"
              to="/profile"
            >
              Profile
            </Link>
          </li>
          <li className="mx-4">
            <button className="text-xl hover:bg-blue-400 p-2 transition rounded-lg" onClick={logoutBtn}>
              Logout
            </button>
          </li>
        </ul>
      ) : (
        <ul className="flex flex-row text-white">
          <li className="mx-4">
            <Link
              className="text-xl hover:bg-blue-400 p-2 transition rounded-lg"
              to="/register"
            >
              Register
            </Link>
          </li>
          <li className="mx-4">
            <Link
              className="text-xl hover:bg-blue-400 p-2 transition rounded-lg"
              to="/login"
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};
