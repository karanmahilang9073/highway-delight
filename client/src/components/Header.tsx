import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div>
      <header className="border-b border-gray-400 p-4 md:p-6">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">📍</span>
          <span className="font-bold text-xl text-gray-800">Highway Delite</span>
        </Link>
        
        <div className="flex items-center w-full max-w-sm">
          <input
            type="text"
            placeholder="Search experiences"
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-r-md font-semibold hover:bg-yellow-500 flex items-center gap-2">
            <Search size={18} />
            <span>Search</span>
          </button>
        </div>
      </div>
    </header>
    </div>
  )
}

export default Header
