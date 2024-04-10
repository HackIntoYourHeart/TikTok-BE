const mongoose = require('mongoose');

const videoSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      url: {
        type: String,
        required: true,
        trim: true,
      },
      listLikes: {
        type: Array,
        default: []
      },
      usedToLike: {
        type: Array,
        default: []
      },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
const Video = mongoose.model('Video', videoSchema);

module.exports = Video;