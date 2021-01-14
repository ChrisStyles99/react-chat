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
const cookieParser = require('cookie-parser');
const sequelize = require('./database/db');
require('./database/associations');
const users = require('./routes/users');
const chats = require('./routes/chats');
const {userJoin, getCurrentUser, userLeaves} = require('./users');

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
  socket.on('joinRoom', room => {
    const newUser = userJoin(socket.id, room);
    socket.join(newUser.room);
  });

  socket.on('message', ({id, content, createdAt, user}) => {

    const userId = getCurrentUser(socket.id);

    io.to(userId.room).emit('message', {id, content, createdAt, user});
  });

  socket.on('disconnect', () => {
    return userLeaves(socket.id);
  });
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