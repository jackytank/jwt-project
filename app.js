//@ts-check
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tokensRouter = require('./routes/tokens');
const myConfig = require('./config/config');
const jwt_authentication = require('./middlewares/jwt.auth');

const app = express();

app.use(cors({ credentials: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(myConfig.app.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

app.use(jwt_authentication);
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/tokens', tokensRouter);

module.exports = app;
