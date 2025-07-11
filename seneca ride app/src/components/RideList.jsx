import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RideList = ({ rides }) => {
  const [selectedRide, setSelectedRide] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const history = useHistory();

  const handleBookRide = (ride) => {
    setSelectedRide(ride);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    // Here you would typically make an API call to book the ride
    alert(`Booking confirmed for ride from ${selectedRide.from} to ${selectedRide.to}!`);
    setShowBookingModal(false);
    setSelectedRide(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  if (!rides || rides.length === 0) {
    return (
      <div className="no-rides-container">
        <div className="no-rides-content">
          <h2>No Rides Found</h2>
          <p>We couldn't find any rides matching your search criteria.</p>
          <button 
            onClick={() => history.push('/search')}
            className="search-again-btn"
          >
            Search Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ride-list-container">
      <div className="ride-list-header">
        <h2>Available Rides ({rides.length})</h2>
        <button 
          onClick={() => history.push('/search')}
          className="new-search-btn"
        >
          New Search
        </button>
      </div>

      <div className="rides-grid">
        {rides.map((ride, index) => (
          <div key={index} className="ride-card">
            <div className="ride-header">
              <h3>{ride.from} → {ride.to}</h3>
              <span className="price">${ride.price}</span>
            </div>
            
            <div className="ride-details">
              <div className="detail-item">
                <span className="icon">📅</span>
                <span>{formatDate(ride.date)}</span>
              </div>
              <div className="detail-item">
                <span className="icon">🕒</span>
                <span>{formatTime(ride.time)}</span>
              </div>
              <div className="detail-item">
                <span className="icon">💺</span>
                <span>{ride.seats} seat{ride.seats !== 1 ? 's' : ''} available</span>
              </div>
            </div>

            <div className="ride-actions">
              <button 
                onClick={() => handleBookRide(ride)}
                className="book-btn"
                disabled={ride.seats === 0}
              >
                {ride.seats === 0 ? 'Full' : 'Book Now'}
              </button>
              <button className="contact-btn">
                Contact Driver
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedRide && (
        <div className="modal-overlay">
          <div className="booking-modal">
            <h3>Confirm Booking</h3>
            <div className="booking-details">
              <p><strong>From:</strong> {selectedRide.from}</p>
              <p><strong>To:</strong> {selectedRide.to}</p>
              <p><strong>Date:</strong> {formatDate(selectedRide.date)}</p>
              <p><strong>Time:</strong> {formatTime(selectedRide.time)}</p>
              <p><strong>Price:</strong> ${selectedRide.price}</p>
            </div>
            <div className="modal-actions">
              <button onClick={confirmBooking} className="confirm-btn">
                Confirm Booking
              </button>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RideList;
