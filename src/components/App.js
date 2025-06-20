import React, { useState } from 'react';
import RidePostForm from './components/RidePostForm';
import RideSearch from './components/RideSearch';
import RideList from './components/RideList';
import MapView from './components/MapView';

function App() {
  const [rides, setRides] = useState([]);

  const handleSearch = (params) => {
    // This would be a Firestore query in real app
    const dummyResults = [
      { from: 'Toronto', to: 'Seneca', date: params.date, time: '09:00', seats: 3, price: 5 },
    ];
    setRides(dummyResults);
  };

  return (
    <div className="App">
      <RidePostForm />
      <RideSearch onSearch={handleSearch} />
      <RideList rides={rides} />
      <MapView />
    </div>
  );
}

export default App;
