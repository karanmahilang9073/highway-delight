import express from 'express';
import { createBooking } from '../controllers/bookingController.js';

const booking = express.Router();

booking.post('/', createBooking);

export default booking;