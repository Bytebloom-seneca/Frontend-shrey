# Seneca Ride App

A modern, React-based ride-sharing application designed for the Seneca College community. The app facilitates carpooling by connecting drivers offering rides with passengers seeking transportation.

## 🚀 Features

- **User Authentication**: Secure login/signup with session persistence
- **Ride Management**: Create, search, and book rides
- **Real-time Communication**: Chat system for driver-passenger interaction
- **User Profiles**: Enhanced profile management with ratings and reviews
- **Admin Dashboard**: Administrative panel for system management
- **Mobile Responsive**: Optimized for all devices
- **Modern UI**: Enhanced with animations and interactive effects

## 🛠 Tech Stack

- **Frontend**: React 17.0.2
- **Routing**: React Router DOM 5.3.4
- **Maps**: Leaflet 1.9.4 with React-Leaflet 3.2.5
- **Backend**: Firebase 11.9.0
- **Styling**: Custom CSS with modern animations
- **Build Tool**: React Scripts 5.0.1

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd seneca-ride-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the src directory with your Firebase configuration:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
```

4. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🧪 Testing

Run the test suite:
```bash
npm test
```

For regression testing, refer to `docs/bugs/test-cases/regression-tests.md`

## 📋 Quality Assurance

Before deploying, ensure all items in `docs/bugs/qa-checklist.md` are completed.

## 🐛 Bug Reports

- Bug reports and QA documentation: `docs/bugs/`
- Known issues: `docs/bugs/known-issues.md`
- Test cases: `docs/bugs/test-cases/`

## 🚀 Deployment

### GitHub Deployment

1. Ensure all tests pass
2. Follow commit message guidelines in `docs/COMMIT_GUIDELINES.md`
3. Push to GitHub with linked commit messages

Example commit:
```bash
git add .
git commit -m "Fix: Authentication state persistence #001"
git push origin main
```

### Production Build

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── App.js                 # Main application component
│   ├── Login.js & Signup.js   # Authentication
│   ├── RideList.jsx           # Ride management
│   ├── UserProfile.js         # Profile management
│   ├── ChatModal.jsx          # Communication
│   ├── MapView.jsx            # Location services
│   └── AdminDashboard.jsx     # Administration
├── firebase.js                # Firebase configuration
└── index.js                   # Application entry point
```

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Create production build
- `npm run eject` - Eject from Create React App

## 🤝 Contributing

1. Follow the commit message guidelines in `docs/COMMIT_GUIDELINES.md`
2. Ensure all tests pass before submitting
3. Update documentation as needed
4. Reference issue numbers in commit messages

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For issues and support:
1. Check `docs/bugs/known-issues.md` for known problems
2. Create a new issue using the template in `docs/bugs/README.md`
3. Follow the QA checklist for testing

## 🎯 Current Status

✅ **Production Ready** - All major features implemented and tested
- Complete authentication system
- Full ride-sharing functionality
- Real-time communication
- Admin capabilities
- Mobile-responsive design
- Comprehensive test coverage
