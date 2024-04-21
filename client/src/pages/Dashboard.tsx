import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Task } from "../store/types";

export const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating fetching tasks
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks"); // Adjust the URL to your API
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  const handleSignOut = () => {
    // Logic to handle sign out
    localStorage.removeItem("userToken"); // example of removing user token
    navigate("/login");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Tasks</h1>
        <button
          onClick={handleSignOut}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign Out
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
