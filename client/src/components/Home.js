import React from 'react';

export const Home = () => {
  // const socket = props.socket;
  // const [name, setName] = useState('');
  // const submit = (e) => {
  //   e.preventDefault();
  //   // if (name === '') {
  //   //   return;
  //   // }
  //   socket.emit('join', name ? name : 'Anon');
  //   props.history.push({
  //     pathname: '/chat',
  //     state: {
  //       name: name
  //     }
  //   });
  // };

  return (
    <div className="container mx-auto h-screen">
      <div className="grid grid-cols-4 gap-3 h-1/2 mt-2">
        <div className="col-span-2 bg-white rounded-3xl p-3">
          <h1 className="text-5xl">Welcome, user!</h1>
          <h2 className="text-xl">Your chats</h2>
        </div>
        <form className="col-span-1 bg-white p-2 rounded-3xl">
          <input type="text" />
          <button type="submit">Find!</button>
        </form>
      </div>
    </div>
  );
};
