const {Router} = require('express');
const { login, register, logout } = require('../controllers/userController');
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', logout);

module.exports = router;