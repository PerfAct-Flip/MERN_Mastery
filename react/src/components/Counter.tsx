import { RotateCcw } from 'lucide-react';
import { useState } from 'react';
interface ProjectProps {
    onGoBack: () => void;
    title?: string;
}


const Counter: React.FC<ProjectProps> = ({ onGoBack }) => {
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
        <> 

            <div className="mb-8 grow flex items-center">
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
        </>
    );
};

export default Counter;