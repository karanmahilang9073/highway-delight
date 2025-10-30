// This file will hold all our shared types

export interface Slot {
  _id: string;
  date: string;
  time: string;
  totalCapacity: number;
  bookingsCount: number;
}

export interface Experience {
  _id: string; // The MongoDB ID
  id: number;  // Your original seed ID
  title: string;
  location: string;
  image: string;
  description: string;
  price: number;
  availableSlots: Slot[];
}

// For your promo code state
export interface Promo {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
}

// For the data passed from Details to Checkout
export interface CheckoutLocationState {
  experience: Experience;
  selectedSlot: Slot;
  quantity: number;
  subtotal: number;
  taxes: number;
}