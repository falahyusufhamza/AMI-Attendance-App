import './App.css';


import AttendancePage from './components/AttendancePage';

import { Route, Routes } from 'react-router';
import { Home } from './components/home/Home';
import CustomFooter from './components/Layout/Footer';
import { Login } from './components/login/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UserProfile } from './components/user-profile/UserProfile';
import { CustomLayout } from './components/Layout/CustomLayout';
import { UserProvider } from './UserContext';
import { useState } from 'react';


function App() {
  const [classAttendanceDetails, setClassAttendanceDetails] = useState({});
  return <UserProvider>     
  <Routes>
        <Route path="/attendance-page" element={<ProtectedRoute>
          <CustomLayout>
          <AttendancePage classAttendanceDetails={classAttendanceDetails} /><CustomFooter/></CustomLayout></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute><CustomLayout hasHeader title='User Profile'><UserProfile /></CustomLayout></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><CustomLayout><Home setClassAttendanceDetails={setClassAttendanceDetails} /></CustomLayout></ProtectedRoute>} />
        <Route path="/login" element={<ProtectedRoute isLoginPage={true}><Login/> </ProtectedRoute>} />
      </Routes>
      </UserProvider>
}

export default App;
