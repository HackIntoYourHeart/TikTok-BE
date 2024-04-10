const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const videoValidation = require('../../validations/video.validation');
const videoController = require('../../controllers/video.controller');

const router = express.Router();

router.route('/').post(auth(), validate(videoValidation.createVideo), videoController.createVideo);
router.route('/get-videos/:userId').get(validate(videoValidation.getVideosByUserId), videoController.findVideosByUserId);
router
  .route('/:videoId')
  .get(validate(videoValidation.getVideo), videoController.getVideo)
  .get(auth('getUsers'), validate(videoValidation.getVideo), videoController.getVideo)
  .patch(auth(), validate(videoValidation.updateVideo), videoController.updateVideo)
  .delete(auth(), validate(videoValidation.deleteVideo), videoController.deleteVideo);

  router
  .route('/req-reaction/:videoId')
  .patch(auth(), validate(videoValidation.updateLikeList), videoController.updateLikeListVideo);
  router
  .route('/search-videos')
  .get(validate(videoValidation.searchVideoByKeyword), videoController.searchVideoByKeyword);

module.exports = router;
