const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');

const {
  createUser,
  login,
} = require('./controllers/user');

const {
  createCard,
} = require('./controllers/card');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.post('/cards', auth, createCard);

app.use('/', require('./routes/user'));
app.use('/', require('./routes/card'));

app.use('*', (req, res) => {
  res.status(404).send({
    message: 'Страница не найдена',
  });
});

app.listen(PORT);
