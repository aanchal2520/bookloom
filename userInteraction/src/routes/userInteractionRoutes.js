const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { getTotalBookLikeCount, getTotalBookReadCount, updateLikeCount, updateReadCount, getPopularContent } = require('../controllers/userInteractionControllers');
const { validateUser } = require('../middlewares/validateUserMiddleware');
const { validateRequest } = require('../middlewares/validationMiddleware');

router.post('/getTotalBookLikeCount', validateUser, [ 
    check('user_id').notEmpty().withMessage('Id is required'), 
    check('book_id').notEmpty().withMessage('Book id is required'), 
    validateRequest
], getTotalBookLikeCount);

router.post('/getTotalBookReadCount', validateUser, [ 
    check('user_id').notEmpty().withMessage('Id is required'), 
    check('book_id').notEmpty().withMessage('Book id is required'), 
    validateRequest
], getTotalBookReadCount);

router.post('/updateLikeCount', validateUser, [ 
    check('user_id').notEmpty().withMessage('Id is required'), 
    check('book_id').notEmpty().withMessage('Book id is required'), 
    validateRequest
], updateLikeCount);

router.post('/updateReadCount', validateUser, [ 
    check('user_id').notEmpty().withMessage('Id is required'), 
    check('book_id').notEmpty().withMessage('Book id is required'), 
    validateRequest
], updateReadCount);

router.post('/getPopularContent', validateUser, [ 
    check('user_id').notEmpty().withMessage('Id is required'),
    validateRequest
], getPopularContent);

module.exports = router;