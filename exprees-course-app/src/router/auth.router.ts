import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { AuthMiddleware } from '../middlewares/Auth.middleware';

const router = Router();
router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.signin);
router.route('/my-data').get([AuthMiddleware], authController.courseData);
router.route('/me').get([AuthMiddleware], authController.me);

export default router;
