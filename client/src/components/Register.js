import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../actions';

export const Register = (props) => {

  const dispatch = useDispatch();
  const error = useSelector(state => state.registerError);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name === '' || username === '' || email === '' || password === '') {
      return
    }

    const user = {
      name,
      username,
      email,
      password
    }

    dispatch(register(user));

    if(error !== null) return

    props.history.push('/login');
  }

  return (
    <div className="h-screen container m-auto flex justify-center items-center">
      <form className="flex flex-col bg-gray-200 p-10 shadow-lg rounded-3xl w-1/3" onSubmit={handleSubmit}>
        <p className="text-center text-red-400">{error}</p>
        <h1 className="text-5xl mb-2 text-center">Register</h1>
        <label className="text-lg my-2" >Name:</label>
        <input type="text" className="border-gray-600 border-2 rounded p-1 outline-none" value={name} onChange={e => setName(e.target.value)}/>
        <label className="text-lg my-2" >Username:</label>
        <input type="text" className="border-gray-600 border-2 rounded p-1 outline-none" value={username} onChange={e => setUsername(e.target.value)}/>
        <label className="text-lg my-2" >Email:</label>
        <input type="email" className="border-gray-600 border-2 rounded p-1 outline-none" value={email} onChange={e => setEmail(e.target.value)}/>
        <label className="text-lg my-2" >Password:</label>
        <input type="password" className="border-gray-600 border-2 rounded p-1 outline-none" value={password} onChange={e => setPassword(e.target.value)}/>
        <button type="submit" className="bg-gray-800 hover:bg-gray-600 transition my-2 rounded py-2 text-white outline-none">Register</button>
      </form>
    </div>
  )
}
