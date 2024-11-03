import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true  // Ensure that user is always provided
  },
  userName: {
    type: String,
    required: true  // Ensure that username is provided
  },
  orderItems: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true  // Ensure that product is always provided
      },
      shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: true  // Ensure that shop is always provided
      },
      name: { 
        type: String, 
        required: true  // Ensure that product name is provided
      },
      quantity: { 
        type: Number, 
        required: true  // Ensure that quantity is provided
      },
      price: { 
        type: Number, 
        required: true  // Ensure that price is provided
      }
    }
  ],
  shippingAddress: {
    address: { 
      type: String, 
      required: true  // Ensure that address is provided
    },
    city: { 
      type: String, 
      required: true  // Ensure that city is provided
    }
  },
  totalAmount: { 
    type: Number, 
    required: true  // Ensure that total amount is provided
  },
  shippingCost: { 
    type: Number, 
    required: true  // Ensure that shipping cost is provided
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
    required: true  // Ensure that payment status is always set
  },
  paymentId: {
    type: String,
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending',
    required: true  // Ensure that order status is always set
  },
  orderedAt: {
    type: Date,
    default: Date.now,
    required: true  // Ensure that the order date is always set
  },
  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    // To store who created the order
  },
  creatorRole: { 
    type: String, 
    enum: ['admin', 'shopOwner'], 
    // To distinguish between admin or shopOwner
  }
});

// Set strictPopulate to false for this schema
orderSchema.set('strictPopulate', false);

export default model('Order', orderSchema);
