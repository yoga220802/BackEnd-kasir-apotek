"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
// Definisikan Model User
class User extends sequelize_1.Model {
}
// Inisialisasi Model User
User.init({
    userid: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    pass: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userphone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    roleid: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'users', // Nama tabel di database
    timestamps: false,
});
exports.default = User;
