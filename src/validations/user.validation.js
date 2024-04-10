const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    username: Joi.string().required(),
    password: Joi.string().required().custom(password),
    displayName: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    displayName: Joi.string(),
    username: Joi.string(),
    picture: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRanking = {
  query: Joi.object().keys({
    displayName: Joi.string(),
    username: Joi.string(),
    picture: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      displayName: Joi.string(),
      picture: Joi.string(),
      followingList: Joi.array(),
      likeList: Joi.array(),
    })
    .min(1),
};

const requestDonate = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      receiveId: Joi.required().custom(objectId),
      donate: Joi.number().integer().min(1).required(),
    })
    .min(1),
};

const updateFollowingUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      followingId: Joi.required().custom(objectId),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  getRanking,
  updateUser,
  deleteUser,
  requestDonate,
  updateFollowingUser,
};
