import React, { useState, useMemo } from 'react';
import { initialDestinations } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import { useTrip } from '../context/TripContext';
import { Search, Filter } from 'lucide-react';

const CATEGORIES = ['All', 'Beaches', 'Mountains', 'Cities', 'Adventure', 'Historical'];

const Explore = () => {
  const { selectedTrips, addDestination } = useTrip();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const filteredDestinations = useMemo(() => {
    return initialDestinations
      .filter((dest) => {
        const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
        const matchesSearch =
          dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.country.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.baseCost - b.baseCost;
        if (sortBy === 'price-high') return b.baseCost - a.baseCost;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="page-container">
      <div className="hero-section">
        <h1>Explore Dream Destinations</h1>
        <p>Plan your trip, discover new places, and create unforgettable memories.</p>

        <div className="search-bar-wrap">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search destinations by name or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="controls-row">
        <div className="category-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="sort-dropdown">
          <Filter size={16} />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-low">Cost: Low to High</option>
            <option value="price-high">Cost: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="cards-grid">
        {filteredDestinations.map((dest) => {
          const isAdded = selectedTrips.some((t) => t.id === dest.id);
          return (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onAdd={addDestination}
              isAdded={isAdded}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Explore;