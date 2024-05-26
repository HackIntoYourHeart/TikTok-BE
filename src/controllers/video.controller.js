const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { videoService, userService } = require('../services');
const { verifyToken } = require('../services/token.service');

const createVideo = catchAsync(async (req, res) => {
  const video = await videoService.createVideo(req.body);
  res.status(httpStatus.CREATED).send(video);
});

const getVideo = catchAsync(async (req, res) => {
  const video = await videoService.getVideoById(req.params.videoId);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Video not found');
  }
  res.send(video);
});

const findVideosByUserId = catchAsync(async (req, res) => {
    const videos = await videoService.findVideosByUserId(req.params.userId);
    if (!videos) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Video not found');
    }
    res.send(videos);
  });

const updateVideo = catchAsync(async (req, res) => {
  const video = await videoService.updateVideoById(req.params.videoId, req.body);
  res.send(video);
});

const updateLikeListVideo = catchAsync(async (req, res) => {
  const {video, isUsedToLike} = await videoService.updateLikeList(req.params.videoId, req.body.userId);
  if(!isUsedToLike) {
    const owner = await userService.updateUserPoint(video.owner, req.body.userId, 'like');
    res.send({video, newPoint: owner.userPoint});
  }
  
  else {
    res.send({video, newPoint: "User point is not updated"});
  }
});

const searchVideoByKeyword = catchAsync(async (req, res) => {
  const videos = await videoService.searchVideoList(req.query.keyword);
  res.send(videos);
});

const deleteVideo = catchAsync(async (req, res) => {
  await videoService.deleteVideoById(req.params.videoId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createVideo,
  getVideo,
  updateVideo,
  deleteVideo,
  searchVideoByKeyword,
  findVideosByUserId,
  updateLikeListVideo
};
