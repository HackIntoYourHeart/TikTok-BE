const httpStatus = require('http-status');
const { Comment } = require('../models');
const ApiError = require('../utils/ApiError');

const createComment = async (commentBody) => {
  return Comment.create(commentBody);
};

const queryComments = async (filter, options) => {
  const modifiedOptions = {
    ...options,
    populate: 'user',
    select: 'id displayName picture',
  };
  const comments = await Comment.paginate(filter, modifiedOptions);
  return comments;
};

const getCommentById = async (id) => {
  return Comment.findById(id);
};

const updateCommentById = async (commentId, updateBody) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  Object.assign(comment, updateBody);
  await comment.save();
  return comment;
};

const deleteCommentById = async (commentId) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  await comment.remove();
  return comment;
};

module.exports = {
  createComment,
  queryComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
