import React from 'react';

const RideList = ({ rides }) => {
  if (!rides || rides.length === 0) {
    return <p>No rides found.</p>;
  }

  return (
    <div>
      <h3>Available Rides</h3>
      {rides.map((ride, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <p><strong>From:</strong> {ride.from}</p>
          <p><strong>To:</strong> {ride.to}</p>
          <p><strong>Date:</strong> {ride.date}</p>
          <p><strong>Time:</strong> {ride.time}</p>
          <p><strong>Seats:</strong> {ride.seats}</p>
          <p><strong>Price:</strong> ${ride.price}</p>
        </div>
      ))}
    </div>
  );
};

export default RideList;
