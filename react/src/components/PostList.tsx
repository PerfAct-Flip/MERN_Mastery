import { useEffect, useState } from "react"
import axios from 'axios';
import { Link } from 'react-router-dom';
interface Post {
  id: number;
  title: string;
}
const PostList = () => {

  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10').then(res => setPosts(res.data));
  },[])
  
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Blog Posts</h1>
      <div className="space-y-4">
        {posts.map(post => (
          <Link 
            key={post.id} 
            to={`/post/${post.id}`} 
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md hover:text-blue-600 transition"
          >
            {post.id}. {post.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PostList;