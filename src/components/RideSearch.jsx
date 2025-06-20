import React, { useState } from 'react';

const RideSearch = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
  });

  const handleChange = (e) => {
    setSearchParams((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchParams); // pass to parent
  };

  return (
    <form onSubmit={handleSearch}>
      <h3>Find a Ride</h3>
      <input name="from" placeholder="From" onChange={handleChange} />
      <input name="to" placeholder="To" onChange={handleChange} />
      <input name="date" type="date" onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
};

export default RideSearch;
