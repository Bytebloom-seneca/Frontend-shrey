import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const RideForm = () => {
  const [ride, setRide] = useState({
    departure: '',
    destination: '',
    date: '',
    time: '',
    seats: 1,
    cost: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'rides'), ride);
      alert('Ride posted successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Departure" value={ride.departure} onChange={e => setRide({...ride, departure: e.target.value})} required />
      <input type="text" placeholder="Destination" value={ride.destination} onChange={e => setRide({...ride, destination: e.target.value})} required />
      <input type="date" value={ride.date} onChange={e => setRide({...ride, date: e.target.value})} required />
      <input type="time" value={ride.time} onChange={e => setRide({...ride, time: e.target.value})} required />
      <input type="number" min="1" value={ride.seats} onChange={e => setRide({...ride, seats: e.target.value})} required />
      <input type="number" step="0.01" placeholder="Cost ($)" value={ride.cost} onChange={e => setRide({...ride, cost: e.target.value})} required />
      <button type="submit">Post Ride</button>
    </form>
  );
};

export default RideForm;
