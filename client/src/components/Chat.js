import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Message } from './Message';
import {getChatMessages, getUserChats, createMessage} from '../actions'

export const Chat = (props) => {

  const socket = props.socket;

  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.user);
  const chatMessages = useSelector(state => state.chatMessages);
  const newMessageError = useSelector(state => state.newMessageError);
  const {id} = props.match.params;
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(Object.keys(userProfile)[0] !== "id" ) {
      dispatch(getUserChats);
    }
    dispatch(getChatMessages(id));
  }, []);

  useEffect(() => {
    socket.on('message', () => {
      dispatch(getChatMessages(id));
    });
    console.log('Updated');

    return () => {
      socket.off('message');
    }
  }, [chatMessages]);

  const messagesEndRef = useRef(null);

  const scrollToBotom = () => {
    messagesEndRef.current.scrollIntoView({behavior: "smooth"});
  }

  useEffect(scrollToBotom, [chatMessages]);

  const submit = e => {
    e.preventDefault();

    if(message === '') {
      return;
    }

    socket.emit('message', {name: userProfile.name, message});

    dispatch(createMessage(message, id));

    setMessage('');
  }

  return (
    <div className="chat container flex mx-auto">
      <div className="chat-container m-auto h-screen w-2/4 my-5">
        <p>{newMessageError}</p>
        <div className="chat-messages h-2/4 bg-gray-200 overflow-y-scroll">
          {chatMessages.length > 0 ? (
            chatMessages.map(chatMessage => {
              return <Message name={chatMessage.user.name} message={chatMessage.content} currentUser={userProfile.name} key={chatMessage.id} />
            })
          ) : (
            <p>No messages in this chat yet</p>
          )}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="message-form">
          <form onSubmit={submit}>
            <input type="text" className="w-3/4 p-2 bg-gray-300" placeholder="Enter your message" value={message} onChange={e => setMessage(e.target.value)}/>
            <button type="submit" className="bg-gray-900 w-1/4 rounded p-2 text-white text-lg">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};
