import React, { useState } from 'react';
import { LayoutDashboard, Zap } from 'lucide-react';
import Counter from './components/Counter';
import ToDoList from './components/ToDoList';
import PlaceholderProject from './components/PlaceholderProject';
import DynamicWelcomeMessage from './components/DynamicWelcomeMessage';
import Accordion from './components/AccordionItem';
import ImageCarousel from './components/ImageCarousel';
import SimpleCalculatorUI from './components/SimpleCalculatorUI';
import RecipeCard from './components/RecipeCard';

interface ProjectProps {
  onGoBack: () => void;
  title?: string;
}

interface ProjectManifest {
  id: string;
  title: string;
  component: React.FC<ProjectProps>;
  description?: string;
}


function App() {
  const [activeProject, setActiveProject] = useState<'dashboard' | string>('dashboard');

  const projects: ProjectManifest[] = [
    {
      id: 'counter',
      title: '1. Simple Counter App',
      component: Counter,
      description: 'A project demonstrating the core useState hook.'
    },
    {
      id: 'todo',
      title: '2. To-Do List',
      component: ToDoList,
      description: 'Your next project for list management and arrays in state.'
    },
    {
      id: 'dynamicwelcome',
      title: '3. Dynamic Welcome',
      component: DynamicWelcomeMessage,
      description: 'A project for handling complex logic and input.'
    },
    {
      id: 'accordion',
      title: '4. Accordion',
      component: Accordion,
      description: 'A project for handling complex logic and input.'
    },
    {
      id: 'carousel',
      title: '5. Image Carousel',
      component: ImageCarousel,
      description: 'A project for handling complex logic and input.'
    },
    {
      id: 'calculator',
      title: '6. Simple Calculator UI',
      component: SimpleCalculatorUI,
      description: 'A project for handling complex logic and input.'
    },
    {
      id: 'recipecard',
      title: '7. Recipe Card',
      component: RecipeCard,
      description: 'A project for handling complex logic and input.'
    },
    {
      id: 'placeholder',
      title: 'Placeholder Project',
      component: PlaceholderProject,
      description: 'A project for handling complex logic and input.'
    },
  ];

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
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg h-full">

          <h2 className="text-3xl font-bold text-indigo-700 mb-6 font-serif flex items-center">
            <Zap className="mr-3 w-6 h-6" /> {project.title}
          </h2>
          <ProjectComponent
            onGoBack={() => setActiveProject('dashboard')}
          />
        </div>
      );
    }

    return renderDashboard();
  };



  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-start pt-16 p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-extrabold text-white text-center mb-10">
          React Project List
        </h1>

        <div className="min-h-[400px]">
          {renderContent()}
        </div>
      </div>
    </div>)
}

export default App;