const express = require('express');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const usersRouter = require('./routes/usersRouter');
const { errorHandler } = require('./middlewares/errorMiddleware');
const openAIRouter = require('./routes/openAIRouter');
require("./utils/connectDB")();

const app = express();
const PORT = process.env.port || 8000;


//-----Middlewares---
app.use(express.json());
app.use(cookieParser());
//-----Routes--------
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/openai', openAIRouter);
//-----Error handler middleware----
app.use(errorHandler)
//start the server
app.listen(PORT, console.log(`Server is running on port: ${PORT}`))