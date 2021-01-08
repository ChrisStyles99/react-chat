import React from 'react';
import {Link} from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-blue-700 shadow flex justify-between items-center h-20">
      <h1 className="text-4xl text-white ml-2"><Link to="/">Messact</Link></h1>
      <ul className="flex flex-row text-white">
        <li className="mx-4"><Link className="text-xl hover:bg-blue-400 p-2 transition rounded-lg" to="/register">Register</Link></li>
        <li className="mx-4"><Link className="text-xl hover:bg-blue-400 p-2 transition rounded-lg" to="/login">Login</Link></li>
      </ul>
    </nav>
  )
}
