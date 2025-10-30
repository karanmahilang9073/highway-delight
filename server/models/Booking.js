import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  // This is the link to our new User model
  user: {
    type: mongoose.Schema.Types.ObjectId, // This is the special ID type
    ref: 'User', // This tells Mongoose to link to the 'User' model
    required: true
  },
  
  // We still store this from our mock data
  experienceId: { 
    type: Number, 
    required: true 
  },

  // This will store the slot's _id, e.g., "69037458c52c8ed1347dd820"
  slotId: { type: mongoose.Schema.Types.ObjectId, required: true },
  
  // Booking details
  date: { type: String, required: true },
  time: { type: String, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  
  // This is the "confirmation data"
  bookingRef: { 
    type: String, 
    required: true, 
    unique: true 
  },
}, { 
  // Timestamps are great for bookings, too
  timestamps: true 
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;