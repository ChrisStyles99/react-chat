const {Router} = require('express');
const { userChats, chatMessages, createChat } = require('../controllers/chatController');
const router = Router();

router.get('/user-chats', userChats);

router.get('/chat-messages/:id', chatMessages);

router.post('/create-chat/:userId', createChat);

module.exports = router;