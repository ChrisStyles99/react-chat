import React, { useEffect } from 'react';
import { getUserChats } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Home = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserChats);
  }, []);

  return (
    <div className="container mx-auto h-screen">
      <div className="grid grid-cols-4 gap-3 h-1/2 mt-2">
        <div className="col-span-2 bg-white rounded-3xl p-3">
          <h1 className="text-5xl">Welcome, {userProfile.name}!</h1>
          <h2 className="text-xl">Your chats</h2>
          {userProfile.chats.length > 0 ? (
            userProfile.chats.map((chat) => {
              return (
                <div className="shadow-xl w-1/2 rounded-xl border-2 border-gray-600 px-2" key={chat.id}>
                  <Link to={`/chat/${chat.id}`}>
                    <p className="text-lg font-bold">{chat.name}</p>
                    <p>{chat.users[0].name}</p>
                    <p>{chat.users[0].username}</p>
                  </Link>
                </div>
              );
            })
          ) : (
            <p>Sorry, you don't have any chats</p>
          )}
        </div>
        <form className="col-span-1 bg-white p-2 rounded-3xl">
          <input type="text" />
          <button type="submit">Find!</button>
        </form>
      </div>
    </div>
  );
};
