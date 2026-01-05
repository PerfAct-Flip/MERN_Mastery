import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

interface FullPost {
  title: string;
  body: string;
}

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<FullPost | null>(null);
  useEffect(() => {
    axios.get<FullPost>(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => setPost(res.data));
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <Link to="/" className="text-blue-500 flex items-center gap-2 mb-6">
        <ArrowLeft size={18} /> Back to Feed
      </Link>
      <h1 className="text-3xl font-bold capitalize mb-4">{post.title}</h1>
      <p className="text-gray-600 leading-relaxed text-lg">{post.body}</p>
    </div>
  );
}

export default PostDetail;