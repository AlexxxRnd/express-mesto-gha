const express = require('express');
const mongoose = require('mongoose');
const error_404 = require('./errors/error_404');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/', require('./routes/user'));
app.use('/', require('./routes/card'));

app.use((req, res, next) => {
  req.user = {
    _id: '62f7b9a52cdcd454268cde10'
  };

  next();
});

app.use('*', (req, res, next) => {
  next(new error_404('Страница не найдена'));
});

app.listen(PORT);