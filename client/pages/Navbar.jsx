import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const onStorageChange = () => {
      const savedUser = localStorage.getItem("user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener("storage", onStorageChange);
    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-[#268740] text-white flex justify-between items-center px-6 py-6 shadow-lg">
      <Link to="/" className="text-2xl font-bold">
        Missme
      </Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link
              to="/admin"
              className="bg-white text-[#268740] px-4 py-1 rounded font-medium"
            >
              Admin Dashboard
            </Link>
            <button
              onClick={logout}
              className="bg-white text-[#268740] px-4 py-1 rounded font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="border-2 text-white bg-[#8a5a44] px-4 py-2 rounded-lg"
            >
              Login
            </Link>
            <Link
              to="/"
              className="border-2 text-white bg-[#8a5a44] px-4 py-2 rounded-lg"
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
