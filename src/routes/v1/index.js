const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const noComment = require('./comment-no.route');
const docsRoute = require('./docs.route');
const uploadRoute = require('./upload.route');
const videoRoute = require('./video.route');
const commentRoute = require('./comment.route');
const getCommentVideo = require('./getCommentVideo.route');
const searchVideo = require('./video-search.route');
const rankingRoute = require('./ranking.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/no-comment',
    route: noComment,
  },
  {
    path: '/upload',
    route: uploadRoute,
  },
  {
    path: '/video',
    route: videoRoute,
  },
  {
    path: '/rankings',
    route: rankingRoute,
  },
  {
    path: '/comments',
    route: commentRoute,
  },
  {
    path: '/get-comments-by-video',
    route: getCommentVideo,
  },
  {
    path: '/search-videos',
    route: searchVideo,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
