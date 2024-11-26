import express from 'express';
import {ShopRegister,getShopById,getShopByUserId,getShops} from '../controllers/shopController.js';
import { upload } from '../middleware/multer.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// User-related routes
router.post('/ShopRegister',protect,upload.array("images", 2), ShopRegister);
router.get('/getAllShops',getShops);
router.get('/:shopId', getShopById);
router.get('/shop/:userId', getShopByUserId);

// router.put("/deactivateShop/:id", deactivateShop);

// Activate a shop
// router.put("/activateShop/:id", activateShop);
export default router;