import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import RideSearch from './RideSearch';
import RideList from './RideList';
import RidePostForm from './RidePostForm';
import MapView from './MapView';
import Login from './Login';
import Signup from './Signup';
import UserProfile from './UserProfile';


function App() {
  const [rides, setRides] = useState([]);

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
    const filteredRides = dummyRides.filter(ride => {
      const fromMatch = ride.from.toLowerCase().includes(params.from.toLowerCase());
      const toMatch = ride.to.toLowerCase().includes(params.to.toLowerCase());
      const dateMatch = ride.date === params.date;
      
      return fromMatch && toMatch && dateMatch;
    });
    
    setRides(filteredRides);
  };

  const handlePostRide = (newRide) => {
    // Add the new ride to the list
    setRides(prevRides => [newRide, ...prevRides]);
  };

  return (
    <div className="App">
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
              <Link to="/profile" className="nav-link">Profile</Link>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </div>
          </div>
        </nav>

        <Switch>
          <Route exact path="/" component={MapView} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/post" render={(props) => <RidePostForm {...props} onPostRide={handlePostRide} />} />
          <Route path="/search" render={(props) => <RideSearch {...props} onSearch={handleSearch} />} />
          <Route path="/rides" render={(props) => <RideList {...props} rides={rides} />} />
          <Route path="/profile" component={UserProfile} />
          {/* Add more routes as needed */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
