import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import router from './router';
import config from './config/vars';
import ErrorHandler from './middlewares/ErrorHandling';
import mongoose from './config/mongoose';
dotenv.config();

mongoose.connect();
const app = express();

// Security and parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// API routes
app.use('/api', router);
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    ErrorHandler(err, req, res, next);
  }
);
// Start server
app.listen(config.port, () => {
  console.info(`🚀 Server started on port ${config.port} (${config.env})`);
});
