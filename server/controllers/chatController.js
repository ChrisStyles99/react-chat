const User = require('../database/models/User');
const Chat = require('../database/models/Chat');
const Message = require('../database/models/Message');
const ChatUser = require('../database/models/ChatUser');
const { Op } = require('sequelize');

const chatController = {};

chatController.userChats = async (req, res) => {
  try {
    const chats = await User.findByPk(req.user, {
      include: {
        model: Chat,
        attributes: ['id', 'name', 'createdAt'],
        through: { attributes: [] },
        include: {
          model: User,
          attributes: ['id', 'name', 'username'],
          through: { attributes: [] },
          where: {
            [Op.not]: [{ id: req.user }],
          },
        },
      },
      attributes: ['id', 'name', 'username', 'email', 'createdAt', 'updatedAt'],
    });
    res.json(chats);
  } catch (err) {
    res.json({ error: false, msg: err });
  }
};

chatController.chatMessages = async (req, res) => {
  try {
    const id = req.params.id;
    const messages = await Message.findAll({
      where: {
        chat_id: id,
      },
      include: {
        model: User,
        attributes: ['id', 'name', 'username'],
      },
      attributes: ['id', 'content', 'createdAt'],
      order: [['createdAt', 'ASC']],
    });
    res.json(messages);
  } catch (err) {
    res.json({ error: true, msg: err });
  }
};

chatController.createChat = async (req, res) => {
  try {
    const userId = req.params.userId;

    const chats = await ChatUser.findAll({
      where: {
        [Op.or]: [{ userId }, { userId: req.user }],
      },
    });

    let chatIds = [];
    let sameChatId = false;

    if (chats.length > 0) {
      chats.forEach((chat) => chatIds.push(chat.chatId));
      sameChatId = chatIds.some(
        (item, index) => chatIds.indexOf(item) !== index
      );
    }

    if (sameChatId) {
      res.json({ error: true, msg: 'Chat already created' });
    } else {
      const chat = await Chat.create({
        name: 'Chat',
      });
      await ChatUser.create({
        userId: req.user,
        chatId: chat.id,
      });
      await ChatUser.create({
        userId,
        chatId: chat.id,
      });
      res.json({ error: false, msg: 'Created chat', chat });
    }
  } catch (err) {
    res.json({ error: true, msg: err });
  }
};

chatController.createMessage = async (req, res) => {
  try {
    const chatId = parseInt(req.params.chatId);
    console.log(req.body);
    const { content } = req.body;
    const newMessage = await Message.create({
      content,
      user_id: req.user,
      chat_id: chatId,
    });
    res.json({ error: false, newMessage });
  } catch (err) {
    res.json({ error: true, msg: err.errors[0].message });
  }
};

chatController.updateChatName = async(req, res) => {
  try {
    const chatId = parseInt(req.params.chatId);

    const chat = await Chat.update({name: req.body.name}, {
      where: {
        id: chatId
      }
    });
    res.json({error: false, msg: 'Updated chat name'});
  } catch (err) {
    res.json({error: true, msg: err});
  }
}

module.exports = chatController;
