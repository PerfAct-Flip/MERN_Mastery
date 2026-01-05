import { Info, RotateCcw } from 'lucide-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostList from './PostList';
import PostDetail from './PostDetail';

interface ProjectProps {
    onGoBack: () => void;
    title?: string;
}



const BlogPostViewer: React.FC<ProjectProps> = ({ onGoBack }) => (
    <>
        <BrowserRouter>
      <div className="bg-gray-50 p-8">
        <Routes>
          <Route path="/" element={<PostList />} />
          
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
        <button
            onClick={onGoBack}
            className="px-6 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
            <RotateCcw className="inline w-4 h-4 mr-2" />
            Back to Dashboard
        </button>
    </>
);
export default BlogPostViewer;