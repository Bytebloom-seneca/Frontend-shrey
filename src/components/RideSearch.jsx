import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RideSearch = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    fromCampus: 'Seneca Newnham',
    toCampus: 'Seneca Newnham',
    date: '',
    time: '',
    minPrice: '',
    maxPrice: '',
    fromAddress: '',
  });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setSearchParams((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(''); // Clear error when user types
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchParams.fromCampus || !searchParams.toCampus || !searchParams.date) {
      setError('Please fill in all required fields');
      return;
    }

    onSearch(searchParams);
    history.push('/rides'); // Navigate to rides list
  };

  return (
    <div className="ride-search-container">
      <div className="search-form">
        <h2>Find Your Perfect Ride</h2>
        <p>Search for available rides to Seneca College</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label htmlFor="fromCampus">From Campus:</label>
            <select
              id="fromCampus"
              name="fromCampus"
              value={searchParams.fromCampus}
              onChange={handleChange}
              required
            >
              <option value="Anywhere">Anywhere</option>
              <option value="Seneca Newnham">Seneca Newnham</option>
              <option value="Seneca King">Seneca King</option>
            </select>
          </div>
          {searchParams.fromCampus === 'Anywhere' && (
            <div className="form-group">
              <label htmlFor="fromAddress">Starting Address:</label>
              <input
                id="fromAddress"
                name="fromAddress"
                type="text"
                placeholder="Enter your starting address (e.g., 144 Amberjack Scarborough)"
                value={searchParams.fromAddress}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="toCampus">To Campus:</label>
            <select
              id="toCampus"
              name="toCampus"
              value={searchParams.toCampus}
              onChange={handleChange}
              required
            >
              <option value="Anywhere">Anywhere</option>
              <option value="Seneca Newnham">Seneca Newnham</option>
              <option value="Seneca King">Seneca King</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              id="date"
              name="date"
              type="date"
              value={searchParams.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time (optional):</label>
            <input
              id="time"
              name="time"
              type="time"
              value={searchParams.time}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Price Range (optional):</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                value={searchParams.minPrice}
                onChange={handleChange}
                min="0"
                style={{ width: 70 }}
              />
              <span>-</span>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                value={searchParams.maxPrice}
                onChange={handleChange}
                min="0"
                style={{ width: 70 }}
              />
            </div>
          </div>

          <button type="submit" className="search-button">
            🔍 Search Rides
          </button>
        </form>

        <div className="quick-actions">
          <h4>Quick Search</h4>
          <div className="quick-buttons">
            <button 
              onClick={() => {
                setSearchParams({
                  fromCampus: 'Toronto',
                  toCampus: 'Seneca Newnham',
                  date: new Date().toISOString().split('T')[0]
                });
              }}
              className="quick-btn"
            >
              Toronto → Seneca
            </button>
            <button 
              onClick={() => {
                setSearchParams({
                  fromCampus: 'Scarborough',
                  toCampus: 'Seneca Newnham',
                  date: new Date().toISOString().split('T')[0]
                });
              }}
              className="quick-btn"
            >
              Scarborough → Seneca
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideSearch;
