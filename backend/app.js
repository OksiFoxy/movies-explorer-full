require('dotenv').config();
/* eslint-disable import/no-unresolved */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const allRouters = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors);
// AntiDOS & helmet
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // Лимитировать каждый IP до 100 запросов на `окно` (здесь, за 15 минут)
  standardHeaders: true, // Лимит скорости возврата в заголовках `RateLimit-*`
  legacyHeaders: false, // Отключите заголовки `X-RateLimit-*`
});
app.use(limiter); // AntiDOS на все реквесты
app.use(helmet()); // защита

// app.disable('x-powered-by');
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/moviesdb');
app.use(requestLogger); // подключаем логгер запросов
app.use(allRouters);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Сервер запущен на порту 3000');
});
