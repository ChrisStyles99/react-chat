import React, { useEffect, useRef, useState } from 'react'
import { Message } from './Message';

export const Chat = (props) => {

  const socket = props.socket;

  const {location: {state: {name}}} = props;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('message', ({name, message}) => {
      setMessages([...messages, {name, message}]);
    });
    console.log('Updated');

    return () => {
      socket.off('message');
    }
  }, [messages]);

  const messagesEndRef = useRef(null);

  const scrollToBotom = () => {
    messagesEndRef.current.scrollIntoView({behavior: "smooth"});
  }

  useEffect(scrollToBotom, [messages]);

  const submit = e => {
    e.preventDefault();

    if(message === '') {
      return;
    }

    socket.emit('message', {name, message});

    setMessage('');
  }

  return (
    <div className="chat container flex mx-auto h-screen">
      <div className="chat-container m-auto h-screen w-2/4">
        <div className="chat-messages h-2/4 bg-green-200 overflow-y-scroll">
          {messages.map(({name, message}, index) => {
            return <Message name={name} message={message} username={name} key={index} />
          })}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="message-form">
          <form onSubmit={submit}>
            <input type="text" className="w-3/4 p-2 bg-green-300" placeholder="Enter your message" value={message} onChange={e => setMessage(e.target.value)}/>
            <button type="submit" className="bg-green-600 w-1/4 rounded p-2 text-white text-lg">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};
