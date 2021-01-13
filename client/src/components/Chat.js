import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from './Message';
import {
  getChatMessages,
  getUserChats,
  createMessage,
  friendMessage,
  getChatInfo,
} from '../actions';
import { NameModal } from './NameModal';

export const Chat = (props) => {
  const socket = props.socket;

  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user);
  const chatInfo = useSelector((state) => state.chatInfo);
  const chatMessages = useSelector((state) => state.chatMessages);
  const newMessageError = useSelector((state) => state.newMessageError);
  const { id } = props.match.params;
  const [message, setMessage] = useState('');
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (Object.keys(userProfile)[0] !== 'id') {
      dispatch(getUserChats);
    }
    dispatch(getChatMessages(id));
    dispatch(getChatInfo(id));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on('message', ({ id, content, createdAt, user }) => {
      if (user.id !== userProfile.id) {
        dispatch(friendMessage({ id, content, createdAt, user }));
      }
    });

    return () => {
      socket.off('message');
    };
    // eslint-disable-next-line
  }, [chatMessages]);

  const messagesEndRef = useRef(null);

  const scrollToBotom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBotom, [chatMessages]);

  const submit = async (e) => {
    e.preventDefault();

    if (message === '') {
      return;
    }

    const newMessage = await dispatch(createMessage(message, id));

    socket.emit('message', {
      id: newMessage.id,
      content: newMessage.content,
      createdAt: newMessage.createdAt,
      user: {
        id: userProfile.id,
        name: userProfile.name,
        username: userProfile.username,
      },
    });

    setMessage('');
  };

  return (
    <div className="chat container flex mx-auto">
      {popup && (
        <div>
          <NameModal setTrigger={setPopup} />
          <div className="overlay bg-black bg-opacity-10 absolute w-full h-full inset-0"></div>
        </div>
      )}
      <div className="chat-container m-auto h-screen w-2/4 my-5">
        <div className="m-auto">
          <h1 className="text-4xl text-white text-center">{chatInfo.name}</h1>
          <button
            onClick={() => setPopup(true)}
            className="my-2 p-2 bg-blue-500 rounded hover:bg-blue-700"
          >
            Change chat name
          </button>
        </div>
        <p>{newMessageError}</p>
        <div className="chat-messages h-2/4 bg-gray-200 overflow-y-scroll">
          {chatMessages.length > 0 ? (
            chatMessages.map((chatMessage) => {
              return (
                <Message
                  name={chatMessage.user.name}
                  message={chatMessage.content}
                  currentUser={userProfile.name}
                  key={chatMessage.id}
                />
              );
            })
          ) : (
            <p>No messages in this chat yet</p>
          )}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="message-form">
          <form onSubmit={submit}>
            <input
              type="text"
              className="w-3/4 p-2 bg-gray-300"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gray-900 w-1/4 rounded p-2 text-white text-lg"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
