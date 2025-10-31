import express from 'express';
import { validatePromoCode } from '../controllers/promoController.js';

const promo = express.Router();

promo.post('/validate', validatePromoCode);

export default promo;