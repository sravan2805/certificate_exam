import React from "react";
import axios from "axios";

const ProjectList = ({ projects, fetchProjects, setError }) => {
  const deleteProject = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err.message);
      setError("Failed to delete the project.");
    }
  };

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Deadline: {project.deadline}</p>
            <button onClick={() => deleteProject(project._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
