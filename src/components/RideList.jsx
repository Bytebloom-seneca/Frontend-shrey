import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ChatModal from './ChatModal';
import './RideListEnhanced.css';

const RideList = ({ rides, setRides, setNotification, onShowAllRides, isFiltered }) => {
  const [selectedRide, setSelectedRide] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileRide, setProfileRide] = useState(null);
  const [reviews, setReviews] = useState([]); // [{driverEmail, rating, text}]
  const [reviewForm, setReviewForm] = useState({ rating: 5, text: '' });
  const [reviewError, setReviewError] = useState('');
  const history = useHistory();
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatRide, setChatRide] = useState(null);

  const handleBookRide = (ride) => {
    setSelectedRide(ride);
    setShowBookingModal(true);
  };

  const handleViewProfile = (ride) => {
    setProfileRide(ride);
    setShowProfileModal(true);
    setReviewForm({ rating: 5, text: '' });
    setReviewError('');
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewForm.rating || !reviewForm.text.trim()) {
      setReviewError('Please provide a rating and a review.');
      return;
    }
    setReviews((prev) => [
      ...prev,
      {
        driverEmail: profileRide.driverEmail,
        driver: profileRide.driver,
        rating: reviewForm.rating,
        text: reviewForm.text,
        date: new Date().toLocaleString()
      }
    ]);
    setReviewForm({ rating: 5, text: '' });
    setReviewError('');
  };

  const confirmBooking = () => {
    if (!selectedRide || selectedRide.seats === 0) return;
    
    // Find the ride index for navigation
    const rideIndex = rides.findIndex(ride => ride === selectedRide);
    
    setRides(prevRides => prevRides.map(ride =>
      ride === selectedRide
        ? { ...ride, seats: ride.seats - 1 }
        : ride
    ));
    setBookingSuccess('Booking confirmed! Redirecting to ride details...');
    setNotification && setNotification('Booking confirmed! Your seat has been reserved.');
    
    setTimeout(() => {
      setShowBookingModal(false);
      setSelectedRide(null);
      setBookingSuccess('');
      // Redirect to ride details page
      history.push(`/ride-details/${rideIndex}`);
    }, 1500);
  };

  // For demo, assume current user is 'You'
  const currentUser = 'You';

  const handleOpenChat = (ride) => {
    setChatRide(ride);
    setShowChatModal(true);
  };

  const handleCloseChat = () => {
    setShowChatModal(false);
    setChatRide(null);
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
        {isFiltered && (
          <button
            onClick={onShowAllRides}
            className="new-search-btn"
            style={{ marginLeft: 8, background: '#3498db', color: '#fff' }}
          >
            Show All Rides
          </button>
        )}
      </div>

      <div className="rides-grid">
        {rides.map((ride, index) => (
          <div key={index} className="ride-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="ride-header">
              <div className="route-info">
                <div className="route-display">
                  <div className="location">{ride.from}</div>
                  <div className="route-arrow">→</div>
                  <div className="location">{ride.to}</div>
                </div>
              </div>
              <div className="price-badge">${ride.price}</div>
            </div>
            
            <div className="ride-details">
              <div className="detail-item">
                <div className="detail-label">Date</div>
                <div className="detail-value">{formatDate(ride.date)}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Time</div>
                <div className="detail-value">{formatTime(ride.time)}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Seats</div>
                <div className="detail-value">{ride.seats}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Rating</div>
                <div className="detail-value">⭐ {ride.rating || '4.8'}</div>
              </div>
            </div>
            
            <div className="driver-info">
              <div className="driver-avatar">
                {ride.driver ? ride.driver.charAt(0).toUpperCase() : 'D'}
              </div>
              <div className="driver-details">
                <h4>{ride.driver || 'Driver Name'}</h4>
                <div className="driver-rating">⭐⭐⭐⭐⭐ {ride.rating || '4.8'}/5.0</div>
              </div>
            </div>

            <div className="ride-actions">
              <button 
                onClick={() => handleBookRide(ride)}
                className={`action-btn book-btn ${ride.seats === 0 ? 'disabled' : ''}`}
                disabled={ride.seats === 0}
              >
                {ride.seats === 0 ? '🚫 Full' : '🎫 Book Now'}
              </button>
              <button className="action-btn chat-btn" onClick={() => handleOpenChat(ride)}>
                💬 Chat
              </button>
              <button className="action-btn profile-btn" onClick={() => handleViewProfile(ride)}>
                👤 Profile
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
              {selectedRide.driverProfilePic ? (
                <img src={selectedRide.driverProfilePic} alt="Driver" style={{ width: 60, height: 60, borderRadius: '50%', marginBottom: 10, objectFit: 'cover', border: '2px solid #764ba2' }} />
              ) : (
                <span className="avatar-text" style={{ width: 60, height: 60, borderRadius: '50%', background: '#764ba2', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 28, marginBottom: 10 }}>{selectedRide.driver && selectedRide.driver[0] ? selectedRide.driver[0].toUpperCase() : 'D'}</span>
              )}
              <p><strong>From:</strong> {selectedRide.from}</p>
              <p><strong>To:</strong> {selectedRide.to}</p>
              <p><strong>Date:</strong> {formatDate(selectedRide.date)}</p>
              <p><strong>Time:</strong> {formatTime(selectedRide.time)}</p>
              <p><strong>Price:</strong> ${selectedRide.price}</p>
              <hr />
              <p><strong>Driver:</strong> {selectedRide.driver || 'N/A'}{selectedRide.driverRole ? ` (${selectedRide.driverRole})` : ''}</p>
              {selectedRide.driverEmail && <p><strong>Email:</strong> {selectedRide.driverEmail}</p>}
              {selectedRide.driverPhone && <p><strong>Phone:</strong> {selectedRide.driverPhone}</p>}
              {bookingSuccess && <div style={{ color: 'green', fontWeight: 'bold', marginTop: 10 }}>{bookingSuccess}</div>}
            </div>
            <div className="modal-actions">
              <button onClick={confirmBooking} className="confirm-btn" disabled={selectedRide.seats === 0}>
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
      {/* Profile Modal */}
      {showProfileModal && profileRide && (
        <div className="modal-overlay">
          <div className="booking-modal">
            <h3>Driver Profile</h3>
            <div className="booking-details" style={{ textAlign: 'center' }}>
              {profileRide.driverProfilePic ? (
                <img src={profileRide.driverProfilePic} alt="Driver" style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto 10px', objectFit: 'cover', border: '2px solid #764ba2' }} />
              ) : (
                <span className="avatar-text" style={{ width: 80, height: 80, borderRadius: '50%', background: '#764ba2', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 32, margin: '0 auto 10px' }}>{profileRide.driver && profileRide.driver[0] ? profileRide.driver[0].toUpperCase() : 'D'}</span>
              )}
              <p><strong>Name:</strong> {profileRide.driver || 'N/A'}</p>
              <p><strong>Role:</strong> {profileRide.driverRole || 'N/A'}</p>
              {profileRide.driverEmail && <p><strong>Email:</strong> {profileRide.driverEmail}</p>}
              {profileRide.driverPhone && <p><strong>Phone:</strong> {profileRide.driverPhone}</p>}
              {profileRide.driverBio && <p><strong>Bio:</strong> {profileRide.driverBio}</p>}
              <hr />
              <div style={{ textAlign: 'left', margin: '10px 0' }}>
                <h4>Reviews</h4>
                {reviews.filter(r => r.driverEmail === profileRide.driverEmail).length === 0 && <p>No reviews yet.</p>}
                {reviews.filter(r => r.driverEmail === profileRide.driverEmail).map((r, idx) => (
                  <div key={idx} style={{ marginBottom: 8, padding: 8, background: '#f8f9fa', borderRadius: 6 }}>
                    <div style={{ fontWeight: 'bold', color: '#764ba2' }}>{r.driver || 'Driver'} <span style={{ color: '#f39c12' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span></div>
                    <div style={{ fontSize: 14 }}>{r.text}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{r.date}</div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmitReview} style={{ marginTop: 10, textAlign: 'left' }}>
                <label style={{ fontWeight: 'bold' }}>Leave a Review:</label>
                <div style={{ margin: '6px 0' }}>
                  <select name="rating" value={reviewForm.rating} onChange={handleReviewChange} style={{ marginRight: 8 }}>
                    {[5,4,3,2,1].map(star => <option key={star} value={star}>{'★'.repeat(star)}{'☆'.repeat(5-star)}</option>)}
                  </select>
                  <input
                    type="text"
                    name="text"
                    value={reviewForm.text}
                    onChange={handleReviewChange}
                    placeholder="Write your review..."
                    style={{ width: '60%' }}
                  />
                  <button type="submit" className="edit-profile-btn" style={{ marginLeft: 8, padding: '6px 16px', fontSize: 14 }}>Submit</button>
                </div>
                {reviewError && <div style={{ color: 'red', fontSize: 13 }}>{reviewError}</div>}
              </form>
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowProfileModal(false)} className="cancel-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Enhanced Chat Modal */}
      <ChatModal
        isOpen={showChatModal}
        onClose={handleCloseChat}
        ride={chatRide}
        currentUser={currentUser}
      />
    </div>
  );
};

export default RideList;
