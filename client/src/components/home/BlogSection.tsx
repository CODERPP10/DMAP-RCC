import { Link } from "wouter";
import { blogPosts } from "@/data/blog";

const BlogSection = () => {
  // Use only the first 3 blog posts for the home page
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--primary-800)] mb-2">Technical Insights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest industry knowledge and project insights
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <div key={post.id} className="blog-card bg-gray-50 rounded-lg shadow-md overflow-hidden">
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
                <Link 
                  href={`/blog#${post.id}`} 
                  className="text-[var(--secondary-600)] font-medium inline-flex items-center"
                >
                  Read Article
                  <i className="fas fa-arrow-right ml-2 text-sm"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            href="/blog" 
            className="inline-block border-2 border-[var(--primary-800)] text-[var(--primary-800)] hover:bg-[var(--primary-800)] hover:text-white py-2 px-6 rounded-md font-medium transition"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
