var express = require('express');
const { signUpHandler, loginHandler, logoutHandler } = require('../controllers/user');
const protectedRoutes = require('../middlewares/protectedRoutes') 
var router = express.Router();

router.post('/signup', signUpHandler);
router.post('/login', loginHandler);
router.get('/profile', protectedRoutes, (req, res) => {
    res.status(200).json({message: 'User logged in'})
})
router.post('/logout', logoutHandler)

module.exports = router;