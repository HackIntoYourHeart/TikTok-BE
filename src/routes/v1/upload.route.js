const express = require('express');
const auth = require('../../middlewares/auth');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { uploadImage, uploadVideo, s3 } = require('../../services/upload.service');
const fs = require('fs');

// Route upload ảnh
router.route('/upload-image').post(auth('uploadImage'), uploadImage.single('image'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
    ACL: 'bucket-owner-full-control',
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      console.error(err);
      return res.status(500).json({ message: 'Failed to upload image' });
    }

    const imageUrl = data.Location;
    return res.status(200).json({ imageUrl });
  });
});

// Route để tải lên video
router.route('/upload-video').post(auth('uploadVideo'), uploadVideo.single('video'), (req, res) => {
  const videoPath = req.file.path;
  const videoKey = `videos/${Date.now()}_${req.file.originalname}`;

  const videoStream = fs.createReadStream(videoPath);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, 
    Key: videoKey,
    Body: videoStream,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading video:', err);
      res.status(500).json({ error: 'Failed to upload video' });
    } else {
      res.json({ videoUrl: data.Location });
    }
  });
});

module.exports = router;
