import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Experience from '../models/Experience.js'; // 1. Import the Experience model
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
    // 1. Get all the data from the frontend
    const {
      experienceId,
      slotId, // <-- We now get the slotId
      fullName,
      email,
      phone,
      date,
      time,
      quantity,
      total,
    } = req.body;

    // 2. Find or create the user
    const user = await findOrCreateUser(email, fullName, phone);

    // --- CHECK 1: Has this user (email) already booked this slot? ---
    // This is the "message for same email" you asked for
    const existingBooking = await Booking.findOne({ user: user._id, slotId: slotId });
    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'You (this email) have already booked this time slot.',
      });
    }

    // --- CHECK 2: Is this slot full? (Prevent double-booking) ---
    // Find the experience that contains the slot we want to book
    const experience = await Experience.findOne({ "availableSlots._id": slotId });
    
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Slot not found.' });
    }
    
    // Find the specific slot within that experience
    const slot = experience.availableSlots.id(slotId);

    if (!slot) {
      return res.status(404).json({ success: false, message: 'Slot not found.' });
    }

    // Check if the quantity they want exceeds the remaining capacity
    if (slot.bookingsCount + quantity > slot.totalCapacity) {
      const remainingSpots = slot.totalCapacity - slot.bookingsCount;
      return res.status(400).json({
        success: false,
        message: `Not enough spots available. Only ${remainingSpots} spots left.`,
      });
    }

    // --- All checks passed! We can create the booking. ---

    // 3. Generate a unique booking reference
    const bookingRef = generateBookingRef();

    // 4. Create the new booking
    const newBooking = new Booking({
      user: user._id,
      experienceId,
      slotId: slotId, // <-- Save the slotId
      date,
      time,
      quantity,
      total,
      bookingRef,
    });

    // 5. Save the booking
    await newBooking.save();

    // 6. CRITICAL: Update the bookingsCount for the slot
    slot.bookingsCount += quantity;
    await experience.save(); // Save the change to the experience document

    // 7. Send a success response
    res.status(201).json({
      success: true,
      message: 'Booking successful!',
      booking: newBooking,
    });

  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking. Please try again.',
    });
  }
};