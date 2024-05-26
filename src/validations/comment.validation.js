const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createComment = {
  body: Joi.object().keys({
    video: Joi.string().required().custom(objectId),
    content: Joi.string().required(),
  }),
};

const getComment = {
  query: Joi.object().keys({
    commentId: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCommentByVideo = {
  query: Joi.object().keys({
    video: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateComment = {
  params: Joi.object().keys({
    commentId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    content: Joi.string().required(),
  }),
};

const deleteComment = {
  params: Joi.object().keys({
    commentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createComment,
  getComment,
  updateComment,
  deleteComment,
  getCommentByVideo,
};
