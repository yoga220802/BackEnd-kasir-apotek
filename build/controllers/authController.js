"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = __importDefault(require("../models/Users"));
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users_1.default.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({ message: 'Email atau password salah' });
            return;
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.pass);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Email atau password salah' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userid: user.userid, roleid: user.roleid }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            message: 'Login berhasil',
            token,
            user: {
                fullName: user.fullname,
                roleID: user.roleid,
            },
        });
    }
    catch (error) {
        console.error('Error saat login:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};
exports.login = login;
