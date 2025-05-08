# Panduan Memulai Cepat untuk API Multi-Perangkat WhatsApp

Selamat datang di Panduan Memulai Cepat untuk API Multi-Perangkat WhatsApp! Panduan ini akan membantu Anda untuk memulai dan menjalankan API dengan cepat.

## Prasyarat

Sebelum Anda memulai, pastikan Anda memiliki hal-hal berikut:

- Node.js terinstal di mesin Anda (versi 14 atau lebih tinggi).
- Akun WhatsApp untuk terhubung dengan API.
- Pengetahuan dasar tentang JavaScript dan API RESTful.

## Instalasi

1. **Klon Repository**

   Buka terminal Anda dan jalankan perintah berikut untuk mengklon repositori:

   ```bash
   git clone https://github.com/yourusername/whatsapp-multi-device-api.git
   ```

2. **Navigasi ke Direktori Proyek**

   Masuk ke direktori proyek:

   ```bash
   cd whatsapp-multi-device-api
   ```

3. **Instal Dependensi**

   Instal dependensi yang diperlukan menggunakan npm:

   ```bash
   npm install
   ```

## Pengaturan Awal

1. **Konfigurasi**

   Buat file konfigurasi bernama `config.js` di direktori root dan atur konfigurasi API Anda, seperti port dan level log.

   ```javascript
   module.exports = {
     port: 3000,
     logLevel: 'info',
   };
   ```

2. **Mulai Server**

   Anda dapat memulai server menggunakan perintah berikut:

   ```bash
   npm start
   ```

   Server akan mulai berjalan di `http://localhost:3000`.

## Penggunaan Dasar

### Mengirim Pesan

Untuk mengirim pesan menggunakan API, buat permintaan POST ke endpoint `/api/messages/send` dengan body JSON berikut:

```json
{
  "deviceId": "your-device-id",
  "to": "nomor-penerima",
  "message": "Halo, Dunia!"
}
```

### Mendapatkan Status Perangkat

Untuk memeriksa status perangkat, buat permintaan GET ke endpoint `/api/devices/:deviceId`:

```bash
curl http://localhost:3000/api/devices/your-device-id
```

## Kesimpulan

Anda sekarang siap untuk menggunakan API Multi-Perangkat WhatsApp! Untuk informasi lebih rinci, silakan merujuk ke [Referensi API](../api-reference/index.md) dan panduan lainnya dalam dokumentasi. SelamatCoding!