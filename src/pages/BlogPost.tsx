
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { BlogPostType } from '@/types';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chatbot/Chatbot";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    // Scroll to top when post changes
    window.scrollTo(0, 0);
    
    // Simulate API call
    setLoading(true);
    
    setTimeout(() => {
      const foundPost = blogPosts.find(p => p.slug === slug);
      setPost(foundPost || null);
      
      if (foundPost && foundPost.tags && foundPost.tags.length > 0) {
        // Get posts with matching tags
        const postsWithMatchingTags = blogPosts.filter(p => 
          p.id !== foundPost.id && 
          p.tags?.some(tag => foundPost.tags?.includes(tag))
        ).slice(0, 3);
        
        setRelatedPosts(postsWithMatchingTags);
      }
      
      setLoading(false);
    }, 500);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-muted-foreground">Đang tải bài viết...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="container text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy bài viết</h1>
            <p className="mb-8 text-muted-foreground">
              Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
            <Link 
              to="/blog" 
              className="btn-primary inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại blog
            </Link>
          </div>
        </main>
        <Footer />
        <Chatbot />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <article className="container max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="flex text-sm text-muted-foreground mb-8">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <span>/</span>
                <Link to="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <span>/</span>
                <span className="text-foreground font-medium truncate">{post.title}</span>
              </li>
            </ol>
          </nav>
          
          {/* Featured Image */}
          <div className="rounded-xl overflow-hidden mb-8">
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>
          
          {/* Post Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{post.author.name}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('vi-VN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </time>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{post.readingTime} phút đọc</span>
              </div>
            </div>
          </div>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <Link 
                  key={tag}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="bg-muted hover:bg-muted/80 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
          
          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg font-medium mb-6">{post.excerpt}</p>
            
            {/* This is a placeholder for the actual content which would be rendered from the post.content */}
            <p>Trong bối cảnh ngày càng nhiều người quan tâm đến việc tiết kiệm năng lượng và bảo vệ môi trường, năng lượng mặt trời đang trở thành một giải pháp phổ biến và hiệu quả. Bài viết này sẽ giúp bạn hiểu rõ hơn về công nghệ năng lượng mặt trời và các ứng dụng của nó trong đời sống hàng ngày.</p>
            
            <h2>Tổng quan về năng lượng mặt trời</h2>
            
            <p>Năng lượng mặt trời là năng lượng được tạo ra từ ánh sáng mặt trời thông qua các tấm pin quang điện. Khi ánh sáng mặt trời chiếu vào các tế bào quang điện trong tấm pin, nó tạo ra một dòng điện có thể sử dụng cho nhiều mục đích khác nhau.</p>
            
            <p>Với sự phát triển của công nghệ, hiệu suất của các tấm pin mặt trời ngày càng được cải thiện, đồng thời chi phí sản xuất cũng giảm đáng kể. Điều này khiến cho việc lắp đặt hệ thống năng lượng mặt trời ngày càng trở nên phổ biến và tiếp cận được với nhiều đối tượng khách hàng hơn.</p>
            
            <h2>Lợi ích của năng lượng mặt trời</h2>
            
            <ul>
              <li>Tiết kiệm chi phí điện năng hàng tháng</li>
              <li>Giảm thiểu phát thải khí nhà kính</li>
              <li>Nguồn năng lượng vô tận và bền vững</li>
              <li>Tăng giá trị cho ngôi nhà hoặc cơ sở kinh doanh</li>
              <li>Giảm sự phụ thuộc vào lưới điện truyền thống</li>
              <li>Ít cần bảo trì và tuổi thọ cao</li>
            </ul>
            
            <h2>Các loại hệ thống năng lượng mặt trời</h2>
            
            <p>Có nhiều loại hệ thống năng lượng mặt trời khác nhau, phù hợp với từng nhu cầu và điều kiện cụ thể:</p>
            
            <h3>Hệ thống nối lưới</h3>
            <p>Đây là loại hệ thống phổ biến nhất, kết nối với lưới điện quốc gia. Khi hệ thống sản xuất nhiều điện hơn nhu cầu sử dụng, phần dư thừa sẽ được bán trở lại cho lưới điện.</p>
            
            <h3>Hệ thống độc lập</h3>
            <p>Hệ thống này không kết nối với lưới điện mà sử dụng ắc quy để lưu trữ năng lượng. Phù hợp với các khu vực không có điện lưới hoặc muốn hoàn toàn tự chủ về năng lượng.</p>
            
            <h3>Hệ thống hybrid</h3>
            <p>Kết hợp các đặc điểm của cả hai hệ thống trên, vừa kết nối với lưới điện vừa có khả năng lưu trữ năng lượng trong ắc quy.</p>
            
            <h2>Lựa chọn hệ thống phù hợp</h2>
            
            <p>Việc lựa chọn hệ thống năng lượng mặt trời phù hợp phụ thuộc vào nhiều yếu tố như:</p>
            
            <ul>
              <li>Diện tích mái nhà hoặc không gian lắp đặt</li>
              <li>Mức tiêu thụ điện năng hiện tại và dự kiến</li>
              <li>Ngân sách đầu tư</li>
              <li>Mục tiêu sử dụng (tiết kiệm chi phí, độc lập năng lượng, bảo vệ môi trường)</li>
              <li>Điều kiện thời tiết và ánh sáng tại khu vực</li>
            </ul>
            
            <h2>Kết luận</h2>
            
            <p>Năng lượng mặt trời đang dần trở thành một phần quan trọng trong cuộc sống hiện đại, không chỉ giúp tiết kiệm chi phí mà còn góp phần bảo vệ môi trường. Với sự phát triển không ngừng của công nghệ, chúng ta có thể kỳ vọng vào một tương lai nơi năng lượng mặt trời trở thành nguồn năng lượng chính trong cuộc sống hàng ngày.</p>
          </div>
          
          {/* Author Bio */}
          <div className="mt-12 p-6 bg-muted/30 rounded-xl flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={post.author.avatar || `https://i.pravatar.cc/200?u=${post.author.name}`} 
                alt={post.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg mb-2">Tác giả: {post.author.name}</h3>
              <p className="text-muted-foreground">
                Chuyên gia về năng lượng tái tạo với hơn 10 năm kinh nghiệm trong ngành. 
                Tác giả của nhiều bài viết chuyên sâu về công nghệ năng lượng mặt trời và 
                các giải pháp năng lượng xanh.
              </p>
            </div>
          </div>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Link 
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="rounded-lg overflow-hidden mb-3">
                      <img 
                        src={relatedPost.coverImage} 
                        alt={relatedPost.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(relatedPost.date).toLocaleDateString('vi-VN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Navigation */}
          <div className="mt-12 flex justify-between">
            <Link 
              to="/blog" 
              className="btn-outline inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại blog
            </Link>
            
            <Link 
              to={`/blog`} 
              className="btn-primary inline-flex items-center"
            >
              Xem thêm bài viết
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </article>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default BlogPost;
