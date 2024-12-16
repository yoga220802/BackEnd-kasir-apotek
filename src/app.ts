import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'API berhasil dibuat cuyy' });
  });

export default app;
