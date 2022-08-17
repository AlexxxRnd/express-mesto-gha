const User = require('../models/user');
const mongoose = require('mongoose');

module.exports.createUser = (req, res) => {
  User.create({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  })
    .then((user) => res.status(200).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      };
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
};

module.exports.getUserById = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
    User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          res.status(404).send({
            message: 'Пользователь не найден',
          });
        }
        res.status(200).send(user);
      })
  }
  else {
    res.status(400).send({
      message: 'Пользователь по указанному _id не найден',
    });
  };
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about
    },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send({
      name: user.name,
      about: user.about,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении информации',
        });
      };
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true }
  )
    .then((user) => res.status(200).send({
      avatar: user.avatar,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении аватара',
        });
      };
    });
};