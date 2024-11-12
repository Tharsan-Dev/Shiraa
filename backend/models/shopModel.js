import { Schema, model } from 'mongoose';

const shopSchema = new Schema({
  name: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  category: { type: String, required: true },  // E.g., 'clothing', 'electronics'
  description: { type: String },
  imageUrls: [{ type: String }],  // Array of URLs for multiple images
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role: {
    type: String,
    default: 'shopOwner',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

export default model('Shop', shopSchema);
