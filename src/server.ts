import { sequelize } from './config/database';
import User from './models/Users';
import app from './app';

const PORT = process.env.PORT;

// Sinkronisasi database dan jalankan server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Koneksi ke database berhasil.');

    // Sinkronisasi model
    await sequelize.sync({ force: false }); // Gunakan `force: true` jika ingin mereset tabel setiap kali server dijalankan
    console.log('Model disinkronkan.');

    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Gagal terhubung ke database:', err);
  }
})();
