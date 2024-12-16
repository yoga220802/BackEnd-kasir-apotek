"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT;
// Sinkronisasi database dan jalankan server
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.sequelize.authenticate();
        console.log('Koneksi ke database berhasil.');
        // Sinkronisasi model
        yield database_1.sequelize.sync({ force: false }); // Gunakan `force: true` jika ingin mereset tabel setiap kali server dijalankan
        console.log('Model disinkronkan.');
        app_1.default.listen(PORT, () => {
            console.log(`Server berjalan di http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error('Gagal terhubung ke database:', err);
    }
}))();
