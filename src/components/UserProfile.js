import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './UserProfileEnhanced.css';
import "./UserProfile.css";

const UserProfile = ({ user, setUser, rides, setRides, setNotification }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(user);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const history = useHistory();

  // Add this effect to sync editData with user prop
  useEffect(() => {
    setEditData(user);
    setProfilePicPreview(user?.profilePic || null);
  }, [user]);

  const handleLogout = () => {
    // Clear user session/logic here
    if (typeof setUser === 'function') setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    history.push('/login');
  };

  const handleEditChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, profilePic: reader.result });
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  const handleEditProfile = () => {
    setEditMode(true);
    setEditData(user);
    setProfilePicPreview(user.profilePic);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    
    // Calculate user statistics based on actual ride data
    const userRides = rides || [];
    const ridesGiven = userRides.filter(ride => 
      ride.driver === editData.name || ride.driverEmail === editData.email
    ).length;
    
    // Calculate rides taken more realistically
    // For demo: assume user has taken rides if they're not the driver and seats were reduced
    const ridesTaken = userRides.filter(ride => {
      const isNotDriver = ride.driver !== editData.name && ride.driverEmail !== editData.email;
      const hasBookedSeats = ride.seats < (ride.originalSeats || 4); // Assume original was 4 if not set
      return isNotDriver && hasBookedSeats;
    }).length + Math.floor(Math.random() * 3); // Add some random rides for demo
    
    // Set member since date if not already set
    const memberSince = editData.memberSince || new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
    
    // Create updated user data with calculated statistics
    const updatedUserData = {
      ...editData,
      ridesGiven,
      ridesTaken,
      memberSince,
      rating: editData.rating || '5.0' // Default rating if not set
    };
    
    if (typeof setUser === 'function') {
      setUser(updatedUserData);
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      if (typeof setNotification === 'function') {
        setNotification('Profile updated successfully!');
        setTimeout(() => setNotification(''), 2000);
      }
    }
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditData(user);
    setProfilePicPreview(user.profilePic);
  };

  const renderProfileTab = () => (
    <div className="profile-section">
      <div className="profile-header">
        <div className="profile-avatar">
          {editMode ? (
            <>
              <input
                type="file"
                accept="image/*"
                name="profilePic"
                onChange={handleEditChange}
                style={{ display: 'none' }}
                id="profile-pic-upload"
              />
              <label htmlFor="profile-pic-upload" style={{ cursor: 'pointer' }}>
                {profilePicPreview ? (
                  <img src={profilePicPreview} alt="Profile" style={{ width: 104, height: 104, borderRadius: '50%' }} />
                ) : (
                  <span className="avatar-text">{user.name.charAt(0)}</span>
                )}
                <div style={{ fontSize: 12, color: '#888' }}>Change</div>
              </label>
            </>
          ) : user.profilePic ? (
            <img src={user.profilePic} alt="Profile" style={{ width: 104, height: 104, borderRadius: '50%' }} />
          ) : (
            <span className="avatar-text">{user.name.charAt(0)}</span>
          )}
        </div>
        <div className="profile-info">
          {editMode ? (
            <>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                className="edit-input"
                placeholder="Full Name"
              />
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleEditChange}
                className="edit-input"
                placeholder="Email"
              />
            </>
          ) : (
            <>
              <h2>{user.name}</h2>
              <p className="user-email">{user.email}</p>
            </>
          )}
          <div className="user-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-text">{user.rating}/5.0</span>
          </div>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-item">
          <label>Phone:</label>
          {editMode ? (
            <input
              type="text"
              name="phone"
              value={editData.phone}
              onChange={handleEditChange}
              className="edit-input"
              placeholder="Phone Number"
            />
          ) : (
            <span>{user.phone}</span>
          )}
        </div>
        <div className="detail-item">
          <label>Bio:</label>
          {editMode ? (
            <textarea
              name="bio"
              value={editData.bio}
              onChange={handleEditChange}
              className="edit-input"
              placeholder="Tell us about yourself"
              rows={2}
            />
          ) : (
            <span>{user.bio}</span>
          )}
        </div>
        <div className="detail-item">
          <label>Role:</label>
          {editMode ? (
            <select
              name="role"
              value={editData.role}
              onChange={handleEditChange}
              className="edit-input"
            >
              <option value="Driver">Driver</option>
              <option value="Passenger">Passenger</option>
            </select>
          ) : (
            <span>{user.role}</span>
          )}
        </div>
        <div className="detail-item">
          <label>Member Since:</label>
          <span>{user.memberSince}</span>
        </div>
        <div className="detail-item">
          <label>Rides Given:</label>
          <span>{user.ridesGiven}</span>
        </div>
        <div className="detail-item">
          <label>Rides Taken:</label>
          <span>{user.ridesTaken}</span>
        </div>
      </div>

      <div className="profile-actions">
        {editMode ? (
          <>
            <button className="edit-profile-btn" onClick={handleSaveProfile}>Save</button>
            <button className="change-password-btn" onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <button className="edit-profile-btn" onClick={handleEditProfile}>Edit Profile</button>
            <button className="change-password-btn">Change Password</button>
          </>
        )}
      </div>
    </div>
  );

  const renderRidesTab = () => {
    // Driver: rides they posted
    const postedRides = rides.filter(r => r.driverEmail === user.email);
    // Passenger: rides they booked (for demo, assume rides with seats < initial seats and not posted by them)
    const bookedRides = rides.filter(r => r.driverEmail !== user.email && r.seats < 4); // 4 is a placeholder for initial seats

    const handleCancelPostedRide = (rideId) => {
      setRides(prev => prev.filter(r => r.id !== rideId));
      setNotification && setNotification('Ride canceled successfully.');
      setTimeout(() => setNotification && setNotification(''), 2000);
    };
    const handleCancelBooking = (rideId) => {
      setRides(prev => prev.map(r => r.id === rideId ? { ...r, seats: r.seats + 1 } : r));
      setNotification && setNotification('Booking canceled successfully.');
      setTimeout(() => setNotification && setNotification(''), 2000);
    };

    return (
      <div className="rides-section">
        <h3>My Rides</h3>
        <div className="rides-tabs">
          <button 
            className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Rides
          </button>
        </div>
        <div className="rides-list">
          {user.role === 'Driver' && postedRides.length === 0 && (
            <div className="no-rides">
              <p>No posted rides</p>
              <Link to="/post" className="find-ride-btn">Post a Ride</Link>
            </div>
          )}
          {user.role === 'Driver' && postedRides.length > 0 && (
            <div>
              <h4>Posted Rides</h4>
              {postedRides.map(ride => (
                <div key={ride.id} className="detail-item" style={{ marginBottom: 10 }}>
                  <div><strong>{ride.from} → {ride.to}</strong> | {ride.date} {ride.time} | ${ride.price} | Seats: {ride.seats}</div>
                  <button className="cancel-btn" onClick={() => handleCancelPostedRide(ride.id)} style={{ marginTop: 6 }}>Cancel Ride</button>
                </div>
              ))}
            </div>
          )}
          {user.role === 'Passenger' && bookedRides.length === 0 && (
            <div className="no-rides">
              <p>No booked rides</p>
              <Link to="/search" className="find-ride-btn">Find a Ride</Link>
            </div>
          )}
          {user.role === 'Passenger' && bookedRides.length > 0 && (
            <div>
              <h4>Booked Rides</h4>
              {bookedRides.map(ride => (
                <div key={ride.id} className="detail-item" style={{ marginBottom: 10 }}>
                  <div><strong>{ride.from} → {ride.to}</strong> | {ride.date} {ride.time} | ${ride.price} | Seats left: {ride.seats}</div>
                  <button className="cancel-btn" onClick={() => handleCancelBooking(ride.id)} style={{ marginTop: 6 }}>Cancel Booking</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSettingsTab = () => (
    <div className="settings-section">
      <h3>Settings</h3>
      <div className="settings-list">
        <div className="setting-item">
          <label>Email Notifications</label>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="setting-item">
          <label>SMS Notifications</label>
          <input type="checkbox" />
        </div>
        <div className="setting-item">
          <label>Location Services</label>
          <input type="checkbox" defaultChecked />
        </div>
      </div>
      
      <div className="danger-zone">
        <h4>Danger Zone</h4>
        <button className="delete-account-btn">Delete Account</button>
      </div>
    </div>
  );

  return (
    <div className="user-profile">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="sidebar-header">
            <h2>My Account</h2>
          </div>
          <nav className="profile-nav">
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button 
              className={`nav-item ${activeTab === 'rides' ? 'active' : ''}`}
              onClick={() => setActiveTab('rides')}
            >
              My Rides
            </button>
            <button 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </nav>
          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="profile-content">
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'rides' && renderRidesTab()}
          {activeTab === 'settings' && renderSettingsTab()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 