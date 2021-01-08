const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db');

class Chat extends Model {}

Chat.init({
  name: {
    type: DataTypes.STRING,
    validate: {
      len: {
        args: [1, 100],
        msg: 'The name must be at least 1 character to 100'
      }
    }
  }
}, {
  sequelize,
  modelName: 'chat'
});

module.exports = Chat;