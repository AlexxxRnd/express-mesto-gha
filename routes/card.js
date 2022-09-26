const router = require('express').Router();

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  unlikeCard,
} = require('../controllers/card');

const {
  cardIdValidation,
} = require('../middlewares/validation');

router.get('/cards', getCards);
router.delete('/cards/:cardId', cardIdValidation, deleteCard);
router.post('/cards', createCard);
router.put('/cards/:cardId/likes', cardIdValidation, likeCard);
router.delete('/cards/:cardId/likes', cardIdValidation, unlikeCard);

module.exports = router;
