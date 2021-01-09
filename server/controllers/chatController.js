const User = require("../database/models/User");
const Chat = require("../database/models/Chat");

const chatController = {}

chatController.userChats = async(req, res) => {
  try {
    const chats = await User.findByPk(1, {
      include: {
        model: Chat,
        include: {
          model: User
        }
      }
    });
  
    res.json(chats);
  } catch (error) {
    res.json(error);
  }
};

module.exports = chatController;