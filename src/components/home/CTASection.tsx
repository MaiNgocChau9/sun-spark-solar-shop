
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sẵn sàng chuyển đổi sang năng lượng mặt trời?
          </h2>
          
          <p className="text-lg md:text-xl mb-10 opacity-90">
            Hãy liên hệ với chúng tôi ngay hôm nay để nhận tư vấn miễn phí 
            và giải pháp năng lượng mặt trời phù hợp cho nhu cầu của bạn.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-white text-primary hover:bg-white/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
            >
              Liên hệ ngay
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            
            <Link 
              to="/products" 
              className="bg-transparent border border-white text-white hover:bg-white/10 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
            >
              Khám phá sản phẩm
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
