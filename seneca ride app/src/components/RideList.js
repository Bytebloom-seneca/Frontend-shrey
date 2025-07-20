import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const RideList = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      const querySnapshot = await getDocs(collection(db, 'rides'));
      const ridesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRides(ridesData);
    };
    fetchRides();
  }, []);

  return (
    <div>
      <h2>Available Rides</h2>
      {rides.map(ride => (
        <div key={ride.id}>
          <h4>{ride.departure} ➜ {ride.destination}</h4>
          <p>Date: {ride.date}, Time: {ride.time}</p>
          <p>Seats: {ride.seats}, Cost: ${ride.cost}</p>
        </div>
      ))}
    </div>
  );
};

export default RideList;
