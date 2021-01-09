const {Router} = require('express');
const { userChats, chatMessages } = require('../controllers/chatController');
const router = Router();

router.get('/user-chats', userChats);

router.get('/chat-messages/:id', chatMessages);

module.exports = router;