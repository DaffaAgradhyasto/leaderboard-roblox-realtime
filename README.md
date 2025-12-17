# 🎮 Roblox Leaderboard Real-time

Papan peringkat (leaderboard) real-time untuk game Roblox yang sedang trending dan banyak dimainkan. Aplikasi ini menampilkan data asli dari Roblox API dengan pembaruan otomatis.

## ✨ Fitur

- 🔥 **Trending Games**: Menampilkan game Roblox yang sedang trending
- 👥 **Top Playing Now**: Menampilkan game dengan pemain terbanyak saat ini
- ⚡ **Real-time Updates**: Data diperbarui secara otomatis setiap 30 detik
- 📊 **Statistik Lengkap**: Jumlah pemain aktif, rating, dan informasi creator
- 📱 **Responsive Design**: Tampilan optimal di semua perangkat
- 🎨 **UI Modern**: Desain yang menarik dan mudah digunakan

## 🚀 Cara Menggunakan

### Instalasi

1. Clone repository ini:
```bash
git clone https://github.com/DaffaAgradhyasto/leaderboard-roblox-realtime.git
cd leaderboard-roblox-realtime
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan server:
```bash
npm start
```

4. Buka browser dan akses:
```
http://localhost:3000
```

## 🛠️ Teknologi yang Digunakan

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **API**: Roblox Games API
- **Styling**: Custom CSS dengan gradien modern

## 📋 API Endpoints

- `GET /api/trending` - Mendapatkan daftar game trending
- `GET /api/top-playing` - Mendapatkan daftar game dengan pemain terbanyak
- `GET /api/game/:id` - Mendapatkan detail game tertentu

## 🌐 Demo

Aplikasi ini menampilkan data yang mirip dengan:
- https://www.roblox.com/id/charts?device=high_end_phone&country=all
- https://www.roblox.com/id/charts/top-playing-now

## 📝 Catatan

- Data di-cache selama 30 detik untuk mengurangi beban pada Roblox API
- Auto-refresh dapat diaktifkan/dinonaktifkan sesuai kebutuhan
- Klik pada game card untuk membuka halaman game di Roblox

## 📄 Lisensi

ISC

## 👤 Author

DaffaAgradhyasto
