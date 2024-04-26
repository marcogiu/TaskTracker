import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logoTaskTracker.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-green-600 h-[10vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={logo} alt="TaskTracker Logo" className="h-[10vh] w-auto" />
          </Link>
        </div>
        <div className="text-white text-2xl font-bold">TaskTracker</div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none focus:ring-2 focus:ring-white">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} md:block`}>
          <ul className="flex space-x-4">
            <li>
              <Link to={"/login"} className="text-white hover:text-gray-300">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-white hover:text-gray-300">
                Signup
              </Link>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                Servizi
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                Contatti
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
