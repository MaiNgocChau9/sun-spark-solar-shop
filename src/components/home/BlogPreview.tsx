
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { BlogPostType } from '@/types';

const BlogPreview = () => {
  const [recentPosts, setRecentPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    // Get the most recent 3 blog posts
    const recent = [...blogPosts].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 3);
    
    setRecentPosts(recent);
  }, []);

  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bài viết mới nhất</h2>
            <p className="text-muted-foreground max-w-2xl">
              Khám phá các bài viết hữu ích về công nghệ năng lượng mặt trời,
              hướng dẫn tiết kiệm năng lượng và tin tức mới nhất trong ngành.
            </p>
          </div>
          <Link to="/blog" className="btn-outline mt-4 md:mt-0">
            Xem tất cả bài viết
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <article key={post.id} className="bg-white dark:bg-solar-900 rounded-xl shadow-sm overflow-hidden card-hover">
              <Link to={`/blog/${post.slug}`} className="block">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
              
              <div className="p-5">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('vi-VN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readingTime} phút đọc</span>
                  </div>
                </div>
                
                <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  <h3 className="font-bold text-xl mb-2">{post.title}</h3>
                </Link>
                
                <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                
                <Link 
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  Đọc tiếp 
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
