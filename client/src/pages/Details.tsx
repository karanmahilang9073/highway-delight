import  { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
// import { AxiosError } from 'axios';
// --- OPTIMIZATION: Import from new central files ---
import api from '../api';
import type { Experience, Slot } from '../types';

// This type is only used here, so it's fine to keep it
interface GroupedSlots {
  [date: string]: Slot[];
}

const Details = () => {
  const { id } = useParams();
  
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchExperience = async () => {
      setLoading(true);
      setError(false);
      try {
        // --- OPTIMIZATION: Use 'api' instance ---
        const response = await api.get(`/experiences/${id}`);
        setExperience(response.data);
      } catch (err: unknown) {
        console.error('Error fetching experience:', err);
        setError(true);
      }
      setLoading(false);
    };
    fetchExperience();
  }, [id]);

  // Reset quantity when slot changes
  useEffect(() => {
    setQuantity(1);
  }, [selectedSlot]);

  const groupedSlots = useMemo(() => {
    if (!experience) return {};
    return experience.availableSlots.reduce((acc, slot) => {
      const { date } = slot;
      if (!acc[date]) acc[date] = [];
      acc[date].push(slot);
      return acc;
    }, {} as GroupedSlots);
  }, [experience]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8 text-center">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="container mx-auto px-6 py-8 text-center">
        <h1 className="text-3xl font-bold">Experience not found</h1>
        <Link to="/" className="text-yellow-500 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const subtotal = experience.price * quantity;
  const taxes = 50; 
  const total = subtotal + taxes;

  const handleIncreaseQuantity = () => {
    if (!selectedSlot) {
      setQuantity(q => q + 1);
      return;
    }
    const remaining = selectedSlot.totalCapacity - selectedSlot.bookingsCount;
    if (quantity < remaining) {
      setQuantity(q => q + 1);
    } else {
      alert(`Sorry, only ${remaining} spots are available for this slot.`);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Side: Details */}
        <div className="w-full md:w-2/3">
          <img
            src={experience.image}
            alt={`Photo of ${experience.title}`}
            className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
          />
          <h1 className="text-3xl font-bold mb-2">{experience.title}</h1>
          <p className="text-gray-600 mb-6">{experience.description}</p>
          
          {Object.keys(groupedSlots).length > 0 ? (
            Object.entries(groupedSlots).map(([date, slots]) => (
              <div key={date} className="mb-6">
                <h2 className="text-xl font-semibold mb-3">
                  Choose slot for: {new Date(date + 'T00:00:00').toLocaleDateString(undefined, { timeZone: 'UTC', weekday: 'long', month: 'short', day: 'numeric' })}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {slots.map((slot) => {
                    const isSoldOut = slot.bookingsCount >= slot.totalCapacity;
                    const remaining = slot.totalCapacity - slot.bookingsCount;
                    const isSelected = selectedSlot?._id === slot._id;
                    
                    return (
                      <button
                        key={slot._id}
                        onClick={() => setSelectedSlot(slot)}
                        disabled={isSoldOut}
                        className={`
                          py-2 px-4 rounded transition-colors
                          ${isSelected ? 'bg-yellow-400 text-black font-bold ring-2 ring-yellow-500' : 'bg-gray-200 text-gray-700'}
                          ${isSoldOut ? 'opacity-50 cursor-not-allowed bg-red-100 text-red-500' : 'hover:bg-gray-300'}
                        `}
                      >
                        {slot.time}
                        {isSoldOut ? ' (Sold Out)' : ` (${remaining} left)`}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No available slots for this experience.</p>
          )}

          {/* About Section */}
          <div>
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <p className="text-gray-600 bg-gray-100 p-4 rounded-lg">
              {experience.description}
            </p>
          </div>
        </div>

        {/* Right Side: Summary Box */}
        <div className="w-full md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Starts at</span>
              <span className="font-bold text-lg">₹{experience.price}</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Quantity</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                  className="bg-gray-200 px-2 rounded"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button 
                  onClick={handleIncreaseQuantity} 
                  className="bg-gray-200 px-2 rounded"
                >
                  +
                </button>
              </div>
            </div>
            
            <hr className="my-4" />
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">₹{subtotal}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Taxes</span>
              <span className="font-semibold">₹{taxes}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg">₹{total}</span>
            </div>
            
            <Link 
              to="/checkout"
              state={{
                experience,
                selectedSlot,
                quantity,
                subtotal,
                taxes,
                total
              }}
              className={`
                w-full bg-yellow-400 text-black font-bold py-3 px-4 rounded text-center block
                ${!selectedSlot ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'}
              `}
              onClick={(e) => {
                if (!selectedSlot) {
                  e.preventDefault();
                  alert('Please select a date and time.');
                  return;
                }
                const remaining = selectedSlot.totalCapacity - selectedSlot.bookingsCount;
                if (quantity > remaining) {
                  e.preventDefault();
                  alert(`You are trying to book ${quantity} spots, but only ${remaining} are left for this slot.`);
                }
              }}
            >
              Confirm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;