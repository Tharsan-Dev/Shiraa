import { Schema, model } from 'mongoose';

const shopSchema = new Schema({
  name: { type: String, required: true },
  imageUrls:[{type: String}],
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  role: {
    type: String,
    required: false,
    default:"shopOwner"
  },
  description: { type: String,  },
 
 
});

export default model('shopModel', shopSchema);
