import { useState } from 'react';
import API from '../api';

function AdminAddEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('location', location);
    if (image) {
      formData.append('image', image);
    }

    API.post('/api/create-event/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setSuccess('✅ Event added successfully!');
        setTitle('');
        setDescription('');
        setDate('');
        setTime('');
        setLocation('');
        setImage(null);
      })
      .catch(() => {
        setSuccess('❌ Failed to add event.');
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2 rounded" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea className="w-full border p-2 rounded" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <input className="w-full border p-2 rounded" type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <input className="w-full border p-2 rounded" type="time" value={time} onChange={e => setTime(e.target.value)} required />
        <input className="w-full border p-2 rounded" type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
        <input className="w-full p-2 border rounded" type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Add Event</button>
      </form>
      {success && (
        <p className={`mt-4 ${success.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {success}
        </p>
      )}
    </div>
  );
}

export default AdminAddEvent;
