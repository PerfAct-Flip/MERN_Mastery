import { Zap, RotateCcw, ChevronRight, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';

interface ProjectProps {
    onGoBack: () => void;
    title?: string;
}

interface Data {
    id: string,
    label: string,
    content: string,
    description: string // Added for better UI
}

const tabData: Data[] = [
    {
        id: 'overview',
        label: 'Overview',
        description: 'Project summary & status',
        content: 'This is the general overview of the project. It summarizes the key features and current progress of the development cycle.'
    },
    {
        id: 'features',
        label: 'Features',
        description: 'Capabilities & tools',
        content: 'Detailed list of features: Real-time filtering, State management via Hooks, and optimized rendering using useMemo.'
    },
    {
        id: 'settings',
        label: 'Settings',
        description: 'Preferences & config',
        content: 'Configure your preferences here. You can change themes, adjust notification frequency, and manage API keys.'
    },
    {
        id: 'contact',
        label: 'Contact',
        description: 'Support & feedback',
        content: 'Get in touch with the development team via email or our 24/7 dedicated support portal.'
    }
];

const TabManager: React.FC<ProjectProps> = ({ onGoBack }) => {
    const [activeTab, setActiveTab] = useState<string | null>(null);

    const RenderContent = () => {
        const tab = tabData.find(item => item.id === activeTab);

        if (!tab) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-in fade-in duration-500">
                    <div className="p-4 bg-indigo-50 rounded-full">
                        <LayoutDashboard className="w-12 h-12 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Welcome to Tab Manager</h3>
                        <p className="text-gray-500 max-w-xs">Select a category from the sidebar to view detailed information.</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col p-8 h-full animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-200">
                        <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        {tab.label}
                    </h2>
                </div>

                <div className="prose prose-indigo max-w-none">
                    <p className="text-lg leading-relaxed text-gray-600 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        {tab.content}
                    </p>
                </div>

            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 p-4 flex flex-col items-center">
            {/* Header Area */}


            {/* Main Interface */}
            <div className="grid grid-cols-12 gap-6 bg-gray-50/50 p-2 rounded-3xl border border-gray-200 shadow-2xl overflow-hidden min-h-[500px]">

                {/* Content Area (Left) */}
                <div className="col-span-12 md:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-inner overflow-hidden relative">
                    {RenderContent()}
                </div>

                {/* Sidebar (Right) */}
                <div className="col-span-12 md:col-span-4 space-y-3 p-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2 mb-4">Navigation</p>
                    <ul className="space-y-3">
                        {tabData.map((item) => {
                            const isActive = activeTab === item.id;
                            return (
                                <li
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`
                                        group cursor-pointer flex items-center p-4 rounded-xl transition-all duration-200
                                      ${isActive
                                            ? 'bg-white shadow-md border-l-4 border-indigo-600 translate-x-1'
                                            : 'hover:bg-gray-100 border-l-4 border-transparent'
                                        }
                                    `}
                                >
                                    <div className="flex-1">
                                        <h4 className={`font-bold text-sm ${isActive ? 'text-indigo-600' : 'text-gray-700'}`}>
                                            {item.label}
                                        </h4>
                                        <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                                    </div>

                                    <ChevronRight className={`w-4 h-4 transition-all ${isActive ? 'text-indigo-600 translate-x-1' : 'text-gray-300 opacity-0 group-hover:opacity-100'}`} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <button
                onClick={onGoBack}
                className="px-6 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
                <RotateCcw className="inline w-4 h-4 mr-2" />
                Back to Dashboard
            </button>
        </div>

    );
};

export default TabManager;