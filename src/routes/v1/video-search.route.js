const auth = require('../../middlewares/auth');
const express = require('express');
const validate = require('../../middlewares/validate');
const videoValidation = require('../../validations/video.validation');
const videoController = require('../../controllers/video.controller');

const router = express.Router();

router.route('/').get(auth(),validate(videoValidation.searchVideoByKeyword), videoController.searchVideoByKeyword);

module.exports = router;
