import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './MyBookings.css';

const MyBookings = ({ rides, user }) => {
  const history = useHistory();
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    // For demo purposes, we'll simulate user bookings
    // In a real app, this would come from a backend API
    const mockBookings = rides.map((ride, index) => ({
      ...ride,
      id: index,
      bookingDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: Math.random() > 0.8 ? 'cancelled' : 'confirmed',
      seatsBooked: Math.floor(Math.random() * 3) + 1
    })).filter(() => Math.random() > 0.3); // Show only some rides as booked

    setUserBookings(mockBookings);
  }, [rides]);

  const handleViewDetails = (bookingId) => {
    history.push(`/ride-details/${bookingId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#27ae60';
      case 'cancelled': return '#e74c3c';
      case 'completed': return '#95a5a6';
      default: return '#3498db';
    }
  };

  if (userBookings.length === 0) {
    return (
      <div className="my-bookings-container">
        <div className="bookings-header">
          <h1>My Bookings</h1>
        </div>
        <div className="no-bookings">
          <div className="no-bookings-content">
            <div className="no-bookings-icon">🚗</div>
            <h2>No Bookings Yet</h2>
            <p>You haven't booked any rides yet. Start exploring available rides!</p>
            <button 
              onClick={() => history.push('/rides')}
              className="browse-rides-btn"
            >
              Browse Available Rides
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-bookings-container">
      <div className="bookings-header">
        <h1>My Bookings</h1>
        <p>Manage your ride bookings</p>
      </div>

      <div className="bookings-stats">
        <div className="stat-card">
          <div className="stat-number">{userBookings.filter(b => b.status === 'confirmed').length}</div>
          <div className="stat-label">Active Bookings</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{userBookings.filter(b => b.status === 'completed').length}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{userBookings.filter(b => b.status === 'cancelled').length}</div>
          <div className="stat-label">Cancelled</div>
        </div>
      </div>

      <div className="bookings-list">
        {userBookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-header">
              <div className="booking-route">
                <span className="route-from">{booking.from}</span>
                <div className="route-arrow">→</div>
                <span className="route-to">{booking.to}</span>
              </div>
              <div 
                className="booking-status"
                style={{ backgroundColor: getStatusColor(booking.status) }}
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </div>
            </div>

            <div className="booking-details">
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{formatDate(booking.date)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Time:</span>
                  <span className="detail-value">{booking.time}</span>
                </div>
              </div>
              
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Driver:</span>
                  <span className="detail-value">{booking.driver || 'John Doe'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Seats Booked:</span>
                  <span className="detail-value">{booking.seatsBooked}</span>
                </div>
              </div>
              
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Total Price:</span>
                  <span className="detail-value price">${(booking.price * booking.seatsBooked).toFixed(2)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Booked On:</span>
                  <span className="detail-value">{formatDate(booking.bookingDate)}</span>
                </div>
              </div>
            </div>

            <div className="booking-actions">
              <button 
                onClick={() => handleViewDetails(booking.id)}
                className="view-details-btn"
              >
                View Details
              </button>
              {booking.status === 'confirmed' && (
                <>
                  <button className="contact-driver-btn">
                    💬 Contact Driver
                  </button>
                  <button className="modify-booking-btn">
                    ✏️ Modify
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bookings-footer">
        <button 
          onClick={() => history.push('/rides')}
          className="book-new-ride-btn"
        >
          + Book New Ride
        </button>
      </div>
    </div>
  );
};

export default MyBookings;
