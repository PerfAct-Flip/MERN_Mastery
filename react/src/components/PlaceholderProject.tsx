import { Info, RotateCcw } from 'lucide-react';

interface ProjectProps {
    onGoBack: () => void;
    title?: string;
}

const PlaceholderProject: React.FC<ProjectProps> = ({ onGoBack, title }) => (
    <>
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
    </>
);
export default PlaceholderProject;