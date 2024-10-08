import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';        
import Login from './pages/Login';       
import Register from './pages/Register';
import logo from './logo.svg';
import './App.css';
import HotelDetails from './pages/HotelDetails';
import AddHotel from './pages/AddHotel'; 

function App() {
  return (
      <div className="App">
           <Router>
              <Routes>
                 <Route path="/" element={<Home />} />
                 <Route path="/login" element={<Login />} />
                 <Route path="/register" element={<Register />} />
                 <Route path="/hotel/:id" element={<HotelDetails />} /> 
                 <Route path="/add-hotel" element={<AddHotel />} />
              </Routes>
           </Router>
      </div>
  );
}

export default App;
