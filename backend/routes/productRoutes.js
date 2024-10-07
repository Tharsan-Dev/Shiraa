import express from 'express';
import { getItems, getItemById, createItem, updateItem, deleteItem, getShopsItems } from '../controllers/productController.js'; // Assuming you have these controllers
import { protect,checkRole} from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multer.js';
const router = express.Router();


// Item-related routes with role-based access control
router.get('/view', getItems); // Pass the role to check in checkRole'
router.get('/viewShops/:id',getShopsItems)
router.get('/view/:id', getItemById);
router.post('/create', protect,checkRole(['admin','shopOwner']),upload.array("images", 2), createItem);
router.put('/update/:id', protect,checkRole(['admin','shopOwner']), updateItem);
router.delete('/delete/:id', protect,checkRole(['admin','shopOwner']), deleteItem);



export default router;