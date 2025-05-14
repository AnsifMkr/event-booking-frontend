import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventList from './components/EventList';
import Login from './components/Login';  
import SignUp from './components/SignUp';
import MyBookings from './components/MyBookings';
import AdminAddEvent from './components/AdminAddEvent';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/login" element={<Login />} /> {/* Use Auth for login/register */}
        <Route path="/register" element={<SignUp />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin/create-event" element={<AdminAddEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
