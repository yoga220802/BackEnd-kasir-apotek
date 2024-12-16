import express, { Request, Response } from 'express';
import { login } from '../controllers/authController';

const router = express.Router();

// Endpoint Login
router.post('/login', (req: Request, res: Response) => login(req, res));

export default router;
