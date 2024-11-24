import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthForm from "./components/AuthForm";
import ProjectList from "./components/ProjectList";
import AddProjectForm from "./components/AddProjectForm";

const App = () => {
  const [user, setUser] = useState(null); // Track logged-in user
  const [projects, setProjects] = useState([]); // Track all projects
  const [error, setError] = useState(""); // Track errors

  // Fetch all projects after login
  const fetchProjects = async () => {
    try {
      const response = await axios.get("/api/projects");
      setProjects(response.data);
    } catch (err) {
      console.error("Error fetching projects:", err.message);
      setError("Failed to load projects.");
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      setProjects([]);
    } catch (err) {
      console.error("Error logging out:", err.message);
    }
  };

  return (
    <div>
      <h1>Portfolio Builder</h1>
      {!user ? (
        <AuthForm setUser={setUser} />
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <h2>Welcome, {user.username}</h2>
          <AddProjectForm fetchProjects={fetchProjects} />
          <ProjectList
            projects={projects}
            fetchProjects={fetchProjects}
            setError={setError}
          />
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default App;
