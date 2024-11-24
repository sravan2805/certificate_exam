import React, { useState } from "react";
import axios from "axios";

const AddProjectForm = ({ fetchProjects }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/projects", { title, description, deadline });
      fetchProjects();
      setTitle("");
      setDescription("");
      setDeadline("");
    } catch (err) {
      console.error("Error adding project:", err.message);
    }
  };

  return (
    <div>
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default AddProjectForm;
