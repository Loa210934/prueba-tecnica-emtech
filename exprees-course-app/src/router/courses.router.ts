import { Router } from 'express';
import controller from '../controllers/course.controller';
import { AuthMiddleware } from '../middlewares/Auth.middleware';
const router = Router();
router.route('/setup').get(controller.setupCourses);
router.route('/list').get(controller.list);
router.route('/mine').get([AuthMiddleware], controller.mine);
router.route('/:id').get([AuthMiddleware], controller.findById);
router.route('/eval').post([AuthMiddleware], controller.saveAnswers);

export default router;
