import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RidePostForm = ({ onPostRide, user }) => {
  const [formData, setFormData] = useState({
    fromCity: '',
    fromCampus: 'Seneca Newnham',
    toCampus: 'Seneca Newnham',
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

    if (!user || user.role !== 'Driver') {
      setError('Only users with the Driver role can post rides. Please update your profile to become a driver.');
      return;
    }

    // Validation
    if (!formData.fromCity || !formData.fromCampus || !formData.toCampus || !formData.date || !formData.time || !formData.price) {
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
      from: `${formData.fromCity} (${formData.fromCampus})`,
      to: formData.toCampus,
      price: parseFloat(formData.price),
      seats: parseInt(formData.seats),
      driver: user?.name || user?.email || 'Unknown',
      driverEmail: user?.email,
      driverPhone: user?.phone,
      driverRole: user?.role,
      driverProfilePic: user?.profilePic || null,
      driverBio: user?.bio || '',
      id: Date.now() // Simple ID generation
    };

    // Call the parent callback to add the ride
    if (onPostRide) {
      onPostRide(newRide);
    }
    history.push('/rides'); // Redirect immediately after posting
  };

  return (
    <div className="ride-post-container">
      <div className="post-form">
        <h2>Post a New Ride</h2>
        <p>Share your ride and help other students get to Seneca College</p>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        {user && user.role !== 'Driver' && (
          <div className="error-message">You must be a Driver to post rides. Update your profile to change your role.</div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fromCity">From City/Town *</label>
              <input
                id="fromCity"
                name="fromCity"
                type="text"
                placeholder="e.g., Toronto, Scarborough"
                value={formData.fromCity}
                onChange={handleChange}
                required
                disabled={user && user.role !== 'Driver'}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fromCampus">From Campus *</label>
              <select
                id="fromCampus"
                name="fromCampus"
                value={formData.fromCampus}
                onChange={handleChange}
                required
                disabled={user && user.role !== 'Driver'}
              >
                <option value="Seneca Newnham">Seneca Newnham</option>
                <option value="Seneca King">Seneca King</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="toCampus">To Campus *</label>
              <select
                id="toCampus"
                name="toCampus"
                value={formData.toCampus}
                onChange={handleChange}
                required
                disabled={user && user.role !== 'Driver'}
              >
                <option value="Seneca Newnham">Seneca Newnham</option>
                <option value="Seneca King">Seneca King</option>
              </select>
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
                disabled={user && user.role !== 'Driver'}
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
                disabled={user && user.role !== 'Driver'}
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
                disabled={user && user.role !== 'Driver'}
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
                disabled={user && user.role !== 'Driver'}
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
              disabled={user && user.role !== 'Driver'}
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
              disabled={user && user.role !== 'Driver'}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="post-btn" disabled={user && user.role !== 'Driver'}>
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
