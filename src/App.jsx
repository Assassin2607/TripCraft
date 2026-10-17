import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import MyTrips from './pages/MyTrips';
import Itinerary from './pages/Itinerary';
import Budget from './pages/Budget';
import './App.css';

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/budget" element={<Budget />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>TripCraft — Smart Travel Planner © 2026</p>
      </footer>
    </div>
  );
}

export default App;