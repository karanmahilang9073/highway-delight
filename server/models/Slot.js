import mongoose from 'mongoose';

export const slotSchema = new mongoose.Schema({
  date: {
    type: String, 
    required: true,
  },
  time: {
    type: String, 
    required: true,
  },
  totalCapacity: {
    type: Number,
    required: true,
    default: 10, 
  },
  bookingsCount: {
    type: Number,
    required: true,
    default: 0, 
  },
});

