import mongoose from 'mongoose';

// This is the schema for an individual slot (e.g., "Oct 16 @ 10:00 am")
export const slotSchema = new mongoose.Schema({
  date: {
    type: String, // e.g., "2025-11-15"
    required: true,
  },
  time: {
    type: String, // e.g., "10:00 am"
    required: true,
  },
  totalCapacity: {
    type: Number,
    required: true,
    default: 10, // Default 10 spots per slot
  },
  bookingsCount: {
    type: Number,
    required: true,
    default: 0, // Starts at 0
  },
});

// We only export the schema because it will be embedded