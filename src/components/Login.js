import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './Auth.css';
import Iridescence from './Iridescence';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Mock authentication - in real app, this would be an API call
      if (formData.email && formData.password) {
        const userData = {
          id: Date.now(),
          email: formData.email,
          name: formData.email.split('@')[0], // Use email prefix as name
          createdAt: new Date().toISOString(),
          role: 'Passenger', // Default role
          phone: '',
          bio: 'A driver',
          rating: '5.0',
          memberSince: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
          }),
          ridesGiven: 0,
          ridesTaken: 0,
          profilePic: null
        };
        
        onLogin(userData);
        history.push('/');
      } else {
        setError('Invalid credentials. Please try again.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-page" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <Iridescence color={[0.7,0.8,1]} amplitude={0.12} speed={0.7} mouseReact={false} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }} />
      <div className="auth-card" style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{ textAlign: 'center', color: '#764ba2', fontWeight: 900, fontSize: 32, marginTop: 0, marginBottom: 12, letterSpacing: 2, textShadow: '0 2px 16px rgba(120,80,200,0.18)' }}>Seneca Rides</h1>
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your SenecaRide account</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
          </p>
          <p>
            <Link to="/forgot-password" className="auth-link">Forgot password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
