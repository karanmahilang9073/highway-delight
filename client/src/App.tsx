import React from 'react'
import Header from './components/Header'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import Checkout from './pages/Checkout'
import Result from './pages/Result'

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/details/:id' element={<Details/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/result' element={<Result/>} />

      </Routes>
      
    </div>
  )
}

export default App
