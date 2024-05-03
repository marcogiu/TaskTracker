import express from 'express';
import { register, login } from '../controllers/authController';
import { registerValidation, loginValidation } from '../middleware/authMiddleware';
import { authLimiter } from '../middleware/rateLimitMiddleware';

const router = express.Router();

// Apply rate limiting to all Auth routes
router.use(authLimiter);

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
// router.post('/register', registerUser);
// router.post('/auth', authUser);
// router.get('/profile', protect, getUserProfile);
// router.patch('/profile', protect, updateUserProfile);
// router.delete('/profile', protect, deleteUser);
// router.post('/profile/favorites/:kittyId', protect, changeFavorites);


export default router;
