
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPostType } from '@/types';

interface BlogCardProps {
  post: BlogPostType;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="bg-white dark:bg-solar-900 rounded-xl shadow-sm overflow-hidden card-hover">
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
        
        <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className="bg-muted text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <Link 
          to={`/blog/${post.slug}`}
          className="inline-flex items-center text-primary font-medium hover:underline"
        >
          Đọc tiếp 
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
