
import { useState, useRef, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    role: 'Chủ nhà tại TP. HCM',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    quote: 'Tôi đã lắp đặt hệ thống pin mặt trời của Solar Diệp Châu cho ngôi nhà của tôi cách đây 2 năm. Hệ thống hoạt động tuyệt vời, hóa đơn tiền điện giảm đáng kể và dịch vụ hỗ trợ của họ rất chuyên nghiệp.',
    rating: 5
  },
  {
    id: 2,
    name: 'Trần Thị B',
    role: 'Giám đốc công ty sản xuất',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    quote: 'Chúng tôi đã triển khai hệ thống năng lượng mặt trời quy mô lớn cho nhà máy với sự tư vấn của Solar Diệp Châu. Họ đã giúp chúng tôi tiết kiệm đến 40% chi phí điện năng. Đầu tư thông minh!',
    rating: 5
  },
  {
    id: 3,
    name: 'Lê Văn C',
    role: 'Chủ trang trại nông nghiệp',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    quote: 'Tôi đã lắp đặt các tấm pin mặt trời của Solar Diệp Châu tại trang trại của tôi để vận hành hệ thống tưới tiêu. Thiết bị hoạt động rất tốt ngay cả trong điều kiện thời tiết khắc nghiệt.',
    rating: 4
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    role: 'Quản lý chuỗi cửa hàng',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=922&q=80',
    quote: 'Chúng tôi đã lắp đặt các tấm pin Solar Diệp Châu cho 5 cửa hàng trong chuỗi và đã thấy kết quả rõ rệt về mặt tiết kiệm chi phí. Đội ngũ kỹ thuật rất chuyên nghiệp và tận tâm.',
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayRef = useRef<number | null>(null);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const startAutoplay = () => {
    if (autoplayRef.current) return;
    autoplayRef.current = window.setInterval(() => {
      nextSlide();
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  useEffect(() => {
    if (isAutoplay) {
      startAutoplay();
    } else {
      stopAutoplay();
    }

    return () => {
      stopAutoplay();
    };
  }, [isAutoplay]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoplay(false);
  };

  const handleMouseEnter = () => {
    setIsAutoplay(false);
  };

  const handleMouseLeave = () => {
    setIsAutoplay(true);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-solar-50 to-solar-200 dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-foreground dark:text-white">
          Khách hàng nói gì về chúng tôi
        </h2>
        <p className="text-muted-foreground dark:text-gray-300 text-center max-w-2xl mx-auto mb-12">
          Khám phá trải nghiệm thực tế từ những khách hàng đã sử dụng các giải pháp năng lượng mặt trời của Solar Diệp Châu
        </p>

        <div 
          className="max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative bg-card dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-opacity duration-300 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
                style={{ zIndex: index === activeIndex ? 10 : 0 }}
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover rounded-full border-4 border-primary/20"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 text-amber-500 dark:text-amber-400">
                      {"★".repeat(testimonial.rating)}
                      {"☆".repeat(5 - testimonial.rating)}
                    </div>
                    <blockquote className="text-lg italic mb-4 text-foreground dark:text-gray-300">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="font-semibold text-foreground dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation arrows */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-card dark:bg-gray-700 rounded-full p-2 shadow-md z-20 hover:bg-muted transition-colors"
              onClick={(e) => {
                e.preventDefault();
                prevSlide();
                setIsAutoplay(false);
              }}
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-card dark:bg-gray-700 rounded-full p-2 shadow-md z-20 hover:bg-muted transition-colors"
              onClick={(e) => {
                e.preventDefault();
                nextSlide();
                setIsAutoplay(false);
              }}
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-primary' : 'bg-muted-foreground/30 dark:bg-gray-600'
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
