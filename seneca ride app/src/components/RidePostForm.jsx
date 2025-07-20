import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RidePostForm = ({ onPostRide }) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    seats: 1,
    price: '',
    description: '',
    contact: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.from || !formData.to || !formData.date || !formData.time || !formData.price) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.seats < 1 || formData.seats > 8) {
      setError('Number of seats must be between 1 and 8.');
      return;
    }

    if (parseFloat(formData.price) <= 0) {
      setError('Price must be greater than 0.');
      return;
    }

    // Create new ride object
    const newRide = {
      ...formData,
      price: parseFloat(formData.price),
      seats: parseInt(formData.seats),
      driver: 'You', // In a real app, this would be the logged-in user
      id: Date.now() // Simple ID generation
    };

    // Call the parent callback to add the ride
    if (onPostRide) {
      onPostRide(newRide);
    }
    
    setSuccess('Ride posted successfully! Redirecting...');
    setTimeout(() => {
      history.push('/rides');
    }, 2000);
  };

  return (
    <div className="ride-post-container">
      <div className="post-form">
        <h2>Post a New Ride</h2>
        <p>Share your ride and help other students get to Seneca College</p>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="from">From *</label>
              <input
                id="from"
                name="from"
                type="text"
                placeholder="e.g., Toronto, Scarborough"
                value={formData.from}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="to">To *</label>
              <input
                id="to"
                name="to"
                type="text"
                placeholder="e.g., Seneca Newnham, Seneca King"
                value={formData.to}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time *</label>
              <input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="seats">Available Seats *</label>
              <input
                id="seats"
                name="seats"
                type="number"
                min="1"
                max="8"
                value={formData.seats}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price per Seat ($) *</label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              placeholder="Any additional details about your ride..."
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact Information (Optional)</label>
            <input
              id="contact"
              name="contact"
              type="text"
              placeholder="Phone number or email"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="post-btn">
              🚗 Post Ride
            </button>
            <button 
              type="button" 
              onClick={() => history.push('/')}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RidePostForm;
