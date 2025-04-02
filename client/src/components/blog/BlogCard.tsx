import { Link } from "wouter";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  tags: string[];
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <div id={post.id} className="blog-card bg-gray-50 rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">{post.date}</p>
        <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-3">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">By {post.author}</span>
          <Link 
            href={`/blog#${post.id}-full`} 
            className="text-[var(--secondary-600)] font-medium inline-flex items-center"
          >
            Read Article
            <i className="fas fa-arrow-right ml-2 text-sm"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
