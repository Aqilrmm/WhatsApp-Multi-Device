// src/models/Device.js
const path = require('path');
const config = require('../../config');
const WhatsAppClient = require('./Client');

class DeviceManager {
  constructor() {
    this.devices = new Map();
    this.globalMessageHandler = null;
  }

  getDevice(deviceId) {
    return this.devices.get(deviceId);
  }

  getAllDevices() {
    const deviceList = [];
    this.devices.forEach((device, deviceId) => {
      deviceList.push({
        deviceId,
        status: device.status,
        info: device.info,
        lastActive: device.lastActive
      });
    });
    return deviceList;
  }

  hasDevice(deviceId) {
    return this.devices.has(deviceId);
  }

  createDevice(deviceId) {
    if (this.devices.has(deviceId)) {
      throw new Error(`Device with ID ${deviceId} already exists`);
    }

    const sessionDir = path.join(config.dataDir, 'sessions', deviceId);
    const client = new WhatsAppClient(deviceId, sessionDir);
    
    if (this.globalMessageHandler) {
      client.registerMessageHandler(this.globalMessageHandler);
    }
    
    const initializedClient = client.initialize();
    this.devices.set(deviceId, initializedClient);
    
    return initializedClient;
  }

  async removeDevice(deviceId) {
    const device = this.devices.get(deviceId);
    if (!device) {
      throw new Error(`Device with ID ${deviceId} not found`);
    }

    await device.disconnect();
    this.devices.delete(deviceId);
    return { success: true, message: `Device ${deviceId} removed` };
  }

  setGlobalMessageHandler(handler) {
    this.globalMessageHandler = handler;
    
    this.devices.forEach(device => {
      device.registerMessageHandler(handler);
    });
  }
}

const deviceManager = new DeviceManager();
module.exports = deviceManager;