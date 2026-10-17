import React from 'react';
import PropTypes from 'prop-types';
import { PlusCircle, CheckCircle, Star } from 'lucide-react';
import WeatherWidget from './WeatherWidget';

const DestinationCard = ({ destination, onAdd, isAdded }) => {
  return (
    <div className="card destination-card">
      <div className="card-image-wrap">
        <img src={destination.image} alt={destination.name} className="card-image" />
        <span className="card-category-badge">{destination.category}</span>
        <div className="card-rating">
          <Star size={14} fill="#f59e0b" color="#f59e0b" />
          <span>{destination.rating}</span>
        </div>
      </div>

      <div className="card-body">
        <div className="card-header">
          <div>
            <h3 className="card-title">{destination.name}</h3>
            <p className="card-subtitle">{destination.country}</p>
          </div>
          <div className="card-price">
            <small>Est. Package</small>
            <span>₹{destination.baseCost.toLocaleString()}</span>
          </div>
        </div>

        <p className="card-desc">{destination.description}</p>

        {/* Third-party weather API */}
        <WeatherWidget
          lat={destination.lat}
          lng={destination.lng}
          destinationName={destination.name}
        />

        <div className="card-actions">
          <button
            className={`btn ${isAdded ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => onAdd(destination)}
            disabled={isAdded}
          >
            {isAdded ? (
              <>
                <CheckCircle size={16} /> Added
              </>
            ) : (
              <>
                <PlusCircle size={16} /> Add to Itinerary
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Prop validation requirement
DestinationCard.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    baseCost: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
  isAdded: PropTypes.bool.isRequired
};

export default DestinationCard;