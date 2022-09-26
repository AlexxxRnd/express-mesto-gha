const router = require('express').Router();

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/user');

const {
  getUserByIdValidation,
  updateProfileValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', getUserByIdValidation, getUserById);
router.patch('/users/me', updateProfileValidation, updateProfile);
router.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
