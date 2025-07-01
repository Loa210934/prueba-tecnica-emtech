import express, { Request, Response } from 'express';
import authRouter from './auth.router';
import courseRouter from './courses.router';

const router = express.Router();

// Register all routes
router.use('/auth', authRouter);
router.use('/course', courseRouter);

// API Health Check
router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
  });
});

router.use('/{*any}', (_req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

export default router;
