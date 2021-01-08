const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const {userJoin, userLeaves} = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const PORT = process.env.PORT || 3001;

// Run when client connects
io.on('connection', (socket) => {
  socket.on('join', username => {
    const user = userJoin(socket.id, username);

    console.log(user);

    socket.emit('message', {name: 'ChatBot', message: `Welcome, ${user.username}`});

    socket.broadcast.emit('message', {name: 'ChatBot', message: `User ${user.username} joined`});
  }); 

  socket.on('message', ({name, message}) => {
    // io.emit('message', {name, message});
    socket.emit('message', {name: 'You', message});
    socket.broadcast.emit('message', {name, message});
  });

  socket.on('disconnect', () => {

    const user = userLeaves(socket.id);

    if(user) {
      io.emit('message', {name: 'ChatBot', message: `User ${user.username} has left the chat`});
    }
  });
});

// app.get('/', (req, res) => {
//   res.status(200).send({res: 'I am alive'});
// });

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});