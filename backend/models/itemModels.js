import { Schema, model } from 'mongoose';

const itemSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String,  required: true },
  imageUrls:[{type: String}],
  price: { type: Number, required: true },
  description: { type: String,  },
  quantity: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  stock:{type:Number}
});

export default model('itemModels', itemSchema);
