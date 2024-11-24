// src/controllers/projectController.js
import Project from '../models/Project.js';

// Create a project
export const createProject = async (req, res) => {
  const { title, description, deadline } = req.body;
  try {
    const newProject = await Project.create({ title, description, deadline });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, deadline } = req.body;
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, deadline },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};
