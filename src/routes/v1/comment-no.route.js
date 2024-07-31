const express = require('express');
const { Video, Comment } = require('../../models');
const router = express.Router();

// API to get videos without comments
router.get('/', async (req, res) => {
  try {
    const videosWithComments = await Comment.distinct('video');
    const videosWithoutComments = await Video.find({ _id: { $nin: videosWithComments } });
    res.status(200).json(videosWithoutComments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving videos', error });
  }
});

module.exports = router;