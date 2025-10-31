import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  
  experienceId: { 
    type: Number, 
    required: true 
  },
  slotId: { type: mongoose.Schema.Types.ObjectId, required: true },
  
  // Booking details
  date: { type: String, required: true },
  time: { type: String, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  
  // confirmation data
  bookingRef: { 
    type: String, 
    required: true, 
    unique: true 
  },
}, { 
  timestamps: true 
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;