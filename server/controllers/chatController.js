const User = require("../database/models/User");
const Chat = require("../database/models/Chat");
const Message = require("../database/models/Message");
const ChatUser = require('../database/models/ChatUser');

const chatController = {}

chatController.userChats = async(req, res) => {
  try {
    const chats = await User.findByPk(req.user, {
      include: {
        model: Chat,
        attributes: ['id', 'name', 'createdAt'],
        through: {attributes: []},
        include: {
          model: User,
          attributes: ['id', 'name', 'username'],
          through: {attributes: []}
        }
      },
      attributes: ['id', 'name', 'username', 'email', 'createdAt', 'updatedAt']
    });
    res.json(chats);
  } catch (error) {
    res.json(error);
  }
};

chatController.chatMessages = async(req, res) => {
  try {
    const id = req.params.id; 
    const messages = await Message.findAll({
      where: {
        chat_id: id
      },
      include: {
        model: User,
        attributes: ['id', 'name', 'username']
      },
      attributes: ['id', 'content', 'createdAt'],
      order: [['createdAt', 'ASC']]
    });
    res.json(messages);
  } catch (error) {
    res.json(error);
  }
};

chatController.createChat = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chat = await Chat.create({
      name: 'Chat'
    });
    await ChatUser.create({
      userId: req.user,
      chatId: chat.id
    });
    await ChatUser.create({
      userId,
      chatId: chat.id
    });
    res.json({error: false, msg: 'Created chat', chat});
  } catch (error) {
    res.json(error);
  }
}

module.exports = chatController;