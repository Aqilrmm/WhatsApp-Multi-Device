// src/routes/deviceRoutes.js
const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

// Get all devices
router.get('/', deviceController.getAllDevices);

// Get specific device
router.get('/:deviceId', deviceController.getDevice);

// Create new device
router.post('/', deviceController.createDevice);

// Remove device
router.delete('/:deviceId', deviceController.removeDevice);

// Get device QR code
router.get('/:deviceId/qr', deviceController.getDeviceQR);

module.exports = router;
