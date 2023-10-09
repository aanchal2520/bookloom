const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { validateRequest } = require('../middlewares/validationMiddleware');
const { authenticateUser } = require('../middlewares/authMiddleware');

const { getContent, addContent, updateContent, deleteContent, getLatestContent, getTopContent } = require('../controllers/contentControllers');

router.get('/getContent', authenticateUser, getContent);

router.post('/addContent', [ 
    check('user_id').notEmpty().withMessage('user_id required'),
    check('title').notEmpty().withMessage('title required'),
    check('story').notEmpty().withMessage('story required'),
    authenticateUser,
    validateRequest
], addContent);

router.post('/updateContent', [ 
    check('user_id').notEmpty().withMessage('user_id required'),
    check('title').notEmpty().withMessage('title required'),
    check('story').notEmpty().withMessage('story required'),
    authenticateUser,
    validateRequest 
], updateContent);

router.post('/deleteContent', [ 
    check('title').notEmpty().withMessage('title required'),
    check('user_id').notEmpty().withMessage('user_id required'),
    authenticateUser,
    validateRequest 
], deleteContent);

router.get('/getLatestContent', authenticateUser, getLatestContent);

router.post('/getTopContent', [ 
    check('user_id').notEmpty().withMessage('user_id required'),
    authenticateUser,
    validateRequest 
], getTopContent);

module.exports = router;