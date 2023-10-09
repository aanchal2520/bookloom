const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { userSignup, userLogin } = require('../controllers/authControllers');
const { validateRequest } = require('../middlewares/validationMiddleware'); 

router.post('/userSignup', [ 
    check('email').isEmail().notEmpty().withMessage('Enter valid email'),
    check('first_name').notEmpty().withMessage('First name required'),
    check('last_name').notEmpty().withMessage('Last name required'),
    check('phone_number').notEmpty().withMessage('Phone number required'),
    check('password').notEmpty().withMessage('Password required'),
    validateRequest //rename as check for errors
], userSignup);

router.post('/userLogin', [ 
    check('email').isEmail().notEmpty().withMessage('Enter valid email'),
    check('password').notEmpty().withMessage('Password required'),
    validateRequest 
], userLogin);

module.exports = router;