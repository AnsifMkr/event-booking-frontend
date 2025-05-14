import { useEffect, useState } from 'react';
import API from '../api';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/api/my-bookings/')
      .then(res => setBookings(res.data))
      .catch(err => console.error('Failed to fetch bookings:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading your bookings...</p>;

  if (bookings.length === 0) return <p className="text-center mt-10">You have no bookings yet.</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map(booking => {
        const event = booking.event;
        return (
          <div key={booking.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
            {event.image && (
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Booked at:</strong> {new Date(booking.booked_at).toLocaleString()}</p>
          </div>
        );
      })}
    </div>
  );
}

export default MyBookings;
