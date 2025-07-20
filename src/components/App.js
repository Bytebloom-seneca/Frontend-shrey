import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import RideSearch from './RideSearch';
import RideList from './RideList';
import RidePostForm from './RidePostForm';
import MapView from './MapView';
import Login from './Login';
import Signup from './Signup';
import UserProfile from './UserProfile';
import AdminDashboard from './AdminDashboard';
import RideDetails from './RideDetails';
import MyBookings from './MyBookings';
import './App.css';

function App() {
  const [allRides, setAllRides] = useState([]); // master list
  const [rides, setRides] = useState([]); // filtered/search results
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, _setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false); // <-- Add this line

  // Always update localStorage when user changes
  const setUser = (userObj) => {
    _setUser(userObj);
    if (userObj) {
      localStorage.setItem('userData', JSON.stringify(userObj));
    }
  };

  // Helper function to update rides and persist to localStorage
  const updateRidesWithPersistence = (newRides) => {
    setAllRides(newRides);
    setRides(newRides);
    localStorage.setItem('allRides', JSON.stringify(newRides));
  };

  // Check if user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // Load rides from localStorage on initial load
  useEffect(() => {
    const savedRides = localStorage.getItem('allRides');
    if (savedRides) {
      const parsedRides = JSON.parse(savedRides);
      setAllRides(parsedRides);
      setRides(parsedRides);
      console.log('Loaded rides from localStorage:', parsedRides);
    } else if (allRides.length === 0) {
      // Only use dummy data if no saved rides exist
      setAllRides(dummyRides);
      setRides(dummyRides);
      localStorage.setItem('allRides', JSON.stringify(dummyRides));
      console.log('Initial load: allRides and rides set to dummyRides', dummyRides);
    }
    // eslint-disable-next-line
  }, []);

  // More realistic dummy data
  const dummyRides = [
    {
      from: 'Toronto',
      to: 'Seneca Newnham',
      date: '2024-01-22',
      time: '08:30',
      seats: 3,
      price: 8,
      driver: 'John D.',
      description: 'Early morning ride to Seneca, clean car, music allowed'
    },
    {
      from: 'Scarborough',
      to: 'Seneca Newnham',
      date: '2024-01-22',
      time: '09:00',
      seats: 2,
      price: 6,
      driver: 'Sarah M.',
      description: 'Comfortable ride, no smoking, quiet preferred'
    },
    {
      from: 'Markham',
      to: 'Seneca King',
      date: '2024-01-22',
      time: '08:45',
      seats: 4,
      price: 10,
      driver: 'Mike R.',
      description: 'Spacious SUV, can accommodate luggage'
    },
    {
      from: 'North York',
      to: 'Seneca Newnham',
      date: '2024-01-22',
      time: '09:15',
      seats: 1,
      price: 7,
      driver: 'Lisa K.',
      description: 'Quick ride, TTC pass available for return trip'
    },
    {
      from: 'Mississauga',
      to: 'Seneca Newnham',
      date: '2024-01-22',
      time: '07:30',
      seats: 0,
      price: 12,
      driver: 'Alex P.',
      description: 'Early bird special, full car'
    }
  ];

  const handleSearch = (params) => {
    // Filter rides based on search parameters
    const filteredRides = allRides.filter(ride => {
      // Campus match
      const fromCampusMatch = params.fromCampus === 'Anywhere'
        ? (params.fromAddress ? (ride.from && ride.from.toLowerCase().includes(params.fromAddress.toLowerCase())) : true)
        : (ride.from && ride.from.toLowerCase().includes(params.fromCampus.toLowerCase()));
      const toCampusMatch = params.toCampus === 'Anywhere' || (ride.to && ride.to.toLowerCase().includes(params.toCampus.toLowerCase()));
      // Date match
      const dateMatch = ride.date === params.date;
      // Time match (optional)
      const timeMatch = !params.time || ride.time === params.time;
      // Price match (optional)
      const minPrice = params.minPrice ? parseFloat(params.minPrice) : null;
      const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : null;
      const priceMatch = (minPrice === null || ride.price >= minPrice) && (maxPrice === null || ride.price <= maxPrice);
      return fromCampusMatch && toCampusMatch && dateMatch && timeMatch && priceMatch;
    });
    setRides(filteredRides);
  };

  const handlePostRide = (newRide) => {
    // Add the new ride to the master list and update filtered list
    setAllRides(prevAll => {
      const updatedAll = [newRide, ...prevAll];
      // Save to localStorage immediately
      localStorage.setItem('allRides', JSON.stringify(updatedAll));
      console.log('allRides after post:', updatedAll);
      return updatedAll;
    });
    setRides(prevRides => {
      const updatedRides = [newRide, ...prevRides];
      console.log('rides after post:', updatedRides);
      return updatedRides;
    });
    console.log('Posted new ride:', newRide);
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('authToken', 'dummy-token-' + Date.now());
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setShouldRedirect(true); // <-- Add this line
  };

  const handleSignup = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('authToken', 'dummy-token-' + Date.now());
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  // Helper to reset rides to allRides
  const handleShowAllRides = () => {
    setRides(allRides);
  };

  // Protected Route Component
  const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // If not authenticated, show login/register pages
  if (!isAuthenticated) {
    return (
      <div className="App">
        <Router>
          <div className="auth-container">
            <div className="auth-header">
              <h1>🚗 SenecaRide</h1>
              <p>Connect with fellow students for rides to Seneca College</p>
            </div>
            <Switch>
              <Route exact path="/" component={() => <Login onLogin={handleLogin} />} />
              <Route path="/login" component={() => <Login onLogin={handleLogin} />} />
              <Route path="/signup" component={() => <Signup onSignup={handleSignup} />} />
              <Redirect to="/" />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }

  // If authenticated, show the main app
  return (
    <div className="App">
      {shouldRedirect && <Redirect to="/login" />} {/* Add this line */}
      {notification && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, background: '#764ba2', color: '#fff', padding: '14px 28px', borderRadius: 10, fontWeight: 'bold', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
          {notification}
        </div>
      )}
      <Router>
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              🚗 SenecaRide
            </Link>
            <div className="nav-links">
              <Link to="/search" className="nav-link">Search Rides</Link>
              <Link to="/post" className="nav-link">Post Ride</Link>
              <Link to="/rides" className="nav-link">View Rides</Link>
              <Link to="/my-bookings" className="nav-link">My Bookings</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              {user?.role === 'Admin' && (
                <Link to="/admin" className="nav-link">Admin Dashboard</Link>
              )}
              <div className="user-info">
                <span>Welcome, {user?.name || user?.email}</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            </div>
          </div>
        </nav>

        <Switch>
          <Route exact path="/" component={MapView} />
          <ProtectedRoute path="/post" component={(props) => <RidePostForm {...props} onPostRide={handlePostRide} user={user} />} />
          <ProtectedRoute path="/search" component={(props) => <RideSearch {...props} onSearch={handleSearch} />} />
          <ProtectedRoute path="/rides" component={(props) => (
            <RideList
              {...props}
              rides={rides.length > 0 ? rides : allRides}
              setRides={setRides}
              setNotification={setNotification}
              onShowAllRides={handleShowAllRides}
              isFiltered={rides.length > 0 && rides.length !== allRides.length}
            />
          )} />
          <ProtectedRoute path="/my-bookings" component={(props) => (
            <MyBookings
              {...props}
              rides={rides.length > 0 ? rides : allRides}
              user={user}
            />
          )} />
          <ProtectedRoute path="/ride-details/:rideId" component={(props) => (
            <RideDetails
              {...props}
              rides={rides.length > 0 ? rides : allRides}
              setRides={setRides}
              setNotification={setNotification}
              user={user}
            />
          )} />
          <ProtectedRoute path="/profile" component={(props) => <UserProfile {...props} user={user} setUser={setUser} rides={rides} setRides={setRides} setNotification={setNotification} />} />
          <Route path="/admin" render={props => user?.role === 'Admin' ? (
            <AdminDashboard {...props} user={user} rides={rides} setRides={setRides} />
          ) : <Redirect to="/" />} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
