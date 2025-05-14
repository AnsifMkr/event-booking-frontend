import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  // Check if user already logged in
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const token = localStorage.getItem('access_token');
    if (storedUsername && token) {
      setLoggedInUser(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    API.post('/api/token/', { username, password })
      .then(res => {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('is_admin', res.data.is_admin);
        setLoggedInUser(res.data.username);
        setIsLoggedIn(true);
      })
      .catch(() => alert('⚠️ Invalid credentials'));
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  if (isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="p-8 border rounded-lg shadow-md w-96 space-y-4 text-center">
          <h2 className="text-2xl font-bold text-green-700">✅ You are logged in</h2>
          <p className="text-lg">Thank you, <strong>{loggedInUser}</strong>!</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleLogin} className="p-8 border rounded-lg shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
          className="w-full p-2 border rounded"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;