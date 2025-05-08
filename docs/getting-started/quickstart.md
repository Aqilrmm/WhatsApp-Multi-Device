# Quick Start Guide for WhatsApp Multi-Device API

Welcome to the Quick Start Guide for the WhatsApp Multi-Device API! This guide will help you get up and running with the API quickly.

## Prerequisites

Before you begin, ensure you have the following:

- Node.js installed on your machine (version 14 or higher).
- A WhatsApp account to connect with the API.
- Basic knowledge of JavaScript and RESTful APIs.

## Installation

1. **Clone the Repository**

   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/yourusername/whatsapp-multi-device-api.git
   ```

2. **Navigate to the Project Directory**

   Change into the project directory:

   ```bash
   cd whatsapp-multi-device-api
   ```

3. **Install Dependencies**

   Install the required dependencies using npm:

   ```bash
   npm install
   ```

## Initial Setup

1. **Configuration**

   Create a configuration file named `config.js` in the root directory and set up your API configurations, such as port and log level.

   ```javascript
   module.exports = {
     port: 3000,
     logLevel: 'info',
   };
   ```

2. **Start the Server**

   You can start the server using the following command:

   ```bash
   npm start
   ```

   The server will start running on `http://localhost:3000`.

## Basic Usage

### Sending a Message

To send a message using the API, make a POST request to the `/api/messages/send` endpoint with the following JSON body:

```json
{
  "deviceId": "your-device-id",
  "to": "recipient-number",
  "message": "Hello, World!"
}
```

### Getting Device Status

To check the status of a device, make a GET request to the `/api/devices/:deviceId` endpoint:

```bash
curl http://localhost:3000/api/devices/your-device-id
```

## Conclusion

You are now ready to use the WhatsApp Multi-Device API! For more detailed information, please refer to the [API Reference](../api-reference/index.md) and other guides in the documentation. Happy coding!