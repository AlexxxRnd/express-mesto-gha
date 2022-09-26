const router = require('express').Router();

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/user');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', getUserById);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
