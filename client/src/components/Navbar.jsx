import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    navigate('/');
    alert("Kijelentkeztél!");
  };

  return (
    <nav className="bg-gray-800 py-4 px-6 flex justify-between items-center w-full pl-20 pr-20 fixed top-0 z-50 shadow-custom">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>
      </div>
      <div className="flex items-center">
        {!user ? (
          <>
            <Link
              to="/register"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-5 py-2 text-sm font-medium"
            >
              Regisztráció
            </Link>
            <Link
              to="/login"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-5 py-2 text-sm font-medium"
            >
              Bejelentkezés
            </Link>
          </>
        ) : (
          <>
            <Link
              to={`/users/${user.user.id}`}
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-5 py-2 text-sm font-medium"
            >
              Profilom
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-5 py-2 text-sm font-medium"
            >
              Kijelentkezés
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
