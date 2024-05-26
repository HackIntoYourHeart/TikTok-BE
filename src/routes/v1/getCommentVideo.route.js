const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const commentValidation = require('../../validations/comment.validation');
const commentController = require('../../controllers/comment.controller');

const router = express.Router();

router
  .route('/')
  .get(validate(commentValidation.getCommentByVideo), commentController.getComments)

module.exports = router;
