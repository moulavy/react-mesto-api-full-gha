const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const errorMain = require('./middlewares/errorMain');
const mainRouter = require('./routes/index');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsCheck = require('./middlewares/cors');
const { PORT = 3007 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsCheck);

app.use(requestLogger);
app.use('/', mainRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorMain);

app.listen(PORT);
