import { Schema, model } from 'mongoose';

// Define the product details within the order
const productSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Define the main Order schema
const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop',
    required: true,
  },
  products: [productSchema],  // Array of products in the order
  totalAmount: {
    type: Number,
    required: true,
  },
  deliveryAddress: {
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  orderedAt: {
    type: Date,
    default: Date.now,
  },
  deliveredAt: {
    type: Date,
  },
}, { timestamps: true });

export default model('Order', orderSchema);
