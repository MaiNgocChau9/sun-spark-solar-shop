
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { BlogPostType } from '@/types';
import BlogCard from '@/components/blog/BlogCard';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chatbot/Chatbot";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts(blogPosts);
      setFilteredPosts(blogPosts);
      setLoading(false);
    }, 500);
  }, []);
  
  // Extract all unique tags
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags || []))];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterPosts(searchQuery, selectedTag);
  };
  
  const handleTagClick = (tag: string) => {
    const newTag = tag === selectedTag ? '' : tag;
    setSelectedTag(newTag);
    filterPosts(searchQuery, newTag);
  };
  
  const filterPosts = (query: string, tag: string) => {
    setLoading(true);
    
    setTimeout(() => {
      let result = [...posts];
      
      if (query) {
        const searchLower = query.toLowerCase();
        result = result.filter(post => 
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.content.toLowerCase().includes(searchLower)
        );
      }
      
      if (tag) {
        result = result.filter(post => 
          post.tags?.includes(tag)
        );
      }
      
      setFilteredPosts(result);
      setLoading(false);
    }, 300);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog & Tin tức</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cập nhật những xu hướng mới nhất về năng lượng mặt trời, các mẹo tiết kiệm năng lượng 
              và thông tin hữu ích về các công nghệ xanh.
            </p>
          </div>
          
          {/* Search and filters */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <form onSubmit={handleSearch} className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground self-center mr-2">
                  Lọc theo chủ đề:
                </span>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedTag === tag
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Blog posts */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-muted-foreground">Đang tải bài viết...</p>
            </div>
          ) : (
            <>
              {filteredPosts.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-xl font-medium mb-2">Không tìm thấy bài viết</p>
                  <p className="text-muted-foreground">Vui lòng thử lại với từ khóa hoặc chủ đề khác</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Blog;
