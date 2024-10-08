import express from 'express';
import {ShopRegister,getShopById,getShops} from '../controllers/shopController.js';
import { upload } from '../middleware/multer.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// User-related routes
router.post('/ShopRegister',protect,upload.array("images", 2), ShopRegister);
router.get('/getAllShops',getShops);
router.get('/:shopId', getShopById);


export default router;