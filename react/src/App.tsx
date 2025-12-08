import React, { useState } from 'react';
import { LayoutDashboard, Zap, Info, RotateCcw } from 'lucide-react';

// ===============================================================
// 1. TYPE DEFINITIONS
// ===============================================================

interface ProjectProps {
  // Function passed down from App to navigate back to the dashboard
  onGoBack: () => void;
  // Title for the component (optional)
  title?: string; 
}

interface ProjectManifest {
  id: string;
  title: string;
  // Component property stores the function reference (React.FC is a functional component type)
  component: React.FC<ProjectProps>;
  description: string;
}


// ===============================================================
// 2. MODULE: Simple Counter Project (Your specified component logic)
// ===============================================================
const CounterProject: React.FC<ProjectProps> = ({ onGoBack }) => {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    setCount(c => c + 1);
  }
  
  const handleDecrement = () => {
    setCount(c => c - 1);
  }
  
  const handleReset = () => {
    setCount(0);
  }

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg h-full">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 font-serif flex items-center">
        <Zap className="mr-3 w-6 h-6" /> Simple Counter App
      </h2>
      
      <div className="mb-8 flex-grow flex items-center">
        <span 
          className={`text-8xl font-black transition-colors duration-300 
            ${count === 0 ? 'text-gray-400' : 
             count > 0 ? 'text-green-500' : 
             'text-red-500'}`}
        >
          {count}
        </span>
      </div>

      <div className="flex flex-wrap justify-center gap-3 w-full mb-6">
        <button
          onClick={handleDecrement}
          className='flex-1 min-w-[100px] px-4 py-2 text-base font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition duration-150 ease-in-out transform hover:scale-[1.02]'
        > 
          -
        </button>
        
        <button
          onClick={handleReset}
          className='flex-1 min-w-[100px] px-4 py-2 text-base font-semibold text-gray-800 bg-yellow-400 rounded-lg shadow-md hover:bg-yellow-500 transition duration-150 ease-in-out transform hover:scale-[1.02]'
        >
          Reset
        </button>
        
        <button
          onClick={handleIncrement}
          className='flex-1 min-w-[100px] px-4 py-2 text-base font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out transform hover:scale-[1.02]'
        >
          +
        </button>
      </div>

      <button
        onClick={onGoBack}
        className="w-full px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
      >
        <RotateCcw className="inline w-4 h-4 mr-2" />
        Back to Dashboard
      </button>
    </div>
  );
};

// ===============================================================
// 3. MODULE: Placeholder Project
// ===============================================================
const PlaceholderProject: React.FC<ProjectProps> = ({ onGoBack, title }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg h-full min-h-[300px]">
    <Info className="w-12 h-12 text-gray-400 mb-4" />
    <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
    <p className="text-gray-500 mb-8 text-center">
      This is an empty module, ready for your next self-contained project!
    </p>
    <button
      onClick={onGoBack}
      className="px-6 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
    >
      <RotateCcw className="inline w-4 h-4 mr-2" />
      Back to Dashboard
    </button>
  </div>
);


// ===============================================================
// 4. MAIN APP: The Project Dashboard (Internal Router)
// ===============================================================

function App() {
  // TypeScript enforces that activeProject is either 'dashboard' or a string
  const [activeProject, setActiveProject] = useState<'dashboard' | string>('dashboard');


  // Defines all your separate 'pages' or projects.
  const projects: ProjectManifest[] = [
    {
      id: 'counter',
      title: '1. Simple Counter App',
      // CORRECT: Store the component function reference, not JSX.
      component: CounterProject,
      description: 'A project demonstrating the core useState hook.'
    },
    {
      id: 'todo',
      title: '2. To-Do List Project',
      component: PlaceholderProject, // Using the Placeholder component
      description: 'Your next project for list management and arrays in state.'
    },
    {
      id: 'calculator',
      title: '3. Calculator Project',
      component: PlaceholderProject, // Using the Placeholder component
      description: 'A project for handling complex logic and input.'
    },
  ];

    // TypeScript function signature for better type safety
    const handleLaunchProject = (projectId: string) => {
      setActiveProject(projectId);
    };


  const renderDashboard = () => (
    <div className="bg-white p-8 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center">
        <LayoutDashboard className="mr-3 w-7 h-7 text-indigo-600" /> Project Dashboard
      </h2>
      <p className="text-gray-600 mb-8">
        Click a project below to launch that separate application module.
      </p>

      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id}>
            <button
              onClick={() => handleLaunchProject(project.id)}
              className="w-full text-left p-4 bg-gray-50 hover:bg-indigo-50 border border-gray-200 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-200"
            >
              <span className="block text-xl font-semibold text-indigo-700">
                {project.title}
              </span>
              <span className="block text-sm text-gray-500 mt-1">
                {project.description}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

    const renderContent = () => {
    if (activeProject === 'dashboard') {
      return renderDashboard();
    }

    const project = projects.find(p => p.id === activeProject);

    if (project) {
      // Retrieve the component function reference
      const ProjectComponent = project.component; 
      
      // Render the component and pass the required props
      return (
        <ProjectComponent 
          onGoBack={() => setActiveProject('dashboard')} 
          title={project.title}
        />
      );
    }
    
    return renderDashboard();
  };


  
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-start pt-16 p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-extrabold text-white text-center mb-10">
          Your Modular Project Portfolio
        </h1>

        <div className="min-h-[400px]">
          {renderContent()}
        </div>
      </div>
    </div>)
}

export default App;