const ffmpeg = require('fluent-ffmpeg');

const startStreaming = (ws, streamUrl) => {
  const ffmpegProcess = ffmpeg(streamUrl)
    .inputOptions(['-rtsp_transport tcp'])
    .format('mp4')
    .videoCodec('libx264')
    .audioCodec('aac')
    .on('end', () => {
      console.log('Stream ended');
      ws.close();
    })
    .on('error', (err) => {
      console.error('FFmpeg error:', err);
      ws.close();
    })
    .pipe();

  ffmpegProcess.on('data', (chunk) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(chunk);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    ffmpegProcess.kill('SIGKILL');
  });
};

module.exports = {
  startStreaming,
};
