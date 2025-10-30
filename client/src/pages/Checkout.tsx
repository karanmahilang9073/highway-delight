import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
// --- OPTIMIZATION: Import from new central files ---
import api from '../api';
import type { Promo, CheckoutLocationState } from '../types'; // Slot/Experience are in CheckoutLocationState

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // --- OPTIMIZATION: Apply the new type to location.state ---
  const {
    experience,
    selectedSlot,
    quantity,
    subtotal,
    taxes
  } = (location.state as CheckoutLocationState) || {
    experience: null,
    selectedSlot: null, 
    quantity: 0,
    subtotal: 0,
    taxes: 0,
  };

  // --- Form State ---
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agree, setAgree] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  // --- Promo Code State ---
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState<Promo | null>(null);

  // --- Calculate Final Total ---
  const finalTotal = subtotal + taxes - discountAmount;

  // --- Handle Promo Code Apply ---
  const handleApplyPromo = async (e: React.MouseEvent) => {
    e.preventDefault();
    setPromoError('');
    setDiscountAmount(0);
    setAppliedPromo(null);

    if (!promoCode) {
      setPromoError('Please enter a code.');
      return;
    }
    try {
      // --- OPTIMIZATION: Use 'api' instance ---
      const response = await api.post('/promo/validate', { 
        code: promoCode 
      });
      
      const { discountType, discountValue } = response.data;
      let calculatedDiscount = (discountType === 'percentage') ? (subtotal * discountValue) / 100 : discountValue;
      calculatedDiscount = Math.min(calculatedDiscount, subtotal + taxes);
      
      setDiscountAmount(calculatedDiscount);
      setAppliedPromo(response.data);
      setPromoError('');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setPromoError(error.response?.data?.message || 'Error validating code');
      } else {
        setPromoError('An unknown error occurred.');
      }
      setDiscountAmount(0);
      setAppliedPromo(null);
    }
  };

  // --- Handle Final Booking Submission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert('You must agree to the terms and safety policy.');
      return;
    }
    setIsBooking(true);

    const bookingDetails = {
      experienceId: experience.id,
      slotId: selectedSlot._id, 
      fullName,
      email,
      phone,
      date: selectedSlot.date,
      time: selectedSlot.time,
      quantity,
      total: finalTotal,
      appliedPromoCode: appliedPromo?.code,
    };

    try {
      // --- OPTIMIZATION: Use 'api' instance ---
      const response = await api.post('/bookings', bookingDetails);
      
      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
      }

      const { bookingRef } = response.data.booking;
      navigate('/result', { 
        state: { success: true, name: fullName, refId: bookingRef } 
      });
    } catch (error: unknown) {
      console.error('Error creating booking:', error);
      let message = 'Booking failed. Please try again.';
      if (error instanceof AxiosError) {
        message = error.response?.data?.message || 'Booking failed. Please try again.';
      }
      navigate('/result', { state: { success: false, message: message } });
    } finally {
      setIsBooking(false);
    }
  };
  
  if (!experience || !selectedSlot) {
    return (
      <div className="container mx-auto px-6 py-8 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="text-gray-600 mt-2">Please select an experience and a slot first.</p>
        <Link to="/" className="text-yellow-500 hover:underline mt-4 inline-block">
          Go find an experience
        </Link>
      </div>
    )
  }

  // --- THIS IS THE FULL, CORRECT JSX ---
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Side: Checkout Form */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>
          <form onSubmit={handleSubmit} id="checkout-form" className="space-y-6">
            
            {/* Full Name & Email (in a row) */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3"
                required
              />
            </div>

            {/* --- Promo Code Section --- */}
            <div>
              <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-1">
                Promo code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="promo"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  className="w-full border border-gray-300 rounded-l-md py-2 px-3"
                  placeholder="e.g. SAVE10"
                />
                <button
                  type="button" // Important: set type to "button"
                  onClick={handleApplyPromo}
                  className="bg-gray-700 text-white font-bold py-2 px-4 rounded-r-md"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="text-red-500 text-sm mt-1">{promoError}</p>
              )}
              {appliedPromo && (
                <p className="text-green-600 text-sm mt-1">
                  Success! You saved ₹{discountAmount.toFixed(2)}
                </p>
              )}
            </div>
            
            {/* Agreement Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="h-4 w-4 text-yellow-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="agree" className="ml-2 block text-sm text-gray-900">
                I agree to the terms and safety policy.
              </label>
            </div>
          </form>
        </div>

        {/* Right Side: Summary Box */}
        <div className="w-full md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
            <h2 className="text-xl font-bold mb-4">{experience.title}</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-semibold">{selectedSlot.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time</span>
                <span className="font-semibold">{selectedSlot.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Qty</span>
                <span className="font-semibold">{quantity}</span>
              </div>
            </div>

            <hr className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes</span>
                <span className="font-semibold">₹{taxes}</span>
              </div>
              
              {discountAmount > 0 && appliedPromo && (
                <div className="flex justify-between text-green-600">
                  <span className="font-semibold">Discount ({appliedPromo.code})</span>
                  <span className="font-semibold">- ₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <hr className="my-4" />
            
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg">₹{finalTotal.toFixed(2)}</span>
            </div>
            
            <button
              type="submit"
              form="checkout-form"
              className="w-full bg-yellow-400 text-black font-bold py-3 px-4 rounded text-center block disabled:opacity-50"
              disabled={isBooking}
            >
              {isBooking ? 'Processing...' : 'Pay and Confirm'}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Checkout;