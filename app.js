const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/', require('./routes/user'));

app.use((req, res, next) => {
  req.user = {
    //_id: '62f7b9a52cdcd454268cde10'
  };

  next();
});

app.listen(PORT);