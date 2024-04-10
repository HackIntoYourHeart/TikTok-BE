const httpStatus = require('http-status');
const { Video } = require('../models');
const ApiError = require('../utils/ApiError');
const { checkUserIdInLikeList, checkUserUsedToLikeVideo } = require('../utils/common');

/**
 * Create a video
 * @param {Object} videoBody
 * @returns {Promise<Video>}
 */
const createVideo = async (videoBody) => {
  return Video.create(videoBody);
};

/**
 * Get video by id
 * @param {ObjectId} id
 * @returns {Promise<Video>}
 */
const getVideoById = async (id) => {
  return Video.findById(id);
};

const findVideosByUserId = async (userId) => {
    try {
      const videos = await Video.find({ owner: userId }).sort({ createdAt: -1 });
      return videos;
    } catch (error) {
      throw new Error('Failed to find videos by user ID');
    }
};

/**
 * Update video by id
 * @param {ObjectId} videoId
 * @param {Object} updateBody
 * @returns {Promise<Video>}
 */
const updateVideoById = async (videoId, updateBody) => {
  const video = await getVideoById(videoId);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Video not found');
  }
  Object.assign(video, updateBody);
  await video.save();
  return video;
};

const updateLikeList = async (videoId, userId) => {
  const video = await getVideoById(videoId);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Video not found');
  }
  const {usedToLike, isUsedToLike} = checkUserUsedToLikeVideo(video.usedToLike, userId);
  const listLikes = checkUserIdInLikeList(video.listLikes, userId);
  
  Object.assign(video, {listLikes, usedToLike});
  await video.save();
  return {video, isUsedToLike};
};

const searchVideoList = async (keyword) => {
        const regex = new RegExp(keyword, 'i');
        const videos = await Video.find({
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } }
            ]
        });
        return videos;
};

/**
 * Delete video by id
 * @param {ObjectId} videoId
 * @returns {Promise<Video>}
 */
const deleteVideoById = async (videoId) => {
  const video = await getVideoById(videoId);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Video not found');
  }
  await video.remove();
  return video;
};

module.exports = {
  createVideo,
  getVideoById,
  updateVideoById,
  updateLikeList,
  deleteVideoById,
  searchVideoList,
  findVideosByUserId,
};