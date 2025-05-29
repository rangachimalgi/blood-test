import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  type: { type: String, default: 'product' },
  imgUrl: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true }
});

const Test = mongoose.model('Test', testSchema);
export default Test;
