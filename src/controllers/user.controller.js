const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, videoService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['displayName', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const getPublicUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  user.followingList = [];
  user.likeList = [];
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const getRanking = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['displayName', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const addIfNotExists = (array, value) => {
  if (!array.includes(value)) {
    array.push(value);
  } else {
    const index = array.indexOf(value);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  return array;
};

// const updateUserPointWhenLike = catchAsync(async (req, res) => {
//   const owner = await userService.updateUserPoint(req.body.owner, req.params.userId, 'like');
//   const video = await videoService.updateLikeList(req.body.videoId, req.params.userId);
//   res.send({owner, video});
// });

const searchUsers = catchAsync(async (req, res) => {
  const { displayName } = req.query;
  const users = await userService.searchUsersByDisplayName(displayName);
  res.send(users);
});

const updateUserPointWhenDonate = catchAsync(async (req, res) => {
  const giver = await userService.updateUserPoint(req.body.receiveId, req.params.userId, 'donate', req.body.donate);
  res.send({ giver });
});

const updateFollowingUser = catchAsync(async (req, res) => {
  const getCurrentUser = await userService.getUserById(req.params.userId);
  const arr = addIfNotExists(getCurrentUser.followingList, req.body.followingId);
  const user = await userService.updateUserById(req.params.userId, { followingList: arr });
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  getPublicUser,
  updateUser,
  updateFollowingUser,
  updateUserPointWhenDonate,
  deleteUser,
  getRanking,
  searchUsers,
};
