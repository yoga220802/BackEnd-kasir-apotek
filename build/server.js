"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT;
// Sinkronisasi database dan jalankan server
(async () => {
    try {
        await database_1.sequelize.authenticate();
        console.log('Koneksi ke database berhasil.');
        // Sinkronisasi model
        await database_1.sequelize.sync({ force: false }); // Gunakan `force: true` jika ingin mereset tabel setiap kali server dijalankan
        console.log('Model disinkronkan.');
        app_1.default.listen(PORT, () => {
            console.log(`Server berjalan di http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error('Gagal terhubung ke database:', err);
    }
})();
