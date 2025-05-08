// config.js
module.exports = {
    port: process.env.PORT || 3000,
    logLevel: process.env.LOG_LEVEL || 'info',
    dataDir: './data',
    qrTimeout: 60000, // 1 minute
    sessionTimeout: 30 * 60000, // 30 minutes
  };