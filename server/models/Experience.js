import mongoose from 'mongoose';
import { slotSchema } from './Slot.js'; // 1. Import the slot schema

// This is the main schema for the Experience
const experienceSchema = new mongoose.Schema({
  id: { // We keep this for simplicity linking to old mock data
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
  // 2. We embed the slots schema here
  availableSlots: [slotSchema], 
}, {
  timestamps: true,
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;