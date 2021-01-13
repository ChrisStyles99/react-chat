const {Router} = require('express');
const { userChats, chatMessages, createChat, createMessage, updateChatName, getChatInfo } = require('../controllers/chatController');
const router = Router();

router.get('/user-chats', userChats);

router.get('/chat-info/:id', getChatInfo);

router.get('/chat-messages/:id', chatMessages);

router.post('/create-chat/:userId', createChat);

router.post('/new-message/:chatId', createMessage);

router.put('/change-chat-name/:chatId', updateChatName);

module.exports = router;