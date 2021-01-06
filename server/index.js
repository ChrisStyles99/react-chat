const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

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
io.on('connection', (socket, name) => {
  io.emit('message', {name: 'ChatBot', message: `A user connected`});

  socket.on('message', ({name, message}) => {
    io.emit('message', {name, message});
  });

  socket.on('disconnect', () => {
    io.emit('message', {name: 'ChatBot', message: `A user disconnected`});
  });
});

app.get('/', (req, res) => {
  res.status(200).send({res: 'I am alive'});
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});