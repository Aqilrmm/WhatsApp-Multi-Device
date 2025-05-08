# Referensi API Manajemen Perangkat

## Gambaran Umum
API Manajemen Perangkat memungkinkan Anda untuk mengelola perangkat WhatsApp yang terhubung ke aplikasi Anda. Anda dapat membuat, mengambil, memperbarui, dan menghapus perangkat, serta mendapatkan status terkini dan kode QR untuk autentikasi.

## URL Dasar
```
http://<your-api-url>/api/devices
```

## Endpoint

### 1. Dapatkan Semua Perangkat
- **Endpoint:** `GET /api/devices`
- **Deskripsi:** Mengambil daftar semua perangkat yang terdaftar.
- **Respons:**
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

### 2. Dapatkan Perangkat berdasarkan ID
- **Endpoint:** `GET /api/devices/:deviceId`
- **Deskripsi:** Mengambil detail perangkat tertentu berdasarkan ID-nya.
- **Parameter:**
  - `deviceId` (path) - ID perangkat yang akan diambil.
- **Respons:**
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
  - **404 Tidak Ditemukan**
    ```json
    {
      "error": "Perangkat <deviceId> tidak ditemukan"
    }
    ```

### 3. Buat Perangkat
- **Endpoint:** `POST /api/devices`
- **Deskripsi:** Membuat perangkat baru.
- **Body Permintaan:**
  ```json
  {
    "deviceId": "string" // Opsional, akan dibuat jika tidak disediakan
  }
  ```
- **Respons:**
  - **201 Dibuat**
    ```json
    {
      "deviceId": "string",
      "status": "string",
      "message": "Perangkat dibuat. Pindai kode QR untuk terhubung.",
      "qrScanUrl": "/qr-scanner/:deviceId"
    }
    ```
  - **409 Konflik**
    ```json
    {
      "error": "Perangkat <deviceId> sudah ada"
    }
    ```

### 4. Hapus Perangkat
- **Endpoint:** `DELETE /api/devices/:deviceId`
- **Deskripsi:** Menghapus perangkat berdasarkan ID-nya.
- **Parameter:**
  - `deviceId` (path) - ID perangkat yang akan dihapus.
- **Respons:**
  - **200 OK**
    ```json
    {
      "success": true,
      "message": "Perangkat <deviceId> dihapus"
    }
    ```
  - **404 Tidak Ditemukan**
    ```json
    {
      "error": "Perangkat <deviceId> tidak ditemukan"
    }
    ```

### 5. Dapatkan Kode QR Perangkat
- **Endpoint:** `GET /api/devices/:deviceId/qr`
- **Deskripsi:** Mengambil kode QR untuk perangkat tertentu.
- **Parameter:**
  - `deviceId` (path) - ID perangkat yang kode QR-nya akan diambil.
- **Respons:**
  - **200 OK**
    ```json
    {
      "deviceId": "string",
      "qrCode": "string",
      "status": "string"
    }
    ```
  - **404 Tidak Ditemukan**
    ```json
    {
      "error": "Perangkat <deviceId> tidak ditemukan"
    }
    ```
  - **202 Diterima**
    ```json
    {
      "message": "Kode QR belum dibuat",
      "status": "string"
    }
    ```

## Contoh Penggunaan

### Dapatkan Semua Perangkat
```bash
curl -X GET http://<your-api-url>/api/devices
```

### Buat Perangkat
```bash
curl -X POST http://<your-api-url>/api/devices -H "Content-Type: application/json" -d '{"deviceId": "my-device-id"}'
```

### Hapus Perangkat
```bash
curl -X DELETE http://<your-api-url>/api/devices/my-device-id
```

### Dapatkan Kode QR Perangkat
```bash
curl -X GET http://<your-api-url>/api/devices/my-device-id/qr
```

## Kesimpulan
API ini menyediakan cara komprehensif untuk mengelola perangkat WhatsApp di dalam aplikasi Anda. Pastikan untuk menangani respons dengan tepat dan merujuk ke bagian lain dari dokumentasi untuk detail lebih lanjut tentang fungsionalitas pesan dan webhook.