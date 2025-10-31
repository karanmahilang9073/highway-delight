import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Experience from '../models/Experience.js'; 
import { findOrCreateUser } from './userController.js'; 

// Helper function to generate a random booking reference
const generateBookingRef = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const createBooking = async (req, res) => {
  try {
    const {
      experienceId,
      slotId, 
      fullName,
      email,
      phone,
      date,
      time,
      quantity,
      total,
    } = req.body;

    const user = await findOrCreateUser(email, fullName, phone);

    //check already booked
    const existingBooking = await Booking.findOne({ user: user._id, slotId: slotId });
    if (existingBooking) {
      return res.status(400).json({success: false, message: 'You (this email) have already booked this time slot.',});
    }

    //chech slots
    const experience = await Experience.findOne({ "availableSlots._id": slotId });
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Slot not found.' });
    }
    
    // Find  specific slot within experience
    const slot = experience.availableSlots.id(slotId);
    if (!slot) {
      return res.status(404).json({ success: false, message: 'Slot not found.' });
    }

    // Check if the quantity they want exceeds the remaining capacity
    if (slot.bookingsCount + quantity > slot.totalCapacity) {
      const remainingSpots = slot.totalCapacity - slot.bookingsCount;
      return res.status(400).json({success: false, message: `Not enough spots available. Only ${remainingSpots} spots left.`,
      });
    }

    const bookingRef = generateBookingRef();
    const newBooking = new Booking({
      user: user._id,
      experienceId,
      slotId: slotId, 
      date,
      time,
      quantity,
      total,
      bookingRef,
    });

    await newBooking.save();

    slot.bookingsCount += quantity;
    await experience.save(); 

    res.status(201).json({success: true,message: 'Booking successful!',booking: newBooking,});

  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({success: false,message: 'Failed to create booking. Please try again.',});
  }
};