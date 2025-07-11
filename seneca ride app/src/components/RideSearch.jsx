import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RideSearch = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
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
    
    if (!searchParams.from || !searchParams.to || !searchParams.date) {
      setError('Please fill in all fields');
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
            <label htmlFor="from">From:</label>
            <input
              id="from"
              name="from"
              type="text"
              placeholder="e.g., Toronto, Scarborough, Markham"
              value={searchParams.from}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="to">To:</label>
            <input
              id="to"
              name="to"
              type="text"
              placeholder="e.g., Seneca Newnham, Seneca King"
              value={searchParams.to}
              onChange={handleChange}
              required
            />
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
                  from: 'Toronto',
                  to: 'Seneca Newnham',
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
                  from: 'Scarborough',
                  to: 'Seneca Newnham',
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
