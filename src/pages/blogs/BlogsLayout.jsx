import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import BlogPostForm from "./CreateForm";
import BlogCard from "./BlogCard";
import { dummyBlogs, generateNewId } from "../../components/data/dummyBlogs";

function BlogsLayout() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [mode, setMode] = useState("add");
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize with dummy data
  useEffect(() => {
    const initializeBlogs = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setBlogs(dummyBlogs);
      } catch (err) {
        setError("Failed to load blogs");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeBlogs();
  }, []);

  const handleDeleteBlog = (blogId) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
  };

  const handleEditBlog = (blog) => {
    setEditBlog(blog);
    setMode("edit");
    setIsDrawerOpen(true);
  };

  const handleAddNewPost = () => {
    setEditBlog(null);
    setMode("add");
    setIsDrawerOpen(true);
  };

  // Handle blog creation/update from form
  const handleBlogSubmit = (blogData) => {
    if (mode === "add") {
      const newBlog = {
        ...blogData,
        id: generateNewId(),
      };
      setBlogs(prevBlogs => [...prevBlogs, newBlog]);
    } else if (mode === "edit" && editBlog) {
      setBlogs(prevBlogs => 
        prevBlogs.map(blog => 
          blog.id === editBlog.id ? { ...blog, ...blogData } : blog
        )
      );
    }
    setIsDrawerOpen(false);
    setEditBlog(null);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setEditBlog(null);
  };

  return (
    <div className="min-h-screen relative">
      {/* Drawer */}
      <div className="drawer drawer-end">
        <input
          id="new-post-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={handleDrawerClose}
        />
        <div className="drawer-content">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold text-neutral-content">Blogs</h1>
            <button
              className="btn btn-primary text-white gap-2"
              onClick={handleAddNewPost}
            >
              + New Blog
            </button>
          </div>

          {/* Blog Count Display */}
          <div className="mb-6">
            <p className="text-sm text-neutral-content opacity-80">
              {loading ? "Loading blogs..." : `Total Blogs: ${blogs.length}`}
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search post..."
                className="input input-bordered w-full focus:outline-none pl-10 bg-base-100 text-neutral-content"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="card bg-base-100 animate-pulse transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  {/* Image Skeleton */}
                  <div className="h-48 bg-base-200 rounded-3xl transition-colors duration-300"></div>

                  {/* Content Skeleton */}
                  <div className="card-body p-4 space-y-3">
                    <div className="h-4 bg-base-200 w-1/2 transition-colors duration-300"></div>
                    <div className="h-6 bg-base-200 w-3/4 transition-colors duration-300"></div>
                    <div className="h-4 bg-base-200 w-full transition-colors duration-300"></div>

                    {/* Stats Skeleton */}
                    <div className="flex gap-4 mt-4">
                      <div className="h-4 bg-base-200 w-1/4 transition-colors duration-300"></div>
                      <div className="h-4 bg-base-200 w-1/4 transition-colors duration-300"></div>
                      <div className="h-4 bg-base-200 w-1/4 transition-colors duration-300"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">
              <p>{error}</p>
              <button 
                className="btn btn-primary mt-4"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    onDelete={handleDeleteBlog}
                    onEdit={() => handleEditBlog(blog)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <div className="text-neutral-content opacity-70">
                    {searchQuery ? (
                      <>
                        <p>No blogs found matching "{searchQuery}"</p>
                        <button 
                          className="btn btn-link text-primary"
                          onClick={() => setSearchQuery("")}
                        >
                          Clear search
                        </button>
                      </>
                    ) : (
                      <p>No blogs available. Create your first blog post!</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Sidebar */}
        <div className="drawer-side">
          <label htmlFor="new-post-drawer" className="drawer-overlay"></label>
          <div className="p-4 md:w-[40%] w-full sm:w-1/2 overflow-y-auto bg-base-100 h-[90vh] text-base-content absolute bottom-2 right-2 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                {editBlog ? "Edit Post" : "Add New Blog Post"}
              </h2>
              <button
                className="btn btn-sm btn-circle btn-ghost"
                onClick={handleDrawerClose}
              >
                ✕
              </button>
            </div>
            <BlogPostForm
              onBlogCreated={handleBlogSubmit}
              initialData={editBlog}
              mode={mode}
              setIsDrawerOpen={setIsDrawerOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogsLayout;