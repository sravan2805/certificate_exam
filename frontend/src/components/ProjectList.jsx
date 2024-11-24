import React, { useEffect, useState } from 'react';
import API from '../api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await API.get('/projects');
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error.message);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div>
      <h2>Project List</h2>
      {projects.map((project) => (
        <div key={project._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
