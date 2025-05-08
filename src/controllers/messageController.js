// src/controllers/messageController.js
const deviceManager = require('../models/Device');
const logger = require('../utils/logger');

exports.sendMessage = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { to, message } = req.body;
    
    if (!to || !message) {
      return res.status(400).json({ error: 'To and message fields are required' });
    }
    
    const device = deviceManager.getDevice(deviceId);
    
    if (!device) {
      return res.status(404).json({ error: `Device ${deviceId} not found` });
    }
    
    if (device.status !== 'connected') {
      return res.status(400).json({ 
        error: `Device ${deviceId} is not connected`,
        status: device.status
      });
    }
    
    const result = await device.sendMessage(to, message);
    
    res.json({ 
      success: true, 
      messageId: result.id._serialized,
      from: deviceId,
      to,
      timestamp: result.timestamp
    });
  } catch (error) {
    logger.error(`Error sending message from device ${req.params.deviceId}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  // This would require storing messages in a database
  // For simplicity, we'll return an empty array or implement a webhook system
  res.json({ 
    message: 'To get messages, please implement a webhook endpoint and register it using the /api/messages/webhook endpoint',
    messages: []
  });
};

exports.registerWebhook = async (req, res) => {
  try {
    const { url, events } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'Webhook URL is required' });
    }
    
    // In a real implementation, store the webhook URL and events in a database
    // For now, we'll just log it
    logger.info(`Webhook registered: ${url}, events: ${events || 'all'}`);
    
    // Here you would implement logic to send messages to this webhook
    
    res.json({ 
      success: true, 
      message: 'Webhook registered',
      url,
      events: events || 'all'
    });
  } catch (error) {
    logger.error(`Error registering webhook: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
