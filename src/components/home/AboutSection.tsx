
import { Link } from 'react-router-dom';
import { ShieldCheck, Leaf, BarChart, Clock } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
                alt="Về SolarTech"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-solar-900 shadow-lg rounded-lg p-4 w-32 h-32 flex flex-col items-center justify-center">
                <span className="text-primary text-2xl font-bold">10+</span>
                <span className="text-center text-sm">Năm kinh nghiệm</span>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Về <span className="text-primary">SolarTech</span>
            </h2>
            
            <p className="text-muted-foreground mb-6">
              SolarTech là nhà cung cấp hàng đầu các giải pháp năng lượng mặt trời tại Việt Nam. 
              Với hơn 10 năm kinh nghiệm, chúng tôi tự hào cung cấp các sản phẩm chất lượng cao
              và dịch vụ chuyên nghiệp để đáp ứng nhu cầu năng lượng tái tạo của khách hàng.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Chất lượng cao</h3>
                  <p className="text-sm text-muted-foreground">Sản phẩm được nhập khẩu và kiểm định chặt chẽ</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Thân thiện môi trường</h3>
                  <p className="text-sm text-muted-foreground">Giúp giảm thiểu lượng khí thải carbon</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Tiết kiệm chi phí</h3>
                  <p className="text-sm text-muted-foreground">Giảm hóa đơn điện hàng tháng đáng kể</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Bền bỉ lâu dài</h3>
                  <p className="text-sm text-muted-foreground">Sản phẩm có tuổi thọ cao và bảo hành dài hạn</p>
                </div>
              </div>
            </div>
            
            <Link to="/about" className="btn-primary">
              Tìm hiểu thêm về chúng tôi
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
