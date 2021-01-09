const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db');

class ChatUser extends Model {}

ChatUser.init({
  userId: DataTypes.BIGINT,
  chatId: DataTypes.BIGINT
}, {
  sequelize,
  modelName: 'ChatUser',
  timestamps: false
});

module.exports = ChatUser;