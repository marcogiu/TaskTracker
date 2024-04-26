import logo from "../assets/logoTaskTracker.png";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 h-[10vh]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-[8vh] w-auto" />
          </div>

          {/* Informazioni aggiuntive o testo */}
          <div className="text-white text-center md:text-left mt-4 md:mt-0">
            <p className="mb-2">Informazioni aggiuntive qui...</p>
            <p className="text-sm">© {new Date().getFullYear()} Il Tuo Nome</p>
          </div>

          {/* Social links o altro */}
          <div className="flex mt-4 md:mt-0">
            <a href="#" className="text-white hover:text-gray-300 mx-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300 mx-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300 mx-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
