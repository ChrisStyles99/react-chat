import React, { useState } from 'react';
// import {Redirect} from 'react-router-dom';

export const Home = (props) => {

  console.log(props);

  const socket = props.socket;

  const [name, setName] = useState('');

  const submit = (e) => {
    e.preventDefault();

    // if (name === '') {
    //   return;
    // }

    socket.emit('join', name ? name : 'Anon');


    props.history.push({
      pathname: '/chat',
      state: {
        name: name
      }
    });

    // return <Redirect to={{pathname: '/chat', state: {name}}} />
  };

  return (
    <div className="home flex container mx-auto h-screen">
      <form onSubmit={submit} className="m-auto flex flex-col bg-green-200 p-5 rounded-lg">
        <h1 className="text-5xl my-2">Enter the chat</h1>
        <label className="text-lg my-2" htmlFor="name">
          Name:
        </label>
        <input
          className="border-green-600 border-2 rounded p-1 outline-none"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button type="submit" className="bg-green-800 hover:bg-green-600 transition my-2 rounded py-2 text-white outline-none">Join Room</button>
      </form>
    </div>
  );
};
