"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = __importDefault(require("pg"));
dotenv_1.default.config();
// Decode sertifikat Base64 dari ENV dan simpan sementara
const caPemBase64 = process.env.CA_PEM;
let caPemDecoded;
if (!caPemBase64) {
    console.error('Environment variable CA_PEM is not set. SSL connection may fail.');
}
else {
    try {
        caPemDecoded = Buffer.from(caPemBase64, 'base64').toString('utf-8');
        // const certPath = path.resolve('./certs', 'ca.pem');
        // if (!fs.existsSync(path.dirname(certPath))) {
        //   fs.mkdirSync(path.dirname(certPath), { recursive: true });
        // }
        // fs.writeFileSync(certPath, caPemDecoded, 'utf-8');
        // console.log('Sertifikat berhasil didekode dan disimpan sementara.');
        // process.on('exit', () => {
        //   if (fs.existsSync(certPath)) {
        //     fs.unlinkSync(certPath);
        //     console.log('Sertifikat sementara dihapus.');
        //   }
        // });
    }
    catch (err) {
        console.error('Failed to decode and save SSL certificate:', err);
    }
}
exports.sequelize = new sequelize_1.Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    dialectModule: pg_1.default,
    dialectOptions: {
        ssl: {
            require: true,
            ca: caPemDecoded,
        },
    },
});
// export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });
exports.default = exports.sequelize;
