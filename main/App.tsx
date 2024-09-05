

import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Propertie from './pages/Propertie'
import About from './pages/About'
import Contact from './pages/Contact'
import Details from './pages/Details'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navebar'
import Footer from './pages/Footer'
import React from 'react'


function App() {


  return (
    <div className="px-4 sm:px-[5vm] md:px-[7vm] lg:px-[9vm]">
     <Navbar/>
      <Routes>
        {/* Suggested code may be subject to a license. Learn more: ~LicenseLog:918669726. */}
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />  
        <Route path="/properties" element={<Propertie/>} />
        <Route path="/details" element={<Details/>} />
        <Route path="*" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />


      </Routes>
      <Footer/>
    </div>
  )
}

export default App
