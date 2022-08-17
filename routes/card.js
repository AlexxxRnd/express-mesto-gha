const router = require('express').Router();

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  unlikeCard
} = require('../controllers/card');

router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCard);
router.post('/cards', createCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', unlikeCard);

module.exports = router;