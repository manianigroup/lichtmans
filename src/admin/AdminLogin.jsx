import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const adminUsername = "admin";
  const adminPassword = "Liquors@1234";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === adminUsername && password === adminPassword) {
      navigate("/admin/dashboard");
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <div className="flex justify-center items-start h-screen w-full bg-gray-100">
        <div className="bg-white p-8 my-15 rounded-lg shadow-md w-md h-100">
          <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
            Admin Login
          </h1>
          <p className="text-gray-600">Username <span className="text-rose-800">*</span></p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full focus:outline-none focus-within:ring-2 focus-within:ring-rose-800 focus-within:border-transparent"
            placeholder="Enter username"
            required
          />
          <p className="text-gray-600">Password <span className="text-rose-800">*</span></p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full focus:outline-none focus-within:ring-2 focus-within:ring-rose-800 focus-within:border-transparent"
            placeholder="Enter password"
            required
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex flex-col justify-center">
            <button
              type="submit"
              className="bg-rose-800 text-white mb-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 ease-in-out hover:bg-rose-900 hover:scale-105 hover:shadow-md w-full mt-2 focus-within:border-transparent"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/")}
              type="button" 
              className="bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 ease-in-out hover:bg-gray-500 hover:scale-105 hover:shadow-md w-full mt-2 focus-within:border-transparent">
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdminLogin;
