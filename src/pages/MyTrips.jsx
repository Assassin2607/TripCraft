import React from 'react';
import { Link } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { Trash2, MapPin, ArrowRight } from 'lucide-react';

const MyTrips = () => {
  const { selectedTrips, removeDestination, grandTotal } = useTrip();

  if (selectedTrips.length === 0) {
    return (
      <div className="page-container empty-state">
        <h2>Your Trip is Empty</h2>
        <p>Start by selecting exciting destinations from the Explore tab.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
          Explore Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2>My Planned Destinations ({selectedTrips.length})</h2>
          <p>Organize and review your selected destinations.</p>
        </div>
        <Link to="/itinerary" className="btn btn-primary">
          View Full Itinerary <ArrowRight size={16} />
        </Link>
      </div>

      <div className="trip-list-grid">
        {selectedTrips.map((trip) => (
          <div key={trip.id} className="trip-summary-card">
            <img src={trip.image} alt={trip.name} className="trip-thumb" />
            <div className="trip-info">
              <h3>
                {trip.name}, <span>{trip.country}</span>
              </h3>
              <p className="trip-meta">
                <MapPin size={14} /> Category: {trip.category} | Activities: {trip.activities.length}
              </p>
              <p className="trip-cost-tag">Base Cost: ₹{trip.baseCost.toLocaleString()}</p>
            </div>
            <div className="trip-actions">
              <button
                className="btn-icon-danger"
                onClick={() => removeDestination(trip.id)}
                title="Remove destination"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="trip-bottom-bar">
        <span>Combined Base & Activities Total: <strong>₹{grandTotal.toLocaleString()}</strong></span>
        <Link to="/budget" className="btn btn-secondary">
          Go to Budget Overview
        </Link>
      </div>
    </div>
  );
};

export default MyTrips;