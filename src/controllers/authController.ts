import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/Users';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: 'Email atau password salah' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.pass);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Email atau password salah' });
      return;
    }

    const token = jwt.sign(
      { userid: user.userid, roleid: user.roleid },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login berhasil',
      token,
      user: {
        fullName: user.fullname,
        roleID: user.roleid,
      },
    });
  } catch (error) {
    console.error('Error saat login:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};
