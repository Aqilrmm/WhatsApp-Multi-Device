# Device Management API Reference

## Overview
The Device Management API allows you to manage WhatsApp devices connected to your application. You can create, retrieve, update, and delete devices, as well as obtain their current status and QR codes for authentication.

## Base URL
```
http://<your-api-url>/api/devices
```

## Endpoints

### 1. Get All Devices
- **Endpoint:** `GET /api/devices`
- **Description:** Retrieve a list of all registered devices.
- **Response:**
  - **200 OK**
    ```json
    {
      "devices": [
        {
          "deviceId": "string",
          "status": "string",
          "info": {
            "number": "string",
            "pushname": "string"
          },
          "lastActive": "timestamp"
        }
      ]
    }
    ```

### 2. Get Device by ID
- **Endpoint:** `GET /api/devices/:deviceId`
- **Description:** Retrieve details of a specific device by its ID.
- **Parameters:**
  - `deviceId` (path) - The ID of the device to retrieve.
- **Response:**
  - **200 OK**
    ```json
    {
      "device": {
        "deviceId": "string",
        "status": "string",
        "info": {
          "number": "string",
          "pushname": "string"
        },
        "lastActive": "timestamp"
      }
    }
    ```
  - **404 Not Found**
    ```json
    {
      "error": "Device <deviceId> not found"
    }
    ```

### 3. Create Device
- **Endpoint:** `POST /api/devices`
- **Description:** Create a new device.
- **Request Body:**
  ```json
  {
    "deviceId": "string" // Optional, will be generated if not provided
  }
  ```
- **Response:**
  - **201 Created**
    ```json
    {
      "deviceId": "string",
      "status": "string",
      "message": "Device created. Scan the QR code to connect.",
      "qrScanUrl": "/qr-scanner/:deviceId"
    }
    ```
  - **409 Conflict**
    ```json
    {
      "error": "Device <deviceId> already exists"
    }
    ```

### 4. Remove Device
- **Endpoint:** `DELETE /api/devices/:deviceId`
- **Description:** Remove a device by its ID.
- **Parameters:**
  - `deviceId` (path) - The ID of the device to remove.
- **Response:**
  - **200 OK**
    ```json
    {
      "success": true,
      "message": "Device <deviceId> removed"
    }
    ```
  - **404 Not Found**
    ```json
    {
      "error": "Device <deviceId> not found"
    }
    ```

### 5. Get Device QR Code
- **Endpoint:** `GET /api/devices/:deviceId/qr`
- **Description:** Retrieve the QR code for a specific device.
- **Parameters:**
  - `deviceId` (path) - The ID of the device for which to retrieve the QR code.
- **Response:**
  - **200 OK**
    ```json
    {
      "deviceId": "string",
      "qrCode": "string",
      "status": "string"
    }
    ```
  - **404 Not Found**
    ```json
    {
      "error": "Device <deviceId> not found"
    }
    ```
  - **202 Accepted**
    ```json
    {
      "message": "QR code not generated yet",
      "status": "string"
    }
    ```

## Example Usage

### Get All Devices
```bash
curl -X GET http://<your-api-url>/api/devices
```

### Create a Device
```bash
curl -X POST http://<your-api-url>/api/devices -H "Content-Type: application/json" -d '{"deviceId": "my-device-id"}'
```

### Remove a Device
```bash
curl -X DELETE http://<your-api-url>/api/devices/my-device-id
```

### Get Device QR Code
```bash
curl -X GET http://<your-api-url>/api/devices/my-device-id/qr
```

## Conclusion
This API provides a comprehensive way to manage WhatsApp devices within your application. Ensure to handle responses appropriately and refer to the other sections of the documentation for more details on messaging and webhook functionalities.