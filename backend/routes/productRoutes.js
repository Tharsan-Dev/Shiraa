import express from 'express';
import { getItems, getItemById, createItem, updateItem, deleteItem } from '../controllers/productController.js'; // Assuming you have these controllers
import { protect,checkRole} from '../middleware/authMiddleware.js';
const router = express.Router();


// Item-related routes with role-based access control
router.get('/view', getItems); // Pass the role to check in checkRole
router.get('/view/:id', getItemById);
router.post('/create', protect,checkRole(['admin','shops']), createItem);
router.put('/update/:id', protect,checkRole(['admin','shops']), updateItem);
router.delete('/delete/:id', protect,checkRole(['admin','shops']), deleteItem);



export default router;