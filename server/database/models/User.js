const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db');

class User extends Model {}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
        msg: 'Name can only be letters'
      },
      len: {
        args: [3, 255],
        msg: 'Name must have at least 3 characters'
      },
      notNull: {
        args: true,
        msg: 'Name can not be empty'
      }
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: {
        args: /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/g,
        msg: 'Username must be 8 to 20 characters, and no underscore or dot at beggining or at the end'
      },
      notNull: {
        args: true,
        msg: 'Username can not be empty'
      },
      len: {
        args: [8, 20],
        msg: 'Username must be 8 to 20 characters'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        args: true,
        msg: 'Email must be valid'
      },
      notNull: {
        args: true,
        msg: 'Email con not be empty'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6, 255],
        msg: 'Password must be longer or equal than 6 characters'
      },
      notNull: {
        args: true,
        msg: 'Password can not be empty'
      }
    }
  }
}, {
  sequelize,
  modelName: 'user'
});

module.exports = User;