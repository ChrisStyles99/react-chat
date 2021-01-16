import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { login } from '../actions';

export const Login = (props) => {

  const dispatch = useDispatch();
  const error = useSelector(state => state.loginError)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    
    if(email === '' || password === '') {
      return
    }

    const user = {
      email, password
    }

    await dispatch(login(user));

    if(error !== null) return 

    props.history.push('/');
  }

  return (
    <div className="h-screen md:container m-auto flex justify-center items-center">
      <form className="flex flex-col bg-gray-200 p-3 md:p-10 shadow-lg rounded-3xl w-5/6 md:w-1/3" onSubmit={handleSubmit}>
        <p className="text-center text-red-400">{error}</p>
        <h1 className="text-5xl mb-2 text-center">Login</h1>
        <label className="text-lg my-2" >Email:</label>
        <input type="email" className="border-gray-600 border-2 rounded p-1 outline-none" value={email} onChange={e => setEmail(e.target.value)}/>
        <label className="text-lg my-2" >Password:</label>
        <input type="password" className="border-gray-600 border-2 rounded p-1 outline-none" value={password} onChange={e => setPassword(e.target.value)}/>
        <button type="submit" className="bg-gray-800 hover:bg-gray-600 transition my-2 rounded py-2 text-white outline-none">Login</button>
      </form>
    </div>
  )
}
