import React, { useState } from 'react';
import API from '../api';

const ProjectForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !deadline) {
      alert('All fields are required!');
      return;
    }

    try {
      await API.post('/projects', { title, description, deadline });
      alert('Project created successfully');
      setTitle('');
      setDescription('');
      setDeadline('');
    } catch (error) {
      console.error('Error creating project:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
      <h2>Create a New Project</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Deadline:</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Project</button>
    </form>
  );
};

export default ProjectForm;
