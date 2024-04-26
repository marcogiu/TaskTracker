import { useState } from "react";
import { Login } from "../components/Login";
import { Signup } from "../components/Signup";

export const Home = (): JSX.Element => {
  const [tabActive, setTabActive] = useState<"login" | "signup">("login");

  return (
    <div className="flex h-[80vh]">
      {/* Left container with image */}
      <div className="w-1/2 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('https://your-image-url.com')` }}>
        <div className="p-4 bg-white bg-opacity-80 rounded">
          <h1 className="text-xl font-bold">Task Tracker</h1>
          <p>
            Gestisci i tuoi compiti efficacemente e migliora la tua produttività con Task Tracker.
          </p>
        </div>
      </div>

      {/* Right container with tabs */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="shadow-lg p-4 rounded-lg w-96">
          <div className="flex space-x-4 mb-4">
            <button className={`py-2 px-4 rounded-tl-lg ${tabActive === 'login' ? 'bg-gray-200' : 'bg-white'}`} onClick={() => setTabActive('login')}>
              Login
            </button>
            <button className={`py-2 px-4 rounded-tr-lg ${tabActive === 'signup' ? 'bg-gray-200' : 'bg-white'}`} onClick={() => setTabActive('signup')}>
              Signup
            </button>
          </div>
          {tabActive === 'login' ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
};
