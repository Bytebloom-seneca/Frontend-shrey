# Regression Test Cases

## Authentication Tests

### Test Case #001 - User Login
**Test Name**: Successful user login with valid credentials  
**Preconditions**: User account exists in the system  
**Test Steps**:
1. Navigate to login page
2. Enter valid email address
3. Enter correct password
4. Click "Login" button

**Expected Result**: User is redirected to main dashboard, authentication state is set  
**Status**: ✅ Pass  
**Related Issue**: #001

### Test Case #002 - User Registration
**Test Name**: New user registration with valid data  
**Preconditions**: Email address not already registered  
**Test Steps**:
1. Navigate to signup page
2. Fill in all required fields with valid data
3. Submit registration form

**Expected Result**: User account created, automatic login, redirect to dashboard  
**Status**: ✅ Pass  
**Related Issue**: #004

### Test Case #003 - Session Persistence
**Test Name**: User session persists after browser refresh  
**Preconditions**: User is logged in  
**Test Steps**:
1. Login successfully
2. Refresh browser page
3. Check authentication state

**Expected Result**: User remains logged in after refresh  
**Status**: ✅ Pass  
**Related Issue**: #001

## Ride Management Tests

### Test Case #004 - Create Ride Posting
**Test Name**: Driver creates new ride posting  
**Preconditions**: User is logged in as driver  
**Test Steps**:
1. Navigate to "Post a Ride" section
2. Fill in origin, destination, date, time, seats, price
3. Submit ride posting form

**Expected Result**: Ride appears in ride list, confirmation message shown  
**Status**: ✅ Pass  
**Related Issue**: #002

### Test Case #005 - Search Rides
**Test Name**: Passenger searches for available rides  
**Preconditions**: Rides exist in the system  
**Test Steps**:
1. Navigate to ride search
2. Enter search criteria (origin, destination, date)
3. Click search button

**Expected Result**: Matching rides displayed in list format  
**Status**: ✅ Pass  
**Related Issue**: #002

### Test Case #006 - Book Ride
**Test Name**: Passenger books an available ride  
**Preconditions**: Available rides exist, user is logged in  
**Test Steps**:
1. Search for rides
2. Select a ride with available seats
3. Click "Book Ride" button
4. Confirm booking

**Expected Result**: Booking confirmed, seat count decreases, booking appears in "My Bookings"  
**Status**: ✅ Pass  
**Related Issue**: #002

## UI/UX Tests

### Test Case #007 - Mobile Responsiveness
**Test Name**: App displays correctly on mobile devices  
**Preconditions**: Access app from mobile device  
**Test Steps**:
1. Open app on mobile browser
2. Navigate through different pages
3. Test form interactions
4. Check button accessibility

**Expected Result**: All elements display properly, touch interactions work  
**Status**: ✅ Pass  
**Related Issue**: #003

### Test Case #008 - Form Validation
**Test Name**: Form validation prevents invalid submissions  
**Preconditions**: Navigate to any form (login, signup, ride posting)  
**Test Steps**:
1. Leave required fields empty
2. Enter invalid email format
3. Enter passwords that don't match
4. Attempt to submit form

**Expected Result**: Appropriate error messages shown, form not submitted  
**Status**: ✅ Pass  
**Related Issue**: #004

## Communication Tests

### Test Case #009 - Chat Functionality
**Test Name**: Users can communicate through chat modal  
**Preconditions**: Two users exist, ride booking in progress  
**Test Steps**:
1. Open chat modal from ride details
2. Send a message
3. Check message appears in chat history
4. Close and reopen chat

**Expected Result**: Messages send successfully, history persists during session  
**Status**: ✅ Pass  

### Test Case #010 - Review System
**Test Name**: Users can leave reviews for drivers  
**Preconditions**: Completed ride booking exists  
**Test Steps**:
1. Navigate to driver profile
2. Click "Leave Review"
3. Select rating and enter review text
4. Submit review

**Expected Result**: Review appears on driver profile, rating updates  
**Status**: ✅ Pass  

## Data Persistence Tests

### Test Case #011 - Local Storage Persistence
**Test Name**: User data persists in localStorage  
**Preconditions**: User performs actions (login, create ride, book ride)  
**Test Steps**:
1. Perform various app actions
2. Close browser completely
3. Reopen browser and navigate to app
4. Check if data is still available

**Expected Result**: User session, ride data, and bookings persist  
**Status**: ✅ Pass  
**Related Issue**: #001, #002

## Admin Tests

### Test Case #012 - Admin Dashboard Access
**Test Name**: Admin can access administrative features  
**Preconditions**: User has admin privileges  
**Test Steps**:
1. Login with admin account
2. Navigate to admin dashboard
3. Check access to user management
4. Check access to ride management

**Expected Result**: Admin dashboard loads, all admin features accessible  
**Status**: ✅ Pass  

## Performance Tests

### Test Case #013 - Page Load Times
**Test Name**: App pages load within acceptable timeframes  
**Preconditions**: Standard internet connection  
**Test Steps**:
1. Navigate to different app pages
2. Measure load times
3. Check for console errors

**Expected Result**: Pages load within 3 seconds, no critical errors  
**Status**: ✅ Pass  

## Browser Compatibility Tests

### Test Case #014 - Cross-Browser Functionality
**Test Name**: App works across different browsers  
**Preconditions**: Access to Chrome, Firefox, Safari  
**Test Steps**:
1. Test core functionality in each browser
2. Check UI rendering
3. Verify JavaScript functionality

**Expected Result**: Consistent behavior across all browsers  
**Status**: ✅ Pass  
**Related Issue**: #003
