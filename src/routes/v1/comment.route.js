const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const commentValidation = require('../../validations/comment.validation');
const commentController = require('../../controllers/comment.controller');

const router = express.Router();

router.route('/').post(auth(), validate(commentValidation.createComment), commentController.createComment);
router
  .route('/:commentId')
  .get(validate(commentValidation.getComment), commentController.getComment)
  .post(auth(), validate(commentValidation.createComment), commentController.createComment)
  .get(auth(), validate(commentValidation.getComment), commentController.getComment)
  .patch(auth(), validate(commentValidation.updateComment), commentController.updateComment)
  .delete(auth(), validate(commentValidation.deleteComment), commentController.deleteComment);

module.exports = router;
