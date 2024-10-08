
import { Schema, model } from 'mongoose';

const itemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String,  required: true },
  description: { type: String },
  quantity: { type: String, required: true },
  stock: { type: Number, required: true },
  imageUrls: [{ type: String }],
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  shopId: { type: Schema.Types.ObjectId, ref: 'shopModels' },

  // New fields
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // To store who created the product
  creatorRole: { type: String, enum: ['admin', 'shopOwner'], required: true },  // To distinguish admin or shopOwner
  shop: { type: Schema.Types.ObjectId, ref: 'Shop', default: null }  // Only set if created by shopOwner
});

export default model('itemModels', itemSchema);

