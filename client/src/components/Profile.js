import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { getUserChats } from '../actions';

export const Profile = () => {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(user)[0] !== 'id') {
      dispatch(getUserChats);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="h-screen flex justify-center">
      <div className="profile bg-white md:w-1/3 h-1/3 mt-2 text-center rounded shadow">
        <h1 className="text-4xl">Profile</h1>
        <p className="text-2xl">Name: {user.name}</p>
        <p className="text-2xl">Username: {user.username}</p>
        <p className="text-2xl">Email: {user.email}</p>
      </div>
    </div>
  )
}
