const {Router} = require('express');
const { login, register, logout, getProfiles } = require('../controllers/userController');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', logout);
router.get('/profiles', verifyToken, getProfiles);

module.exports = router;