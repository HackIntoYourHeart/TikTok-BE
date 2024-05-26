const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const commentSchema = new mongoose.Schema(
  {
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);
commentSchema.plugin(toJSON);
commentSchema.plugin(paginate);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
