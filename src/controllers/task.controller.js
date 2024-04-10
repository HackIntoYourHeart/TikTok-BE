const schedule = require('node-schedule');
const { updateRanking } = require('../services/user.service');

const dailyJob = schedule.scheduleJob('00 00 * * *', function () {
  console.log("running task.............");
  updateRanking();
});

module.exports = {
    dailyJob
};