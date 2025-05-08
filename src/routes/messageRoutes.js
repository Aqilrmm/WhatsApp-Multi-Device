// src/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Send message from specific device
router.post('/:deviceId/send', messageController.sendMessage);

// Get messages for specific device (implementation would depend on your storage method)
router.get('/:deviceId', messageController.getMessages);

// Register webhook for message events
router.post('/webhook', messageController.registerWebhook);

module.exports = router;

