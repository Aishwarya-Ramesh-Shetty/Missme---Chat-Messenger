import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-[#268740] text-white flex justify-between items-center px-6 py-6 shadow-lg">
      {/* Brand / Logo */}
      <Link to="/" className="text-2xl font-bold">
        Missme
      </Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-lg">Welcome, {user.name}!</span>

            {/* Admin Dashboard link - currently visible for all logged in users */}
            <Link
              to="/admin"
              className="border-2 border-white px-4 py-1 rounded font-medium hover:bg-white hover:text-[#268740] transition"
            >
              Admin Dashboard
            </Link>

            <button
              onClick={logout}
              className="bg-white text-[#268740] px-4 py-1 rounded font-medium hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="ml-20 border-2 text-[#FFFF] hover:bg-[#1f6a35] font-bold border-[#003d16] bg-[#8a5a44] px-4 py-2 rounded-lg"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="ml-20 border-2 text-[#FFFF] font-bold hover:bg-[#1f6a35] border-[#003d16] bg-[#8a5a44] px-4 py-2 rounded-lg"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
