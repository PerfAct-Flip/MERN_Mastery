import { RotateCcw } from 'lucide-react';
import { useState, useMemo } from 'react'; // useMemo is a good practice for performance

interface ProjectProps {
    onGoBack: () => void;
    title?: string;
}

const initialStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas",
    "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii"
];

const FilterableList: React.FC<ProjectProps> = ({ onGoBack }) => {
    const [filterText, setFilterText] = useState<string>('');
    
    const filteredList = useMemo(()=>{
        if (!filterText) return initialStates
        return initialStates.filter( item => {
            const itemLower = item.toLowerCase();
            const filterLower = filterText.toLowerCase();

            return itemLower.includes(filterLower);
        });
    }
    ,[filterText]);

    return (
        <>
            <div className='flex flex-col items-center p-4 space-y-4'>
                <h1 className="text-2xl font-bold text-gray-800">Filterable State List</h1>
                <div className="flex items-center space-x-2">
                    <span className="text-lg font-medium">Filter:</span>
                    <input 
                        type="text"
                        placeholder='Enter item (e.g., "al")'
                        className='border border-amber-500 rounded-2xl p-2 bg-slate-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-150'
                        value={filterText}
                        onChange={(e) => {
                            setFilterText(e.target.value);
                        }}
                    />
                </div>
                
                <ul className='border border-gray-300 rounded-lg p-4 w-64 max-h-80 overflow-y-auto bg-white shadow-inner'>
                    {filteredList.length > 0 ? (
                        filteredList.map((item, index) => (
                            <li 
                                key={index} 
                                className='py-1 border-b border-gray-100 last:border-b-0 text-gray-700'
                            >
                                {item}
                            </li>
                        ))
                    ) : (
                        <li className='text-red-500 font-medium'>No results found for "{filterText}"</li>
                    )}
                </ul>
            </div>
            
            <button
                onClick={onGoBack}
                className="mt-6 px-6 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center justify-center"
            >
                <RotateCcw className="inline w-4 h-4 mr-2" />
                Back to Dashboard
            </button>
        </>
    )
};
export default FilterableList;