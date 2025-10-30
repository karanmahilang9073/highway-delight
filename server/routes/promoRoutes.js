import express from 'express';
import { validatePromoCode } from '../controllers/promoController.js';

const promo = express.Router();

// This will handle POST requests to /promo/validate
promo.post('/validate', validatePromoCode);

export default promo;