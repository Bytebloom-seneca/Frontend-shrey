import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import './App.css';

const Root = () => (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ✅ React 17 compatible render method
ReactDOM.render(<Root />, document.getElementById('root'));
