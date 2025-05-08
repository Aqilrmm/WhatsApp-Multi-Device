# Panduan Otentikasi untuk API Multi-Perangkat WhatsApp

## Gambaran Umum

Panduan ini menjelaskan mekanisme otentikasi yang digunakan dalam API Multi-Perangkat WhatsApp. Otentikasi yang tepat sangat penting untuk mengamankan permintaan API Anda dan mengelola sesi pengguna secara efektif.

## Mekanisme Otentikasi

API ini menggunakan otentikasi berbasis token. Setelah login berhasil, token akan dibuat dan harus disertakan dalam header setiap permintaan berikutnya untuk mengakses sumber daya yang dilindungi.

### Langkah-Langkah Otentikasi

1. **Permintaan Login**: Kirim permintaan POST ke endpoint `/api/auth/login` dengan payload berikut:

   ```json
   {
     "username": "nama_pengguna_anda",
     "password": "kata_sandi_anda"
   }
   ```

2. **Menerima Token**: Setelah otentikasi berhasil, server akan merespons dengan objek JSON yang berisi token otentikasi:

   ```json
   {
     "token": "token_otentikasi_anda"
   }
   ```

3. **Sertakan Token dalam Permintaan**: Untuk semua permintaan berikutnya ke endpoint yang dilindungi, sertakan token dalam header Authorization:

   ```
   Authorization: Bearer token_otentikasi_anda
   ```

### Masa Berlaku Token

Token berlaku untuk waktu yang terbatas. Jika token kedaluwarsa, Anda akan menerima respons `401 Unauthorized`. Untuk mendapatkan token baru, ulangi proses login.

### Manajemen Sesi

API ini mendukung manajemen sesi, memungkinkan Anda untuk keluar (logout) dan membatalkan token. Untuk keluar, kirim permintaan POST ke endpoint `/api/auth/logout` dengan token di header.

## Praktik Terbaik

- **Penyimpanan Aman**: Simpan token dengan aman di sisi klien untuk mencegah akses yang tidak sah.
- **Pembaruan Token**: Implementasikan mekanisme untuk memperbarui token sebelum kedaluwarsa untuk menjaga sesi pengguna tetap berjalan dengan lancar.
- **Penanganan Kesalahan**: Tangani kesalahan otentikasi dengan baik di aplikasi Anda untuk meningkatkan pengalaman pengguna.

## Kesimpulan

Mengikuti panduan otentikasi ini akan membantu Anda berinteraksi dengan aman dengan API Multi-Perangkat WhatsApp. Untuk detail lebih lanjut tentang fungsionalitas API lainnya, lihat bagian referensi API.