import React, { useState } from 'react';

// Mock users and reports for demo
const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@seneca.ca', role: 'Admin' },
  { id: 2, name: 'John Doe', email: 'john.doe@seneca.ca', role: 'Driver' },
  { id: 3, name: 'Jane Smith', email: 'jane.smith@seneca.ca', role: 'Passenger' },
];
const mockReports = [
  { id: 1, type: 'User', target: 'Jane Smith', reason: 'Spam', status: 'Open' },
  { id: 2, type: 'Ride', target: 'Toronto → Seneca Newnham', reason: 'Inappropriate content', status: 'Resolved' },
];

const AdminDashboard = ({ user, rides, setRides }) => {
  const [tab, setTab] = useState('users');

  // Analytics
  const totalRides = rides.length;
  const totalUsers = mockUsers.length;
  const totalBookings = rides.reduce((sum, r) => sum + (r.initialSeats ? r.initialSeats - r.seats : 0), 0);

  // Ride management
  const handleDeleteRide = (rideId) => {
    setRides(prev => prev.filter(r => r.id !== rideId));
  };

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: 32 }}>
      <h2 style={{ marginBottom: 24 }}>Admin Dashboard</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <button onClick={() => setTab('users')} style={{ fontWeight: tab === 'users' ? 'bold' : 'normal' }}>Users</button>
        <button onClick={() => setTab('rides')} style={{ fontWeight: tab === 'rides' ? 'bold' : 'normal' }}>Rides</button>
        <button onClick={() => setTab('reports')} style={{ fontWeight: tab === 'reports' ? 'bold' : 'normal' }}>Reports</button>
        <button onClick={() => setTab('analytics')} style={{ fontWeight: tab === 'analytics' ? 'bold' : 'normal' }}>Analytics</button>
      </div>
      {tab === 'users' && (
        <div>
          <h3>All Users</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === 'rides' && (
        <div>
          <h3>All Rides</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th>From</th>
                <th>To</th>
                <th>Date</th>
                <th>Time</th>
                <th>Price</th>
                <th>Seats</th>
                <th>Driver</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rides.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td>{r.from}</td>
                  <td>{r.to}</td>
                  <td>{r.date}</td>
                  <td>{r.time}</td>
                  <td>${r.price}</td>
                  <td>{r.seats}</td>
                  <td>{r.driver}</td>
                  <td><button onClick={() => handleDeleteRide(r.id)} style={{ color: 'red' }}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === 'reports' && (
        <div>
          <h3>Reports</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th>Type</th>
                <th>Target</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockReports.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td>{r.type}</td>
                  <td>{r.target}</td>
                  <td>{r.reason}</td>
                  <td>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === 'analytics' && (
        <div>
          <h3>Analytics</h3>
          <div style={{ display: 'flex', gap: 32, marginBottom: 24 }}>
            <div style={{ background: '#f8f9fa', borderRadius: 10, padding: 18, minWidth: 120 }}>
              <div style={{ fontSize: 22, fontWeight: 'bold' }}>{totalRides}</div>
              <div>Total Rides</div>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: 10, padding: 18, minWidth: 120 }}>
              <div style={{ fontSize: 22, fontWeight: 'bold' }}>{totalUsers}</div>
              <div>Total Users</div>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: 10, padding: 18, minWidth: 120 }}>
              <div style={{ fontSize: 22, fontWeight: 'bold' }}>{totalBookings}</div>
              <div>Total Bookings</div>
            </div>
          </div>
          {/* You can add more analytics and charts here */}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 