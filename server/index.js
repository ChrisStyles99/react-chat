const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentiales: true
  }
});
const cors = require('cors');
const {userJoin, userLeaves} = require('./users');
const cookieParser = require('cookie-parser');
const sequelize = require('./database/db');
require('./database/associations');
const users = require('./routes/users');
const chats = require('./routes/chats');

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const verifyToken = require('./middlewares/verifyToken');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

const PORT = process.env.PORT || 3001;

// Run when client connects
io.on('connection', (socket) => {
  // socket.on('join', username => {
  //   const user = userJoin(socket.id, username);

  //   console.log(user);

  //   socket.emit('message', {name: 'ChatBot', message: `Welcome, ${user.username}`});

  //   socket.broadcast.emit('message', {name: 'ChatBot', message: `User ${user.username} joined`});
  // });

  socket.on('message', ({name, message}) => {
    io.emit('message', {name, message});
    // socket.broadcast.emit('message', {name, message});
  });

  // socket.on('disconnect', () => {

  //   const user = userLeaves(socket.id);

  //   if(user) {
  //     io.emit('message', {name: 'ChatBot', message: `User ${user.username} has left the chat`});
  //   }
  // });
});

app.use('/api/users', users);
app.use('/api/chats', verifyToken, chats);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  sequelize.sync({force: false}).then(() => {
    console.log('Db connected');
  }).catch(err => {
    console.log(err);
  });
});