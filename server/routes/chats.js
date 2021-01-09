const {Router} = require('express');
const { userChats } = require('../controllers/chatController');
const router = Router();

router.get('/user-chats', userChats);

module.exports = router;