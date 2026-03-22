import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Location Collision App</h1>
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "Quants", path: "/quants" },
          { name: "Testers", path: "/testers" },
          { name: "Casinos", path: "/casinos" },
          { name: "Accounts", path: "/accounts" },
          { name: "Locations", path: "/locations" },
          { name: "Actions", path: "/actions" },
          { name: "Availability", path: "/availability" },
        ].map((page) => (
          <button
            key={page.path}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
            onClick={() => navigate(page.path)}
          >
            {page.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;