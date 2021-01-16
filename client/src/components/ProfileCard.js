import React from 'react'
import { useDispatch } from 'react-redux';
import { createChat } from '../actions';

export const ProfileCard = ({profile, user}, props) => {

  const dispatch = useDispatch();

  let alreadyWithChat = false;

  const chatsUsers = user.chats.map(chat => {
    return chat.users[0];
  });

  chatsUsers.forEach(user => {
    if(user.id === profile.id) {
      return alreadyWithChat = true;
    }
  });

  const handleClick = () => {
    dispatch(createChat(profile.id));
    props.history.push('/');
  }

  return (
    <div className="bg-white rounded p-3 w-5/6 md:w-1/5">
      <h1 className="text-3xl my-2">{profile.name}</h1>
      <p className="text-xl my-2">{profile.username}</p>
      {!alreadyWithChat &&  <button className="my-2 bg-blue-500 p-2 text-xl rounded hover:bg-blue-700" onClick={handleClick}>Create chat!</button>}
    </div>
  )
}
