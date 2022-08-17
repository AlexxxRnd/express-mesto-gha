const Card = require('../models/card');
const error_400 = require('../errors/error_400');
const error_404 = require('../errors/error_404');

module.exports.createCard = (req, res, next) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
  })
    .then((card) => res.status(200).send({
      name: card.name,
      link: card.link,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new error_400('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new error_404('Карточка с указанным _id не найдена.'));
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new error_404('Карточка с указанным _id не найдена.'));
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

module.exports.unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new error_404('Карточка с указанным _id не найдена.'));
      }
      return res.status(200).send(card);
    })
    .catch(next);
};