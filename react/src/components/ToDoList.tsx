import { Info, RotateCcw, Trash2, CheckCircle, Circle } from 'lucide-react';
import { useState } from 'react';

// --- Interfaces ---
interface ProjectProps {
    onGoBack: () => void;
    title?: string;
}

interface ToDoItem {
    id: number; // Simple numeric ID for local state
    text: string;
    completed: boolean;
}

// --- Component ---
const ToDoList: React.FC<ProjectProps> = ({ onGoBack}) => {
    // State variables MUST be defined INSIDE the functional component
    const [task, setTask] = useState<string>("");
    const [list, setList] = useState<ToDoItem[]>([]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    };

    const handleAddTodo = () => {
        const text = task.trim();
        if (text === '') {
            return; // Prevent adding empty tasks
        }

        const newTodo: ToDoItem = {
            id: Date.now(), // Simple unique ID using timestamp
            text: text,
            completed: false,
        };

        // Add new task to the front of the list
        setList((prevList) => [newTodo, ...prevList]);
        setTask('');
    }

    const handleToggleTodo = (id: number) => {
        setList((prevList) =>
            prevList.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }

    const handleDeleteTodo = (id: number) => {
        // Filter out the todo item with the matching id
        setList((prevList) => prevList.filter((todo) => todo.id !== id));
    }


    return (
        <>
           
            <div className="flex mb-8 w-full max-w-md">
                <input
                    type="text"
                    name="Task"
                    id="task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='Enter Task...'
                    className='grow text-gray-800 bg-gray-100 p-3 rounded-l-xl focus:outline-none '
                />
                <button
                    onClick={handleAddTodo}
                    className='bg-green-500 text-white font-bold px-4 py-3 rounded-r-xl hover:bg-green-600 transition duration-150'
                >
                    +
                </button>
            </div>

            {/* To-Do List */}
            <div className="w-full max-w-md mb-8">
                <ul className="divide-y divide-gray-200 bg-white rounded-xl shadow-inner">
                    {list.length === 0 ? (
                        <p className="p-4 text-center text-gray-500 flex items-center justify-center">
                            <Info className="w-4 h-4 mr-2" />
                            No tasks yet!
                        </p>
                    ) : (
                        list.map((todo) => (
                            <li
                                key={todo.id}
                                className={`flex items-center justify-between p-3 transition-all duration-300 rounded-lg 
                                ${todo.completed ? 'bg-green-50' : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center grow min-w-0" onClick={() => handleToggleTodo(todo.id)}>
                                    <button className="mr-3 text-lg p-1">
                                        {todo.completed ? (
                                            <CheckCircle className="w-6 h-6 text-green-500" />
                                        ) : (
                                            <Circle className="w-6 h-6 text-gray-400 hover:text-green-500 transition" />
                                        )}
                                    </button>
                                    <span
                                        className={`text-lg min-w-0 wrap-break-word ${todo.completed ? 'line-through text-gray-500 italic' : 'text-gray-800 font-medium'}`}
                                    >
                                        {todo.text}
                                    </span>
                                </div>

                                <button
                                    onClick={() => handleDeleteTodo(todo.id)}
                                    className='ml-4 p-2 text-red-400 hover:text-red-600 rounded-full transition duration-150'
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            {/* Go Back Button */}
            <button
                onClick={onGoBack}
                className="px-6 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition mt-4"
            >
                <RotateCcw className="inline w-4 h-4 mr-2" />
                Back to Dashboard
            </button>
        </>
    );
};

export default ToDoList;