
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-solar-50 to-solar-200 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')] bg-no-repeat bg-cover opacity-10"></div>
      
      <div className="container relative pt-32 pb-20 md:pt-40 md:pb-32 min-h-[90vh] flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium animate-fade-in">
            Năng lượng mặt trời cho tương lai bền vững
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !leading-tight">
            Giải pháp năng lượng mặt trời <span className="text-primary">tiên tiến</span> cho ngôi nhà và doanh nghiệp
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Khám phá các giải pháp năng lượng tái tạo hiệu quả, tiết kiệm chi phí 
            và thân thiện với môi trường từ Solar Diệp Châu.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/products" className="btn-primary">
              Khám phá sản phẩm
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            
            <Link to="/contact" className="btn-outline">
              Tư vấn miễn phí
            </Link>
          </div>
          
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="font-bold text-2xl md:text-3xl text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Năm kinh nghiệm</div>
            </div>
            
            <div className="text-center">
              <div className="font-bold text-2xl md:text-3xl text-primary">5000+</div>
              <div className="text-sm text-muted-foreground">Khách hàng hài lòng</div>
            </div>
            
            <div className="text-center">
              <div className="font-bold text-2xl md:text-3xl text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Dự án lớn</div>
            </div>
            
            <div className="text-center">
              <div className="font-bold text-2xl md:text-3xl text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Hỗ trợ khách hàng</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
