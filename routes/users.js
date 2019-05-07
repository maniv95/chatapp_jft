const express = require('express');
const router = express.Router();
const Usercontrollers = require('../controllers/usercontrollers.js');
const { catchErrors } = require('../errorhandlers');

router.post('/register',catchErrors(Usercontrollers.register));
router.post('/login',catchErrors(Usercontrollers.login));
router.post('/chat',catchErrors(Usercontrollers.chat));
module.exports = router ;