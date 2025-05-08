# Authentication Guide for WhatsApp Multi-Device API

## Overview

This guide explains the authentication mechanisms used in the WhatsApp Multi-Device API. Proper authentication is essential for securing your API requests and managing user sessions effectively.

## Authentication Mechanism

The API uses token-based authentication. Upon successful login, a token is generated and must be included in the header of subsequent requests to access protected resources.

### Steps to Authenticate

1. **Login Request**: Send a POST request to the `/api/auth/login` endpoint with the following payload:

   ```json
   {
     "username": "your_username",
     "password": "your_password"
   }
   ```

2. **Receive Token**: On successful authentication, the server responds with a JSON object containing the authentication token:

   ```json
   {
     "token": "your_auth_token"
   }
   ```

3. **Include Token in Requests**: For all subsequent requests to protected endpoints, include the token in the Authorization header:

   ```
   Authorization: Bearer your_auth_token
   ```

### Token Expiration

Tokens are valid for a limited time. If a token expires, you will receive a `401 Unauthorized` response. To obtain a new token, repeat the login process.

### Session Management

The API supports session management, allowing you to log out and invalidate tokens. To log out, send a POST request to the `/api/auth/logout` endpoint with the token in the header.

## Best Practices

- **Secure Storage**: Store tokens securely on the client side to prevent unauthorized access.
- **Token Renewal**: Implement a mechanism to renew tokens before they expire to maintain user sessions seamlessly.
- **Error Handling**: Handle authentication errors gracefully in your application to enhance user experience.

## Conclusion

Following this authentication guide will help you securely interact with the WhatsApp Multi-Device API. For further details on other API functionalities, refer to the API reference section.