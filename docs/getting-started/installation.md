# Panduan Instalasi untuk API Multi-Perangkat WhatsApp

## Prasyarat

Sebelum memulai instalasi, pastikan Anda memiliki prasyarat berikut:

- **Node.js**: Pastikan Anda telah menginstal Node.js di mesin Anda. Anda dapat mengunduhnya dari [nodejs.org](https://nodejs.org/).
- **npm**: npm (Node Package Manager) termasuk dalam Node.js. Anda akan menggunakannya untuk menginstal paket-paket yang diperlukan.

## Langkah-Langkah Instalasi

1. **Klon Repository**:
   Buka terminal Anda dan klon repositori menggunakan perintah berikut:
   ```bash
   git clone https://github.com/yourusername/whatsapp-multi-device-api.git
   ```

2. **Navigasi ke Direktori Proyek**:
   Ubah direktori Anda ke proyek yang telah diklon:
   ```bash
   cd whatsapp-multi-device-api
   ```

3. **Instal Dependensi**:
   Jalankan perintah berikut untuk menginstal dependensi yang diperlukan:
   ```bash
   npm install
   ```

4. **Konfigurasi**:
   Buat file konfigurasi berdasarkan template yang disediakan. Anda mungkin perlu mengatur variabel lingkungan atau memodifikasi file konfigurasi sesuai dengan lingkungan Anda.

5. **Jalankan API**:
   Mulai server API menggunakan perintah berikut:
   ```bash
   npm start
   ```

## Tips Pemecahan Masalah

- Jika Anda mengalami masalah selama instalasi, pastikan Anda memiliki versi Node.js dan npm yang benar terinstal.
- Periksa pesan kesalahan di terminal dan lihat dokumentasi untuk kode kesalahan tertentu.
- Jika server tidak dimulai, verifikasi bahwa semua dependensi telah terinstal dengan benar dan tidak ada konflik dalam konfigurasi Anda.

Untuk bantuan lebih lanjut, lihat [Referensi API](../api-reference/index.md) atau [Panduan](../guides/index.md).