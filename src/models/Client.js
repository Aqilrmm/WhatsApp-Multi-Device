// src/models/Client.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const path = require('path');
const fs = require('fs');
const config = require('../../config');
const logger = require('../utils/logger');

class WhatsAppClient {
  constructor(deviceId, sessionDir) {
    this.deviceId = deviceId;
    this.sessionDir = sessionDir;
    this.client = null;
    this.qr = null;
    this.info = null;
    this.status = 'initializing';
    this.lastActive = Date.now();
    this.messageHandlers = [];
  }

  initialize() {
    // Create session directory if it doesn't exist
    if (!fs.existsSync(this.sessionDir)) {
      fs.mkdirSync(this.sessionDir, { recursive: true });
    }

    // Initialize WhatsApp client
    this.client = new Client({
      authStrategy: new LocalAuth({
        clientId: this.deviceId,
        dataPath: this.sessionDir
      }),
      puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      }
    });

    // Set up event handlers
    this.client.on('qr', (qr) => {
      this.qr = qr;
      this.status = 'qr_ready';
      logger.info(`QR code generated for device: ${this.deviceId}`);
      this.lastActive = Date.now();
    });

    this.client.on('ready', async () => {
      this.status = 'connected';
      this.qr = null;
      this.lastActive = Date.now();
      
      try {
        this.info = {
          number: (await this.client.getWid()).user,
          pushname: await this.client.getInfo(),
          status: await this.client.getStatus(),
          profilePictureUrl: await this.client.getProfilePicUrl(await this.client.getWid()._serialized) || null
        };
        
        logger.info(`Device ${this.deviceId} is ready. WhatsApp number: ${this.info.number}`);
      } catch (error) {
        logger.error(`Failed to get client info for ${this.deviceId}: ${error.message}`);
        this.info = { number: 'unknown', pushname: 'unknown' };
      }
    });

    this.client.on('authenticated', () => {
      this.status = 'authenticated';
      this.qr = null;
      this.lastActive = Date.now();
      logger.info(`Device ${this.deviceId} authenticated`);
    });

    this.client.on('auth_failure', (msg) => {
      this.status = 'auth_failure';
      logger.error(`Authentication failure for device ${this.deviceId}: ${msg}`);
    });

    this.client.on('disconnected', (reason) => {
      this.status = 'disconnected';
      logger.info(`Device ${this.deviceId} disconnected: ${reason}`);
    });

    this.client.on('message', (message) => {
      this.lastActive = Date.now();
      logger.info(`New message received on device ${this.deviceId} from ${message.from}`);
      
      // Notify all registered message handlers
      this.messageHandlers.forEach(handler => {
        try {
          handler(message, this.deviceId);
        } catch (error) {
          logger.error(`Error in message handler for device ${this.deviceId}: ${error.message}`);
        }
      });
    });

    // Initialize the client
    this.client.initialize()
      .catch(error => {
        this.status = 'error';
        logger.error(`Failed to initialize client for device ${this.deviceId}: ${error.message}`);
      });

    return this;
  }

  async getDeviceInfo() {
    return {
      deviceId: this.deviceId,
      status: this.status,
      info: this.info,
      lastActive: this.lastActive
    };
  }

  async sendMessage(to, message) {
    if (this.status !== 'connected') {
      throw new Error(`Device ${this.deviceId} is not connected`);
    }

    try {
      const result = await this.client.sendMessage(to, message);
      logger.info(`Message sent from device ${this.deviceId} to ${to}`);
      return result;
    } catch (error) {
      logger.error(`Failed to send message from device ${this.deviceId} to ${to}: ${error.message}`);
      throw error;
    }
  }

  registerMessageHandler(handler) {
    if (typeof handler === 'function') {
      this.messageHandlers.push(handler);
    }
  }

  async disconnect() {
    try {
      if (this.client) {
        await this.client.destroy();
        this.status = 'disconnected';
        logger.info(`Device ${this.deviceId} disconnected`);
      }
    } catch (error) {
      logger.error(`Error disconnecting device ${this.deviceId}: ${error.message}`);
    }
  }
}


module.exports = WhatsAppClient;