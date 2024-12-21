import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventManagementPage from './components/EventManagementPage';
import AttendeeManagementPage from './components/AttendeeManagementPage';
import TaskPage from './components/TaskPage';
import Login from './components/Login';
import { userTypeContext } from './context/context';
import AdminLogin from './components/adminLogin';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

const App = () => {

  const [userType, setUserType] = React.useState('admin');

  return (
    <>
      <userTypeContext.Provider value={{ userType, setUserType }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/events" element={<EventManagementPage />} />
            <Route path="/attendees" element={<AttendeeManagementPage />} /> */}
            {/* <Route path="/task/:id" element={<TaskPage />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
          </Routes>
        </Router>
      </userTypeContext.Provider>
    </>
  );
};

export default App;
