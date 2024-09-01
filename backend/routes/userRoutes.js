import express from 'express';
import { login, register, logOut, getUserById,getAllUsers ,updateUserProfile} from '../controllers/userController.js';
import { checkRole,protect} from '../middleware/authMiddleware.js';

const router = express.Router();

// User-related routes
router.post('/login', login);
router.post('/register', register);
router.post('/logoutuser',protect, logOut);
router.get('/profile',protect,getUserById );
router.put('/update',protect, updateUserProfile);
router.get('/allUsers',protect,checkRole(['admin']),getAllUsers );



export default router;
