const express = require('express');
const {register, login, logout, userProfile} = require('../controllers/usersController')
const usersRouter = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated")

usersRouter.post('/register', register);
usersRouter.post('/login', login);
usersRouter.post('/logout', logout);
usersRouter.get('/profile', isAuthenticated,userProfile);

module.exports = usersRouter;