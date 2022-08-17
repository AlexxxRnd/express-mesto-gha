const Card = require('../models/card');

const HttpCodes = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports.createCard = (req, res) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  }, { runValidators: true })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(HttpCodes.BAD_REQUEST).send({
          message: 'Переданы некорректные данные при создании карточки',
        });
      } else {
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(HttpCodes.NOT_FOUND).send({
          message: 'Карточка с указанным _id не найдена',
        });
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((deletedCard) => res.send(deletedCard));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(HttpCodes.BAD_REQUEST).send({ message: 'Невалидный id ' });
      } else {
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(HttpCodes.NOT_FOUND).send({
          message: 'Карточка с указанным _id не найдена',
        });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(HttpCodes.BAD_REQUEST).send({ message: 'Невалидный id ' });
      } else {
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(HttpCodes.NOT_FOUND).send({
          message: 'Карточка с указанным _id не найдена',
        });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(HttpCodes.BAD_REQUEST).send({ message: 'Невалидный id ' });
      } else {
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};
