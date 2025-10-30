import React from 'react';
import { useLocation, Link } from 'react-router-dom';

// SVG for the green checkmark
const SuccessIcon = () => (
  <svg 
    className="h-16 w-16 text-green-500 mx-auto" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
    />
  </svg>
);

// SVG for a red failure icon
const FailureIcon = () => (
  <svg 
    className="h-16 w-16 text-red-500 mx-auto" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
    />
  </svg>
);

const Result = () => {
  const location = useLocation();

  // Get the data we passed from the Checkout page
  const { success, name, refId } = location.state || {
    success: false,
    name: 'Guest',
    refId: 'N/A'
  };

  if (!success) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <FailureIcon />
        <h1 className="text-3xl font-bold mt-4">Booking Failed</h1>
        <p className="text-gray-600 mt-2">
          Unfortunately, we couldn't process your booking. Please try again.
        </p>
        <Link
          to="/checkout"
          className="mt-8 inline-block bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded"
        >
          Try Again
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20 text-center">
      {/* Green checkmark icon */}
      <SuccessIcon />
      
      <h1 className="text-3xl font-bold mt-4">Booking Confirmed</h1>
      <p className="text-gray-600 mt-2">
        Thank you, {name}! Your booking is complete.
      </p>
      <p className="text-gray-600 mt-1">
        Reference ID: <span className="font-semibold">{refId}</span>
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="mt-8 inline-block bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Result;