// src/services/clientService.js
const deviceManager = require('../models/Device');
const logger = require('../utils/logger');

exports.setupMessageHandlers = () => {
  // Set up global message handler
  deviceManager.setGlobalMessageHandler((message, deviceId) => {
    logger.info(`Message from ${message.from} to device ${deviceId}: ${message.body.substring(0, 50)}${message.body.length > 50 ? '...' : ''}`);
    
    // Here you would implement webhook notifications
    // For now, we'll just log the message
  });
};