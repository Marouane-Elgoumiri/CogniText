const express = require('express');
const openAIRouter = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const { openAIController } = require('../controllers/openAIController');

openAIRouter.post('/generate-content', isAuthenticated, openAIController);


module.exports = openAIRouter;