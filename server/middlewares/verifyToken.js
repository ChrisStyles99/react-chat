const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if(!token) return res.json({error: true, msg: 'Token not provided'});
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified.id;
    // req.user.name = verified.name;
    next();
  } catch (error) {
    res.json(error);
  }
}

module.exports = verifyToken;