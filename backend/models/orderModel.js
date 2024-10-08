import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    
  },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product',  },
      name: { type: String,  },
      quantity: { type: Number,  },
      price: { type: Number,  },
    },
  ],
  shippingAddress: {
    address: { type: String,  },
    city: { type: String,  },
  },
  totalAmount: {
    type: Number,
    
  },
  shippingCost: {
    type: Number,
   
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending',
  },
  orderedAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
