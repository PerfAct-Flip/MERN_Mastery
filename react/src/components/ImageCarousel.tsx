import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RotateCcw } from 'lucide-react';
interface ProjectProps {
    onGoBack: () => void;
    title?: string;
}


// Sample data for the carousel
const images = [
    {
        id: "img-001",
        src: "https://placehold.co/800x450/1e3a8a/ffffff?text=1.+BLUE",
        alt: "A placeholder image with a blue background and the text 1. BLUE",
        caption: "Placeholder image 1: Blue Theme."
    },
    {
        id: "img-002",
        src: "https://placehold.co/800x450/4f46e5/ffffff?text=2.+INDIGO",
        alt: "A placeholder image with an indigo background and the text 2. INDIGO",
        caption: "Placeholder image 2: Indigo Theme."
    },
    {
        id: "img-003",
        src: "https://placehold.co/800x450/065f46/ffffff?text=3.+EMERALD",
        alt: "A placeholder image with an emerald green background and the text 3. EMERALD",
        caption: "Placeholder image 3: Emerald Theme."
    },
    {
        id: "img-004",
        src: "https://placehold.co/800x450/be123c/ffffff?text=4.+RED",
        alt: "A placeholder image with a red background and the text 4. RED",
        caption: "Placeholder image 4: Red Theme."
    },
    {
        id: "img-005",
        src: "https://placehold.co/800x450/fbbf24/000000?text=5.+AMBER",
        alt: "A placeholder image with an amber background and the text 5. AMBER",
        caption: "Placeholder image 5: Amber Theme."
    },
    {
        id: "img-006",
        src: "https://placehold.co/800x450/4338ca/ffffff?text=6.+DEEP+INDIGO",
        alt: "A placeholder image with a deep indigo background and the text 6. DEEP INDIGO",
        caption: "Placeholder image 6: Deep Indigo Theme."
    },
    {
        id: "img-007",
        src: "https://placehold.co/800x450/10b981/ffffff?text=7.+MINT",
        alt: "A placeholder image with a mint green background and the text 7. MINT",
        caption: "Placeholder image 7: Mint Theme."
    },
    {
        id: "img-008",
        src: "https://placehold.co/800x450/f97316/ffffff?text=8.+ORANGE",
        alt: "A placeholder image with an orange background and the text 8. ORANGE",
        caption: "Placeholder image 8: Orange Theme."
    },
    {
        id: "img-009",
        src: "https://placehold.co/800x450/db2777/ffffff?text=9.+PINK",
        alt: "A placeholder image with a pink background and the text 9. PINK",
        caption: "Placeholder image 9: Pink Theme."
    },
    {
        id: "img-010",
        src: "https://placehold.co/800x450/9333ea/ffffff?text=10.+PURPLE",
        alt: "A placeholder image with a purple background and the text 10. PURPLE",
        caption: "Placeholder image 10: Purple Theme."
    }
];

const ImageCarousel: React.FC<ProjectProps> = ({ onGoBack}) => {
    // 1. State for Current Image Index
    // We start at index 0 (the first image)
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalImages = images.length;

    // --- Handlers for Navigation ---

    // Move to the next image
    const handleNext = () => {
        // Use the modulo operator (%) to loop back to the first image (index 0) 
        // after reaching the last image.
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    };

    // Move to the previous image
    const handlePrev = () => {
        // Use the formula (index - 1 + length) % length to handle going back 
        // from the first image (index 0) to the last image.
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    };

    // Jump to a specific image index (used by the dots)
    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };


    // Conditional rendering: Get the current image object
    const currentImage = images[currentIndex];


    return (
        <>
            <div className="relative w-full max-w-xl shadow-2xl rounded-xl overflow-hidden bg-white">

                {/* 2. Image Display Area */}
                <div className="relative h-96">
                    <img
                        key={currentImage.id} // Key helps React recognize the image change
                        src={currentImage.src}
                        alt={currentImage.alt}
                        className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                    />

                    {/* Caption */}
                    <div className="absolute bottom-0 w-full p-4 bg-black bg-opacity-40 text-white text-center font-medium">
                        {currentImage.caption}
                    </div>
                </div>

                {/* 3. Navigation Buttons */}
                <button
                    onClick={handlePrev}
                    aria-label="Previous Image"
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg opacity-80 hover:opacity-100 transition"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>

                <button
                    onClick={handleNext}
                    aria-label="Next Image"
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg opacity-80 hover:opacity-100 transition"
                >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
            </div>

            {/* 4. Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-4">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        // Conditional rendering for dot color/size
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'bg-indigo-600 w-4 h-4' // Active dot style
                                : 'bg-gray-400 hover:bg-gray-500' // Inactive dot style
                            }`}
                    />
                ))}
            </div>

            <p className="mt-8 text-sm text-gray-600">
                Tip: The modulo operator (%) is used to create the seamless loop!
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
};

export default ImageCarousel;