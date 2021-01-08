import React from 'react'

export const Register = () => {
  return (
    <div className="h-screen container m-auto flex justify-center items-center">
      <form className="flex flex-col bg-gray-200 p-10 shadow-lg rounded-3xl w-1/3">
        <h1 className="text-5xl mb-2 text-center">Register</h1>
        <label className="text-lg my-2" >Name:</label>
        <input type="text" className="border-gray-600 border-2 rounded p-1 outline-none"/>
        <label className="text-lg my-2" >Username:</label>
        <input type="text" className="border-gray-600 border-2 rounded p-1 outline-none"/>
        <label className="text-lg my-2" >Email:</label>
        <input type="email" className="border-gray-600 border-2 rounded p-1 outline-none"/>
        <label className="text-lg my-2" >Password:</label>
        <input type="password" className="border-gray-600 border-2 rounded p-1 outline-none"/>
        <button type="submit" className="bg-gray-800 hover:bg-gray-600 transition my-2 rounded py-2 text-white outline-none">Register</button>
      </form>
    </div>
  )
}
