const User = require('../database/models/User');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {};

userController.register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (user) {
      return res.json({ error: true, msg: 'Username or email already taken' });
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    res.json({ error: false, msg: 'User created' });
  } catch (err) {
    const msg = err.errors[0].message;
    res.json({error: true, msg}); 
  }
};

userController.login = async(req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email
      }
    });

    if(!user) {
      return res.json({error: true, msg: "Email doesn't exists"});
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword) {
      return res.json({error: true, msg: "Password doesn't match"});
    }

    const payload = {
      id: user.id,
      name: user.name
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '1h'
    });

    res.cookie('token', token, {
      maxAge: 3600000,
      httpOnly: true
    });

    res.cookie('isLoggedIn', true, {maxAge: 3600000});

    res.status(200).json({error: false, msg: 'You are now logged in'});

  } catch (err) {
    const msg = err.errors[0].message;
    res.json({error: true, msg});
  }
};

userController.logout = async(req, res) => {
  res.clearCookie('token');
  res.clearCookie('isLoggedIn');
  res.status(200).json({error: false, msg: "You have successfully logged out"});
};

module.exports = userController;
