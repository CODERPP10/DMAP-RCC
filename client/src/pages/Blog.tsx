import { Helmet } from "react-helmet";
import { blogPosts } from "@/data/blog";
import BlogCard from "@/components/blog/BlogCard";

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Technical Insights - DMAP Construction</title>
        <meta name="description" content="Stay informed with our latest technical insights on building retrofitting and reconstruction" />
      </Helmet>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[var(--primary-800)] mb-4">Technical Insights</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Expert knowledge and industry updates on government building retrofitting and reconstruction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl font-bold text-[var(--primary-800)] mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-gray-600 mb-4">
                  Stay updated with our latest technical insights, industry news, and project highlights delivered 
                  directly to your inbox.
                </p>
              </div>
              <div className="w-full md:w-auto">
                <form className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)] focus:border-transparent"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-[var(--secondary-600)] hover:bg-[var(--secondary-700)] text-white py-2 px-4 rounded-md font-medium transition"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
