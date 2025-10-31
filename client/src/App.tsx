// 1. Import useState
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Checkout from './pages/Checkout';
import Result from './pages/Result';
import Header from './components/Header';

function App() {
  // 2. State for the text in the search bar
  const [searchTerm, setSearchTerm] = useState('');
  
  // 3. State for the term we actually search for
  // This is set when the user clicks "Search"
  const [activeSearchTerm, setActiveSearchTerm] = useState('');

  // This function is called when the "Search" button is clicked
  const handleSearch = () => {
    setActiveSearchTerm(searchTerm);
  };
  
  return (
    <div>
      {/* 4. Pass props to Header */}
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        onSearch={handleSearch} 
      />
      
      <Routes>
        {/* 5. THIS IS THE FIX: Pass the active (final) search term to Home */}
        <Route path="/" element={<Home searchTerm={activeSearchTerm} />} />
        
        {/* These routes don't need the search term */}
        <Route path="/details/:id" element={<Details />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  )
}

export default App;