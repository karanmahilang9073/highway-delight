// 1. Import useState
import  { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Checkout from './pages/Checkout';
import Result from './pages/Result';
import Header from './components/Header';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [activeSearchTerm, setActiveSearchTerm] = useState('');

  const handleSearch = () => {
    setActiveSearchTerm(searchTerm);
  };
  
  return (
    <div>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
      
      <Routes>
        <Route path="/" element={<Home searchTerm={activeSearchTerm} />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  )
}

export default App;