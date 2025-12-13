import { Info, RotateCcw } from 'lucide-react';
// Filterable List:
// [ ] A list of items (e.g., fruits, names). An input field to filter the list in real-time.
// [ ] Learn filtering arrays, state management.
interface ProjectProps {
    onGoBack: () => void;
    title?: string;
}

const FilterableList: React.FC<ProjectProps> = ({ onGoBack }) => (
    <>
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
    </>
);
export default FilterableList;