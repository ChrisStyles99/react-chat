const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db');

class Message extends Model {}

Message.init({
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [1, 1000],
        msg: 'The message must have at least 1 character'
      },
      notNull: {
        args: true,
        msg: 'The message can not be null'
      }
    }
  },
  // read: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: false,
  //   defaultValue: 0
  // }
}, {
  sequelize,
  modelName: 'message'
});

module.exports = Message;