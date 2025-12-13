import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { RotateCcw } from 'lucide-react';
interface ProjectProps {
    onGoBack: () => void;
    title?: string;
}

interface AccordionItemProps {
    title: string;
    content: React.ReactNode; 
    id: number;
    isOpen: boolean;
    onToggle: (id: number) => void;
}



// 1. Individual Accordion Item Component
const AccordionItem: React.FC<AccordionItemProps> = ({ 
    title, 
    content, 
    id, 
    isOpen, 
    onToggle 
}) => {
    return (
        <div className="border border-gray-200 rounded-lg shadow-sm mb-2 overflow-hidden width-100">
            {/* Header: Clickable to toggle content */}
            <button
                className="flex justify-between items-center w-full p-4 text-left font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => onToggle(id)}
                aria-expanded={isOpen}
                aria-controls={`content-${id}`}
            >
                {title}
                {/* Conditional Rendering: Show up or down icon */}
                {isOpen ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
            </button>

            {/* Content: Conditionally rendered based on 'isOpen' state */}
            {isOpen && (
                <div 
                    id={`content-${id}`}
                    className="p-4 bg-white transition-all duration-300 ease-in-out"
                >
                    {content}
                </div>
            )}
        </div>
    );
};

// 2. Main Accordion Container Component
const Accordion: React.FC<ProjectProps> = ({onGoBack}) => {
    // Data structure for the accordion content
    const accordionData = [
        {
            id: 1,
            title: "What is React?",
            content: "React is a JavaScript library for building user interfaces, often described as the View layer in an MVC architecture. It uses a component-based model."
        },
        {
            id: 2,
            title: "How does useState work?",
            content: (
                <div>
                    <p>
                        The $useState$ Hook lets you add React state to function components. It returns an array with two values: 
                    </p>
                    <ol className="list-decimal list-inside mt-2 ml-4 space-y-1">
                        <li>The **current state value** (e.g., $isOpen$).</li>
                        <li>A **setter function** (e.g., $setOpen$) to update the state.</li>
                    </ol>
                    <p className="mt-2 text-sm text-indigo-600">
                        When the setter function is called, React re-renders the component.
                    </p>
                </div>
            )
        },
        {
            id: 3,
            title: "What is conditional rendering?",
            content: "Conditional rendering in React refers to the process of displaying different elements or components based on certain conditions (like a state variable). Here, we use the logical AND operator (&&) to show the content only if the item is open."
        }
    ];

    
    const [openItemId, setOpenItemId] = useState<number | null>(null);

    // Handler function to toggle the open state
    const handleToggle = (id: number) => {
        setOpenItemId(prevId => {
            // If the clicked item is already open, close it (set to null).
            if (prevId === id) {
                return null;
            }
            // Otherwise, open the clicked item (set to its ID).
            return id;
        });
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            
            {accordionData.map((item) => (
                <AccordionItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    content={item.content}
                    isOpen={openItemId === item.id}
                    onToggle={handleToggle}
                />
            ))}
             {/* Go Back Button */}
                        <button
                            onClick={onGoBack}
                            className="px-6 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition mt-4"
                        >
                            <RotateCcw className="inline w-4 h-4 mr-2" />
                            Back to Dashboard
                        </button>
            
        </div>
    );
};

export default Accordion;