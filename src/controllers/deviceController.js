// src/controllers/deviceController.js
const { v4: uuidv4 } = require('uuid');
const deviceManager = require('../models/Device');
const qrService = require('../services/qrService');
const logger = require('../utils/logger');

exports.getAllDevices = async (req, res) => {
  try {
    const devices = deviceManager.getAllDevices();
    res.json({ devices });
  } catch (error) {
    logger.error(`Error getting all devices: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.getDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const device = deviceManager.getDevice(deviceId);
    
    if (!device) {
      return res.status(404).json({ error: `Device ${deviceId} not found` });
    }
    
    const deviceInfo = await device.getDeviceInfo();
    res.json({ device: deviceInfo });
  } catch (error) {
    logger.error(`Error getting device ${req.params.deviceId}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.createDevice = async (req, res) => {
  try {
    let { deviceId } = req.body;
    
    // Generate deviceId if not provided
    if (!deviceId) {
      deviceId = uuidv4();
    }
    
    // Check if device exists
    if (deviceManager.hasDevice(deviceId)) {
      return res.status(409).json({ 
        error: `Device ${deviceId} already exists`,
        message: 'A device with this ID already exists. Please delete it first or use a different ID.'
      });
    }
    
    // Create device
    const device = deviceManager.createDevice(deviceId);
    
    // Register for QR updates
    qrService.registerDevice(deviceId, device);
    
    res.status(201).json({ 
      deviceId,
      status: device.status,
      message: 'Device created. Scan the QR code to connect.',
      qrScanUrl: `/qr-scanner/${deviceId}`
    });
  } catch (error) {
    logger.error(`Error creating device: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.removeDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;
    
    // Check if device exists
    if (!deviceManager.hasDevice(deviceId)) {
      return res.status(404).json({ error: `Device ${deviceId} not found` });
    }
    
    // Remove device
    await deviceManager.removeDevice(deviceId);
    
    // Unregister from QR service
    qrService.unregisterDevice(deviceId);
    
    res.json({ success: true, message: `Device ${deviceId} removed` });
  } catch (error) {
    logger.error(`Error removing device ${req.params.deviceId}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.getDeviceQR = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const device = deviceManager.getDevice(deviceId);
    
    if (!device) {
      return res.status(404).json({ error: `Device ${deviceId} not found` });
    }
    
    if (device.status === 'connected') {
      return res.status(400).json({ 
        error: 'Device already connected',
        status: device.status,
        info: device.info
      });
    }
    
    if (!device.qr) {
      return res.status(202).json({ 
        message: 'QR code not generated yet',
        status: device.status
      });
    }
    
    res.json({ 
      deviceId,
      qrCode: device.qr,
      status: device.status
    });
  } catch (error) {
    logger.error(`Error getting QR for device ${req.params.deviceId}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
