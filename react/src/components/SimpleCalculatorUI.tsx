import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
interface ProjectProps {
    onGoBack: () => void;
    title?: string;
}

const SimpleCalculatorUI: React.FC<ProjectProps> = ({onGoBack}) => {
    const [displayValue, setDisplayValue] = useState<string>('0');
    
    // Define all buttons in a flat list for easier grid mapping.
    // The grid structure (4 columns) is defined in the JSX.
    const buttons = [
        'AC', '+/-', '%', '/',
        '7', '8', '9', 'x',
        '4', '5', '6', '-',
        '1', '2', '3', '+',
        '0', '.', '=',
    ];

    // --- Event Handlers and Styles ---

    const handleButtonClick = (value: string) => {
        // Simple logic for UI display practice
        if (value === 'AC') {
            setDisplayValue('0');
        } else if (value === '=') {
            setDisplayValue('Result Pending...');
        } else if (displayValue === '0' && !isOperator(value) && value !== '.') {
            setDisplayValue(value);
        } else {
            // Append the number or operator
            setDisplayValue((prev) => prev + value);
        }
    };

    const isOperator = (value: string) => {
        // Note: '=' is treated as an operator here but has unique logic in handleButtonClick
        return ['/', 'x', '-', '+'].includes(value); 
    };

    const getButtonStyles = (value: string) => {
        let base = 'p-4 text-2xl font-semibold rounded-lg shadow-md transition duration-150 ease-in-out';
        
        // Orange operators and equals button
        if (isOperator(value) || value === '=') {
            return `${base} bg-orange-500 text-white hover:bg-orange-600`;
        }
        // Top row utility buttons
        if (['AC', '+/-', '%'].includes(value)) {
            return `${base} bg-gray-300 text-gray-800 hover:bg-gray-400`;
        }
        // Default number style
        return `${base} bg-gray-600 text-white hover:bg-gray-700`; // Changed number background for contrast
    };

    return (
        <>
        
            <div className="w-full max-w-sm bg-gray-900 p-4 rounded-xl shadow-2xl">

                {/* 1. Display Area */}
                <div className="h-28 mb-4 bg-gray-800 rounded-lg flex items-end justify-end p-4">
                    <div className="text-white text-5xl font-light overflow-hidden text-right max-w-full">
                        {displayValue}
                    </div>
                </div>

                {/* 2. Unified Button Grid (4 columns) */}
                <div className="grid grid-cols-4 gap-3">
                    {buttons.map((buttonValue) => {
                        
                        // Determine spanning for the '0' button
                        const colSpanClass = buttonValue === '0' ? 'col-span-2' : 'col-span-1';
                        
                        // Determine the correct style
                        const styles = getButtonStyles(buttonValue);

                        return (
                            <button
                                key={buttonValue}
                                onClick={() => handleButtonClick(buttonValue)}
                                className={`${styles} ${colSpanClass}`}
                            >
                                {buttonValue}
                            </button>
                        );
                    })}
                </div>
            </div>
            <button
            onClick={onGoBack}
            className="px-6 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
            <RotateCcw className="inline w-4 h-4 mr-2" />
            Back to Dashboard
        </button>
        </>
    );
};

export default SimpleCalculatorUI;