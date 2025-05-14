import { useState, useEffect } from 'react';
import API from '../api';

function EventCard({ event, onBook }) {
  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition hover:scale-[1.02] hover:shadow-2xl font-sans">
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-52 object-cover"
        />
      )}
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
        <p className="text-gray-600 text-sm">{event.description}</p>

        <div className="text-sm space-y-1 text-gray-700">
          <p>
            📍 <span className="font-medium">Location:</span> {event.location}
          </p>
          <p>
            📅 <span className="font-medium">Date:</span>{' '}
            {new Date(event.date).toLocaleDateString()}
          </p>
          <p>
            ⏰ <span className="font-medium">Time:</span>{' '}
            {event.time || '—'}
          </p>
          <p>
            🎟️ <span className="font-medium">Available Seats:</span>{' '}
            {event.available_seats}
          </p>
        </div>

        <button
          onClick={() => onBook(event.id)}
          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/api/events/')
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleBook = (eventId) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('⚠️ Login required');
      return;
    }

    API.post('/api/book-event/', { event: eventId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => alert('🎉 Event booked!'))
      .catch(() => alert('⚠️ Login required or no seats left'));
  };

  if (loading) return <p className="text-center mt-10 font-sans">Loading events...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onBook={handleBook} />
      ))}
    </div>
  );
}

export default EventList;
