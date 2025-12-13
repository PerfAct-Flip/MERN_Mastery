import React from 'react';
import { RotateCcw, Zap } from 'lucide-react';

// --- 1. Interfaces ---
// Props for the main RecipeCard component
interface ProjectProps {
    onGoBack: () => void;
    title?: string;
}

// Data structure for a single card
interface CardData {
    src: string,
    title: string,
    desc: string
    id: number
}

// Props for the reusable ImageCard component
interface CardProps {
    src: string,
    title: string,
    desc: string
}


// --- 2. Reusable ImageCard Component (Grid Item) ---
const ImageCard: React.FC<CardProps> = ({ src, title, desc }) => (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl border border-gray-100">
        {/* Card Image */}
        <img className="w-full h-48 object-cover" src={src} alt={title} />
        
        <div className="p-4">
            {/* Card Title */}
            <h3 className="font-bold text-xl mb-2 text-gray-800">{title}</h3>
            
            {/* Card Description */}
            <p className="text-gray-600 text-sm line-clamp-2">{desc}</p>
            
            <div className="mt-4 flex items-center text-sm text-indigo-600 font-medium cursor-pointer hover:text-indigo-800">
                View Details <Zap className="w-4 h-4 ml-1" />
            </div>
        </div>
    </div>
);


// --- 3. Main RecipeCard Component (Grid Container) ---
const RecipeCard: React.FC<ProjectProps> = ({ onGoBack }) => {

    const images: CardData[] = [
        {
            src: "https://placehold.co/800x450/1e3a8a/ffffff?text=1.+BLUE",
            title: "Majestic Mountain View",
            desc: "A stunning placeholder image with a deep blue background, symbolizing tranquility and vastness.",
            id: 1
        },
        {
            src: "https://placehold.co/800x450/4f46e5/ffffff?text=2.+INDIGO",
            title: "Neon Cityscape",
            desc: "The bright lights of a modern city illuminated at night, representing energy and urban life.",
            id: 2
        },
        {
            src: "https://placehold.co/800x450/065f46/ffffff?text=3.+EMERALD",
            title: "Vibrant Abstract Painting",
            desc: "A piece of modern abstract art featuring bold colors and shapes, inspiring creativity.",
            id: 3
        },
        {
            src: "https://placehold.co/800x450/7c2d12/ffffff?text=4.+BROWN",
            title: "Rustic Forest Path",
            desc: "A winding dirt path through a dense, sunlit forest, suggesting adventure and natural beauty.",
            id: 4
        },
        {
            src: "https://placehold.co/800x450/eab308/ffffff?text=5.+YELLOW",
            title: "Sunny Beach Sunrise",
            desc: "The warm glow of the sun rising over an empty beach, evoking peace and new beginnings.",
            id: 5
        },
        {
            src: "https://placehold.co/800x450/be123c/ffffff?text=6.+RED",
            title: "Volcanic Eruption",
            desc: "A powerful image of a volcano erupting, symbolizing raw energy and dramatic forces.",
            id: 6
        },
    ];

    return (
        <div className="p-8 bg-gray-50 min-h-screen ">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900">Responsive Recipe Grid</h1>
                
            </div>
            
            {/* The Responsive Grid Container */}
            {/* Classes: 1 col on mobile, 2 cols on small screens (sm), 3 on large (lg), 4 on extra-large (xl) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                {/* Mapping over the data to render the cards */}
                {images.map((img) => (
                    <ImageCard 
                        key={img.id}
                        src={img.src}
                        title={img.title}
                        desc={img.desc}
                    />
                ))}
            </div>
            <button
            onClick={onGoBack}
            className="px-6 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
            <RotateCcw className="inline w-4 h-4 mr-2" />
            Back to Dashboard
        </button>
        </div>
    )
}

export default RecipeCard;