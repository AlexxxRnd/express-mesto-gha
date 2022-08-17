const Card = require('../models/card');
const mongoose = require('mongoose');

module.exports.createCard = (req, res, next) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки',
        });
      };
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    Card.findById(req.params.cardId)
      .then((card) => {
        if (!card) {
          res.status(404).send({
            message: 'Карточка с указанным _id не найдена',
          });
        };
        Card.findByIdAndRemove(req.params.cardId)
          .then((deletedCard) => res.status(200).send(deletedCard))
          .catch(next);
      })
      .catch(next);
  }
  else {
    res.status(400).send({
      message: 'Карточка по указанному _id не найдена',
    });
  };
};

module.exports.likeCard = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => {
        if (!card) {
          res.status(404).send({
            message: 'Карточка с указанным _id не найдена',
          });
        };
        res.status(200).send(card);
      })
      .catch(next);
  }
  else {
    res.status(400).send({
      message: 'Карточка по указанному _id не найдена',
    });
  };
};


module.exports.unlikeCard = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => {
        if (!card) {
          res.status(404).send({
            message: 'Карточка с указанным _id не найдена',
          });
        };
        res.status(200).send(card);
      })
      .catch(next);
  }
  else {
    res.status(400).send({
      message: 'Карточка по указанному _id не найдена',
    });
  };
};