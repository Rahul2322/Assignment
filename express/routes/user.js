const express = require('express');
const { wrapper } = require('../utils/errorWrapper');
const { userValidation } = require('../middlewares/userValidation');
const { adduser, getUsers, getUserById, updateUser, deleteUser } = require('../controller/user');
const router = express.Router();

router.post(
'/users',
userValidation,
wrapper(adduser)
)
router.get(
'/users',
wrapper(getUsers)
)
router.get(
'/users/:id',
wrapper(getUserById)
)
router.put(
'/users/:id',
userValidation,
wrapper(updateUser)
)
router.delete(
'/users/:id',
wrapper(deleteUser)
)

module.exports = router;