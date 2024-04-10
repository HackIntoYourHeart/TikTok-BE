const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createVideo = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
    url: Joi.string().required(),
    owner: Joi.string().required().custom(objectId),
  }),
};

const getVideos = {
  query: Joi.object().keys({
    title: Joi.string(),
    owner: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getVideo = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const getVideosByUserId = {
    params: Joi.object().keys({
      userId: Joi.string().custom(objectId),
    }),
  };

  const searchVideoByKeyword = {
    query: Joi.object().keys({
      keyword: Joi.string().required(),
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
  };

const updateVideo = {
  params: Joi.object().keys({
    videoId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      url: Joi.string(),
      owner: Joi.string().custom(objectId),
    })
    .min(1),
};

const updateLikeList = {
  params: Joi.object().keys({
    videoId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      userId: Joi.string().custom(objectId)
    })
    .min(1),
}

const deleteVideo = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createVideo,
  getVideos,
  getVideo,
  updateVideo,
  deleteVideo,
  updateLikeList,
  getVideosByUserId,
  searchVideoByKeyword,
};
