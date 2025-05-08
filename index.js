// index.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const config = require('./config');
const logger = require('./src/utils/logger');
const deviceRoutes = require('./src/routes/deviceRoutes');
const messageRoutes = require('./src/routes/messageRoutes');
const { initializeQrService } = require('./src/services/qrService');

// Create data directory if it doesn't exist
if (!fs.existsSync(config.dataDir)) {
  fs.mkdirSync(config.dataDir, { recursive: true });
  logger.info(`Created data directory: ${config.dataDir}`);
}

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Initialize QR service with socket.io
initializeQrService(io);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/devices', deviceRoutes);
app.use('/api/messages', messageRoutes);

// QR Scanner route
app.get('/qr-scanner/:deviceId', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'qr-scanner.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ error: err.message });
});

// Start the server
server.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});
