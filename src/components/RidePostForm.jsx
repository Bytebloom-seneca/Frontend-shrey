import React, { useState } from 'react';

const RidePostForm = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    seats: 1,
    price: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.from || !formData.to || !formData.date || !formData.time) {
      alert('All fields are required.');
      return;
    }

    console.log('Ride posted:', formData);
    // Save to Firebase here (optional)
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Post a Ride</h3>
      <input name="from" placeholder="From" onChange={handleChange} />
      <input name="to" placeholder="To" onChange={handleChange} />
      <input name="date" type="date" onChange={handleChange} />
      <input name="time" type="time" onChange={handleChange} />
      <input name="seats" type="number" min="1" onChange={handleChange} placeholder="Seats Available" />
      <input name="price" type="number" step="0.01" placeholder="Cost per seat" onChange={handleChange} />
      <button type="submit">Post Ride</button>
    </form>
  );
};

export default RidePostForm;
