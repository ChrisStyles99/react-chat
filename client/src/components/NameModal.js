import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeChatName } from '../actions';

export const NameModal = ({setTrigger, id}) => {

  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name === '') return

    dispatch(changeChatName(id, name));

    setTrigger(false);
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-10">
      <form className="bg-white p-10 relative flex flex-col rounded-2xl z-100" onSubmit={handleSubmit}>
        <button className="absolute right-2.5 top-2.5" onClick={() => setTrigger(false)}>X</button>
        <label className="text-3xl my-2">Change name:</label>
        <input className="border-2 border-blue-400 p-2 my-1" type="text" placeholder="Enter the name here" value={name} onChange={e => setName(e.target.value)}/>
        <button className="bg-blue-500 my-2 p-2 rounded hover:bg-blue-300" type="submit">Change Name!</button>
      </form>
    </div>
  );
};
