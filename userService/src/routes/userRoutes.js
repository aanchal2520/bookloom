const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { validateRequest } = require('../middlewares/validationMiddleware');
const { authenticateUser } = require('../middlewares/authMiddleware');

const { getUsers, updateUser, deleteUser, getUserById } = require('../controllers/userControllers');

router.get('/getUsers', authenticateUser, getUsers);

router.post('/updateUser', [ 
    check('email').isEmail().notEmpty().withMessage('Enter valid email'),
    check('first_name').notEmpty().withMessage('First name required'),
    check('last_name').notEmpty().withMessage('Last name required'),
    check('phone_number').notEmpty().withMessage('Phone number required'),
    check('password').notEmpty().withMessage('Password required'), 
    authenticateUser,
    validateRequest 
], updateUser);

router.post('/deleteUser', [ 
    check('email').isEmail().notEmpty().withMessage('Enter valid email'), 
    authenticateUser,
    validateRequest 
], deleteUser);

router.post('/getUserById', [ 
    check('user_id').notEmpty().withMessage('Id is required'), 
    authenticateUser
 ], getUserById);

module.exports = router;