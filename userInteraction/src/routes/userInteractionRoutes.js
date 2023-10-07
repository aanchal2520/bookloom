const express = require('express');
const router = express.Router();
const { getLikeCount, getReadCount, updateLikeCount, updateReadCount, getPopularContent } = require('../controllers/userInteractionControllers');
const { validateUser } = require('../middlewares/validateUserMiddleware');

router.post('/getLikeCount', validateUser, getLikeCount);
router.post('/getReadCount', validateUser, getReadCount);
router.post('/updateLikeCount', validateUser, updateLikeCount);
router.post('/updateReadCount', validateUser, updateReadCount);
// router.post('/getPopularContent', validateUser, getPopularContent);

module.exports = router;