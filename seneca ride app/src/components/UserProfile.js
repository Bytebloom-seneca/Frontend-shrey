import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (416) 555-0123',
    rating: 4.8,
    ridesGiven: 15,
    ridesTaken: 8,
    memberSince: 'January 2024'
  });

  const [activeTab, setActiveTab] = useState('profile');
  const history = useHistory();

  const handleLogout = () => {
    // Clear user session/logic here
    console.log('User logged out');
    history.push('/login');
  };

  const renderProfileTab = () => (
    <div className="profile-section">
      <div className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-text">{user.name.charAt(0)}</span>
        </div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p className="user-email">{user.email}</p>
          <div className="user-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-text">{user.rating}/5.0</span>
          </div>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-item">
          <label>Phone:</label>
          <span>{user.phone}</span>
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
        <button className="edit-profile-btn">Edit Profile</button>
        <button className="change-password-btn">Change Password</button>
      </div>
    </div>
  );

  const renderRidesTab = () => (
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
        {activeTab === 'upcoming' ? (
          <div className="no-rides">
            <p>No upcoming rides</p>
            <Link to="/search" className="find-ride-btn">Find a Ride</Link>
          </div>
        ) : (
          <div className="no-rides">
            <p>No past rides</p>
          </div>
        )}
      </div>
    </div>
  );

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