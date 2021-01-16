import React, { useEffect, useState } from 'react';
import { getUserChats } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Home = (props) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (Object.keys(userProfile)[0] !== 'id') {
      dispatch(getUserChats);
    }
    //eslint-disable-next-line
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Hello');
    
    if(username === '') return

    props.history.push(`/search-profiles?query=${username}`);
  }

  return (
    <div className="container mx-auto h-screen">
      <div className="md:grid md:grid-cols-4 md:gap-3 md:h-1/2 mt-2">
        <div className="col-span-2 bg-white rounded-3xl p-3">
          <h1 className="text-5xl">Welcome, {userProfile.name}!</h1>
          <h2 className="text-xl my-2">Your chats</h2>
          {userProfile.chats.length > 0 ? (
            userProfile.chats.map((chat) => {
              return (
                <div className="shadow-xl w-1/2 rounded-xl border-2 border-gray-600 px-2 my-2" key={chat.id}>
                  <Link to={`/chat/${chat.id}`}>
                    <p className="text-lg font-bold">{chat.name}</p>
                    <p>{chat.users[0].name}</p>
                    <p>@{chat.users[0].username}</p>
                  </Link>
                </div>
              );
            })
          ) : (
            <p>Sorry, you don't have any chats</p>
          )}
        </div>
        <form className="mt-2 md:col-span-1 h-1/2 bg-white p-2 rounded-3xl flex flex-col p-3" onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl">Search users</h1>
          <input type="text" placeholder="Search for users to chat" value={username} onChange={e => setUsername(e.target.value)} className="border-2 border-gray-500 p-2 rounded my-2"/>
          <button type="submit" className="bg-blue-500 my-2 p-2 text-xl rounded hover:bg-blue-600">Find!</button>
        </form>
      </div>
    </div>
  );
};
