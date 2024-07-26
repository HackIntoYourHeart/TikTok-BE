const { livestreamService } = require('../services');

const handleWebSocketConnection = (ws) => {
  console.log('Client connected');
  const streamUrl = 'rtsp://your_rtsp_stream'; // Thay thế bằng URL của luồng RTSP
  livestreamService.startStreaming(ws, streamUrl);
};

module.exports = {
  handleWebSocketConnection,
};
