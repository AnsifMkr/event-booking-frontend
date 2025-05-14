import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const username = localStorage.getItem("username");
  const isAdmin = localStorage.getItem("is_admin") === "true";

  const linkClass = (path) =>
    `px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition ${
      location.pathname === path ? "bg-blue-600 text-white" : "text-gray-700"
    }`;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:underline">Eventify.</Link>

        <div className="flex space-x-4">
          <Link className={linkClass("/")} to="/">Events</Link>
          <Link className={linkClass("/bookings")} to="/my-bookings">My Bookings</Link>

          {/* ✅ Show Add Event only for admin */}
          {isAdmin && (
            <Link className={linkClass("/admin/create-event")} to="/admin/create-event">
              Add Event
            </Link>
          )}

          {/* ✅ If logged in, show logout, else show login/register */}
          {!username ? (
            <>
              <Link className={linkClass("/login")} to="/login">Login</Link>
              <Link className={linkClass("/register")} to="/register">Sign Up</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;