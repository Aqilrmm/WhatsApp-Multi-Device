# Dokumentasi API Pesan

## Gambaran Umum

API Pesan memungkinkan Anda mengirim dan menerima pesan melalui WhatsApp Multi-Device Manager. Dokumen ini menguraikan endpoints yang tersedia, format permintaan dan respons, serta menyediakan contoh untuk kasus penggunaan umum.

## URL Dasar

```
http://<your-server-url>/api/messages
```

## Endpoints

### Kirim Pesan

- **POST** `/send`

#### Deskripsi

Endpoint ini memungkinkan Anda mengirim pesan dari perangkat tertentu ke penerima.

#### Permintaan

- **Headers**
  - `Content-Type: application/json`

- **Body**
```json
{
  "to": "<nomor-telepon-penerima>",
  "message": "<isi-pesan>"
}
```

#### Respons

- **Sukses (200 OK)**
```json
{
  "success": true,
  "messageId": "<message-id>",
  "from": "<device-id>",
  "to": "<nomor-telepon-penerima>",
  "timestamp": "<timestamp>"
}
```

- **Error (400 Bad Request)**
```json
{
  "error": "Kolom 'to' dan 'message' wajib diisi"
}
```

### Dapatkan Pesan

- **GET** `/:deviceId`

#### Deskripsi

Endpoint ini mengambil pesan untuk perangkat tertentu. Perhatikan bahwa implementasi ini memerlukan webhook untuk diatur untuk menerima pesan.

#### Permintaan

- **Parameter**
  - `deviceId`: ID perangkat untuk mengambil pesan.

#### Respons

- **Sukses (200 OK)**
```json
{
  "message": "Untuk mendapatkan pesan, harap implementasikan endpoint webhook dan daftarkan menggunakan endpoint /api/messages/webhook",
  "messages": []
}
```

### Daftarkan Webhook

- **POST** `/webhook`

#### Deskripsi

Endpoint ini memungkinkan Anda mendaftarkan webhook untuk acara pesan.

#### Permintaan

- **Headers**
  - `Content-Type: application/json`

- **Body**
```json
{
  "url": "<url-webhook>",
  "events": ["message_received", "message_sent"]
}
```

#### Respons

- **Sukses (200 OK)**
```json
{
  "success": true,
  "message": "Webhook terdaftar",
  "url": "<url-webhook>",
  "events": ["message_received", "message_sent"]
}
```

- **Error (400 Bad Request)**
```json
{
  "error": "URL Webhook wajib diisi"
}
```

## Contoh Penggunaan

### Mengirim Pesan

```bash
curl -X POST http://<your-server-url>/api/messages/send \
-H "Content-Type: application/json" \
-d '{"to": "+1234567890", "message": "Halo, Dunia!"}'
```

### Mengambil Pesan

```bash
curl -X GET http://<your-server-url>/api/messages/<device-id>
```

### Mendaftarkan Webhook

```bash
curl -X POST http://<your-server-url>/api/messages/webhook \
-H "Content-Type: application/json" \
-d '{"url": "https://your-webhook-url.com", "events": ["message_received"]}'
```

## Kesimpulan

API Pesan ini menyediakan cara mudah untuk berinteraksi dengan WhatsApp Multi-Device Manager untuk mengirim dan menerima pesan. Untuk detail lebih lanjut, lihat bagian lain dari dokumentasi API.