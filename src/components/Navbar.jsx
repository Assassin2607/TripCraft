import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Briefcase, CalendarDays, Wallet } from 'lucide-react';
import { useTrip } from '../context/TripContext';

const Navbar = () => {
  const { selectedTrips, grandTotal } = useTrip();

  return (
    <header className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="brand-logo">
          <span className="logo-icon">✈️</span>
          <span>Trip<strong>Craft</strong></span>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <Compass size={18} />
            <span>Explore</span>
          </NavLink>
          <NavLink to="/my-trips" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <Briefcase size={18} />
            <span>My Trips ({selectedTrips.length})</span>
          </NavLink>
          <NavLink to="/itinerary" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <CalendarDays size={18} />
            <span>Itinerary</span>
          </NavLink>
          <NavLink to="/budget" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <Wallet size={18} />
            <span>Budget (₹{grandTotal.toLocaleString()})</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;