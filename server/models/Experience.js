import mongoose from 'mongoose';
import { slotSchema } from './Slot.js'; 

const experienceSchema = new mongoose.Schema({
  id: { 
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availableSlots: [slotSchema], 
}, {
  timestamps: true,
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;