import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Definisikan tipe atribut tabel users
interface UserAttributes {
  userid: string;
  email: string;
  pass: string;
  fullname: string;
  userphone: string;
  roleid: string;
}

// Optional untuk atribut yang bisa diisi otomatis (jika ada)
interface UserCreationAttributes extends Optional<UserAttributes, 'userid'> {}

// Definisikan Model User
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public userid!: string;
  public email!: string;
  public pass!: string;
  public fullname!: string;
  public userphone!: string;
  public roleid!: string;
}

// Inisialisasi Model User
User.init(
  {
    userid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userphone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users', // Nama tabel di database
    timestamps: false,
  }
);

export default User;
