import { Router } from 'express';
import { register, login, home } from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/home', authenticateToken, home);
export default router;
