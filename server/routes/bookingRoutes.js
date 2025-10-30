import express from 'express';
import { createBooking } from '../controllers/bookingController.js';

const booking = express.Router();

// This will handle POST requests to /bookings
booking.post('/', createBooking);

export default booking;