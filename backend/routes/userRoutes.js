import express from 'express';
import { login,
    register, 
    logOut, 
    getUserById,
    getAllUsers ,
    updateUserProfile,
    updateUserRole,
    deactivateUser, 
    activateUser
        } from '../controllers/userController.js';
import { checkRole,protect} from '../middleware/authMiddleware.js';
import { getShops } from '../controllers/shopController.js';

const router = express.Router();

// User-related routes
router.post('/login', login);
router.post('/register', register);
router.post('/logoutuser',protect, logOut);
router.get('/profile',protect,getUserById );
router.put('/update',protect, updateUserProfile);
router.get('/getAllShops',protect, getShops);
router.get('/allUsers',protect,checkRole(['admin']),getAllUsers );
router.put('/updateRole/:id',protect,checkRole(['admin']),updateUserRole );
router.put('/deactivateUser/:id',protect,checkRole(['admin']),deactivateUser );
router.put('/activateUser/:id',protect,checkRole(['admin']),activateUser );


export default router;
