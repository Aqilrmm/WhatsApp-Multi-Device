# Messaging API Documentation

## Overview

The Messaging API allows you to send and receive messages through the WhatsApp Multi-Device Manager. This document outlines the available endpoints, request and response formats, and provides examples for common use cases.

## Base URL

```
http://<your-server-url>/api/messages
```

## Endpoints

### Send Message

- **POST** `/send`

#### Description

This endpoint allows you to send a message from a specific device to a recipient.

#### Request

- **Headers**
  - `Content-Type: application/json`

- **Body**
```json
{
  "to": "<recipient-phone-number>",
  "message": "<message-content>"
}
```

#### Response

- **Success (200 OK)**
```json
{
  "success": true,
  "messageId": "<message-id>",
  "from": "<device-id>",
  "to": "<recipient-phone-number>",
  "timestamp": "<timestamp>"
}
```

- **Error (400 Bad Request)**
```json
{
  "error": "To and message fields are required"
}
```

### Get Messages

- **GET** `/:deviceId`

#### Description

This endpoint retrieves messages for a specific device. Note that this implementation requires a webhook to be set up for receiving messages.

#### Request

- **Parameters**
  - `deviceId`: The ID of the device for which to retrieve messages.

#### Response

- **Success (200 OK)**
```json
{
  "message": "To get messages, please implement a webhook endpoint and register it using the /api/messages/webhook endpoint",
  "messages": []
}
```

### Register Webhook

- **POST** `/webhook`

#### Description

This endpoint allows you to register a webhook for message events.

#### Request

- **Headers**
  - `Content-Type: application/json`

- **Body**
```json
{
  "url": "<webhook-url>",
  "events": ["message_received", "message_sent"]
}
```

#### Response

- **Success (200 OK)**
```json
{
  "success": true,
  "message": "Webhook registered",
  "url": "<webhook-url>",
  "events": ["message_received", "message_sent"]
}
```

- **Error (400 Bad Request)**
```json
{
  "error": "Webhook URL is required"
}
```

## Example Usage

### Sending a Message

```bash
curl -X POST http://<your-server-url>/api/messages/send \
-H "Content-Type: application/json" \
-d '{"to": "+1234567890", "message": "Hello, World!"}'
```

### Retrieving Messages

```bash
curl -X GET http://<your-server-url>/api/messages/<device-id>
```

### Registering a Webhook

```bash
curl -X POST http://<your-server-url>/api/messages/webhook \
-H "Content-Type: application/json" \
-d '{"url": "https://your-webhook-url.com", "events": ["message_received"]}'
```

## Conclusion

This Messaging API provides a straightforward way to interact with the WhatsApp Multi-Device Manager for sending and receiving messages. For further details, refer to the other sections of the API documentation.