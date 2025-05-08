
// src/services/qrService.js
const qrcode = require('qrcode');
const logger = require('../utils/logger');

let io;
const deviceQrMap = new Map();

exports.initializeQrService = (socketIo) => {
  io = socketIo;
  
  io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.id}`);
    
    socket.on('join-device', (deviceId) => {
      socket.join(deviceId);
      logger.info(`Socket ${socket.id} joined room for device ${deviceId}`);
      
      // If we already have a QR for this device, send it immediately
      const device = deviceQrMap.get(deviceId);
      if (device && device.qr) {
        qrcode.toDataURL(device.qr, (err, url) => {
          if (!err) {
            socket.emit('qr-code', { deviceId, qrDataUrl: url, status: device.status });
          }
        });
      }
    });
    
    socket.on('disconnect', () => {
      logger.info(`Socket disconnected: ${socket.id}`);
    });
  });
};

exports.registerDevice = (deviceId, device) => {
  deviceQrMap.set(deviceId, device);
  
  // Watch for QR code updates
  const qrInterval = setInterval(() => {
    if (device.qr && device.status === 'qr_ready') {
      qrcode.toDataURL(device.qr, (err, url) => {
        if (!err) {
          io.to(deviceId).emit('qr-code', { deviceId, qrDataUrl: url, status: device.status });
        }
      });
    } else if (device.status === 'connected' || device.status === 'authenticated') {
      io.to(deviceId).emit('device-connected', { 
        deviceId, 
        status: device.status,
        info: device.info
      });
      
      // Device connected, no need to keep checking for QR
      clearInterval(qrInterval);
    }
  }, 1000);
};

exports.unregisterDevice = (deviceId) => {
  deviceQrMap.delete(deviceId);
  io.to(deviceId).emit('device-removed', { deviceId });
};
