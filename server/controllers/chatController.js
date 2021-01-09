const User = require("../database/models/User");
const Chat = require("../database/models/Chat");
const Message = require("../database/models/Message");

const chatController = {}

chatController.userChats = async(req, res) => {
  try {
    const chats = await User.findByPk(req.user.id, {
      include: {
        model: Chat,
        attributes: ['id', 'name', 'createdAt'],
        include: {
          model: User,
          attributes: ['id', 'name', 'username']
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

module.exports = chatController;