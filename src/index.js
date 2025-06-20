import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import RideForm from './components/RideForm';
import RideList from './components/RideList';
import Map from './components/Map';
import './App.css';

const App = () => (
  <div>
    <h1>SenecaRide App</h1>
    <Login />
    <RideForm />
    <RideList />
    <Map />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
