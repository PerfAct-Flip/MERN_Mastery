import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface ProjectProps {
    onGoBack: () => void;
    title?: string;
}

const DynamicWelcomeMessage : React.FC<ProjectProps> = ({onGoBack}) => {
    const [name,setName] =useState('');
    return (
    <> <div className='flex flex-col'> 
            <input 
                    type="text" 
                    name="Task" 
                    id="task"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter Task...'
                    className='grow text-gray-800 bg-gray-100 p-3  focus:outline-none ' 
                />
            <p className='p-4 '> Hello, {name? name :  "john"}! </p>
        </div>
        <button
            onClick={onGoBack}
            className="px-6 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
            <RotateCcw className="inline w-4 h-4 mr-2" />
            Back to Dashboard
        </button>
    </>
)};
export default DynamicWelcomeMessage;