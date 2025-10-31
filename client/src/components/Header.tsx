import React from 'react'; // Make sure to import React
import { Link } from 'react-router-dom';
// I'll use the 'lucide-react' icons you had, add MapPin
import { Search, MapPin } from 'lucide-react'; 

// 1. --- THIS IS THE FIX ---
// We must define the props that App.tsx is sending us.
interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
}

// 2. --- THIS IS THE FIX ---
// We add the props to the component's arguments.
const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm, onSearch }) => {
  return (
    // Replaced the border with a more modern shadow
    <header className="bg-white p-4 md:p-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          {/* Replaced the emoji with a matching icon */}
          <MapPin className="text-pink-600" size={28} />
          <span className="font-bold text-xl text-gray-800">Highway Delite</span>
        </Link>
        
        <div className="flex items-center w-full max-w-sm">
          <input
            type="text"
            placeholder="Search experiences"
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            // 3. --- THIS IS THE FIX ---
            // Connect the input to the props
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-r-md font-semibold hover:bg-yellow-500 flex items-center gap-2"
            // 4. --- THIS IS THE FIX ---
            // Connect the button to the prop
            onClick={onSearch}
          >
            <Search size={18} />
            <span>Search</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header;