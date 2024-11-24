import React from 'react';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';

const App = () => {
  return (
    <div>
      <h1>Portfolio Project Manager</h1>
      <ProjectForm />
      <ProjectList />
    </div>
  );
};

export default App;
