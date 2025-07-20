import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ChatModal from './ChatModal';
import './RideDetails.css';

const RideDetails = ({ rides, setRides, setNotification, user }) => {
  const { rideId } = useParams();
  const history = useHistory();
  const [ride, setRide] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  useEffect(() => {
    // Find the ride by ID (using index as ID for now)
    const foundRide = rides[parseInt(rideId)];
    if (foundRide) {
      setRide(foundRide);
      setEditForm({
        from: foundRide.from,
        to: foundRide.to,
        date: foundRide.date,
        time: foundRide.time,
        seats: foundRide.seats,
        price: foundRide.price
      });
    }
  }, [rideId, rides]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    const updatedRides = rides.map((r, index) => 
      index === parseInt(rideId) 
        ? { ...r, ...editForm }
        : r
    );
    setRides(updatedRides);
    // Persist to localStorage
    localStorage.setItem('allRides', JSON.stringify(updatedRides));
    setRide({ ...ride, ...editForm });
    setIsEditing(false);
    setNotification('Ride details updated successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleCancelBooking = () => {
    const updatedRides = rides.map((r, index) => 
      index === parseInt(rideId) 
        ? { ...r, seats: r.seats + 1 }
        : r
    );
    setRides(updatedRides);
    // Persist to localStorage
    localStorage.setItem('allRides', JSON.stringify(updatedRides));
    setNotification('Booking cancelled successfully!');
    setTimeout(() => {
      setNotification('');
      history.push('/my-bookings');
    }, 2000);
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

  if (!ride) {
    return (
      <div className="ride-details-container">
        <div className="ride-not-found">
          <h2>Ride Not Found</h2>
          <p>The ride you're looking for doesn't exist.</p>
          <button onClick={() => history.push('/rides')} className="back-btn">
            Back to Rides
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ride-details-container">
      <div className="ride-details-header">
        <button onClick={() => history.goBack()} className="back-btn">
          ← Back
        </button>
        <h1>Ride Details</h1>
      </div>

      <div className="ride-details-card">
        <div className="ride-status">
          <span className="status-badge confirmed">Confirmed</span>
          <span className="booking-id">Booking ID: #{rideId}</span>
        </div>

        <div className="ride-info-section">
          <h2>Trip Information</h2>
          <div className="trip-route">
            <div className="route-point">
              <div className="route-icon from">📍</div>
              <div className="route-details">
                <label>From:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="from"
                    value={editForm.from}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span className="route-location">{ride.from}</span>
                )}
              </div>
            </div>
            
            <div className="route-line"></div>
            
            <div className="route-point">
              <div className="route-icon to">🎯</div>
              <div className="route-details">
                <label>To:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="to"
                    value={editForm.to}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span className="route-location">{ride.to}</span>
                )}
              </div>
            </div>
          </div>

          <div className="trip-details-grid">
            <div className="detail-item">
              <label>Date:</label>
              {isEditing ? (
                <input
                  type="date"
                  name="date"
                  value={editForm.date}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              ) : (
                <span>{formatDate(ride.date)}</span>
              )}
            </div>
            
            <div className="detail-item">
              <label>Time:</label>
              {isEditing ? (
                <input
                  type="time"
                  name="time"
                  value={editForm.time}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              ) : (
                <span>{formatTime(ride.time)}</span>
              )}
            </div>
            
            <div className="detail-item">
              <label>Available Seats:</label>
              {isEditing ? (
                <input
                  type="number"
                  name="seats"
                  value={editForm.seats}
                  onChange={handleInputChange}
                  min="0"
                  max="8"
                  className="edit-input"
                />
              ) : (
                <span>{ride.seats}</span>
              )}
            </div>
            
            <div className="detail-item">
              <label>Price per Seat:</label>
              {isEditing ? (
                <input
                  type="number"
                  name="price"
                  value={editForm.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="edit-input"
                />
              ) : (
                <span>${ride.price}</span>
              )}
            </div>
          </div>
        </div>

        <div className="driver-info-section">
          <h2>Driver Information</h2>
          <div className="driver-card">
            <div className="driver-avatar">
              {ride.driver ? ride.driver.charAt(0).toUpperCase() : '👤'}
            </div>
            <div className="driver-details">
              <h3>{ride.driver || 'Driver Name'}</h3>
              <p>{ride.driverEmail || 'driver@email.com'}</p>
              <div className="driver-rating">
                ⭐ {ride.rating || '4.8'} ({ride.reviewCount || '24'} reviews)
              </div>
            </div>
            <button 
              className="contact-driver-btn"
              onClick={() => setShowChatModal(true)}
            >
              💬 Contact Driver
            </button>
          </div>
        </div>

        <div className="booking-actions">
          {isEditing ? (
            <div className="edit-actions">
              <button onClick={handleSaveChanges} className="save-btn">
                Save Changes
              </button>
              <button onClick={() => setIsEditing(false)} className="cancel-edit-btn">
                Cancel
              </button>
            </div>
          ) : (
            <div className="view-actions">
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                ✏️ Modify Booking
              </button>
              <button 
                onClick={() => setShowCancelModal(true)} 
                className="cancel-booking-btn"
              >
                ❌ Cancel Booking
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Cancel Booking</h3>
            <p>Are you sure you want to cancel this booking? This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={handleCancelBooking} className="confirm-cancel-btn">
                Yes, Cancel Booking
              </button>
              <button onClick={() => setShowCancelModal(false)} className="keep-booking-btn">
                Keep Booking
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced Chat Modal */}
      <ChatModal
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
        ride={ride}
        currentUser={user?.name || user?.email || 'You'}
      />
    </div>
  );
};

export default RideDetails;
