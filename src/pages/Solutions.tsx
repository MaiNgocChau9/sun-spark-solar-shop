
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chatbot/Chatbot";

const Solutions = () => {
  const solutions = [
    {
      id: 'residential',
      title: 'Giải pháp cho hộ gia đình',
      description: 'Hệ thống năng lượng mặt trời tối ưu cho ngôi nhà của bạn, giúp tiết kiệm chi phí điện và tăng giá trị bất động sản.',
      image: 'https://images.unsplash.com/photo-1513269890863-6b5261eaedb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      features: [
        'Hệ thống trên mái nhà từ 3kW đến 15kW',
        'Thiết kế phù hợp với kiến trúc nhà',
        'Tiết kiệm 50-90% chi phí điện hàng tháng',
        'Giải pháp lưu trữ điện cho sử dụng vào ban đêm',
        'Hệ thống giám sát từ xa qua ứng dụng di động',
        'Bảo hành lên đến 25 năm'
      ]
    },
    {
      id: 'commercial',
      title: 'Giải pháp cho doanh nghiệp',
      description: 'Giải pháp năng lượng mặt trời quy mô lớn cho các doanh nghiệp, nhà máy và văn phòng, giúp giảm thiểu chi phí vận hành và thể hiện trách nhiệm môi trường.',
      image: 'https://images.unsplash.com/photo-1624397640148-949b1732bb0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      features: [
        'Hệ thống công suất lớn từ 30kW đến 1MW+',
        'Thiết kế tối ưu để tận dụng không gian mái',
        'ROI (Hoàn vốn đầu tư) trong 4-6 năm',
        'Giảm phát thải carbon và đáp ứng ESG',
        'Hệ thống giám sát và quản lý năng lượng',
        'Tư vấn về chính sách thuế và khấu hao'
      ]
    },
    {
      id: 'agricultural',
      title: 'Giải pháp cho nông nghiệp',
      description: 'Hệ thống năng lượng mặt trời cho các trang trại, khu vực nuôi trồng thủy sản và các hoạt động nông nghiệp, giúp tiết kiệm chi phí vận hành và tăng năng suất.',
      image: 'https://images.unsplash.com/photo-1593352216840-17321cd73c6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      features: [
        'Hệ thống bơm nước năng lượng mặt trời',
        'Giải pháp kết hợp nông nghiệp và năng lượng mặt trời',
        'Hệ thống chiếu sáng và kiểm soát môi trường',
        'Tiết kiệm đến 70% chi phí năng lượng',
        'Vận hành ổn định ở khu vực xa lưới điện',
        'Thiết kế chống chịu điều kiện thời tiết khắc nghiệt'
      ]
    },
    {
      id: 'offgrid',
      title: 'Giải pháp độc lập lưới điện',
      description: 'Hệ thống năng lượng mặt trời độc lập hoàn toàn với lưới điện quốc gia, phù hợp với các khu vực biệt lập, đảo và vùng sâu vùng xa.',
      image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
      features: [
        'Hệ thống năng lượng mặt trời hoàn toàn độc lập',
        'Hệ thống lưu trữ điện năng dung lượng lớn',
        'Thiết kế phù hợp với điều kiện địa lý đặc thù',
        'Hệ thống dự phòng và điều khiển thông minh',
        'Khả năng mở rộng theo nhu cầu thực tế',
        'Giải pháp hybrid kết hợp với các nguồn năng lượng khác'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Giải pháp năng lượng mặt trời cho mọi nhu cầu
            </h1>
            <p className="text-xl text-muted-foreground">
              Khám phá các giải pháp năng lượng mặt trời tùy chỉnh của chúng tôi, 
              được thiết kế để đáp ứng nhu cầu cụ thể của từng đối tượng khách hàng.
            </p>
          </div>
          
          <div className="space-y-24">
            {solutions.map((solution, index) => (
              <div 
                key={solution.id}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}
              >
                <div className="md:w-1/2">
                  <img 
                    src={solution.image} 
                    alt={solution.title}
                    className="rounded-xl shadow-lg w-full h-auto"
                  />
                </div>
                
                <div className="md:w-1/2">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{solution.title}</h2>
                  <p className="text-muted-foreground mb-6">{solution.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {solution.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="mr-3 mt-1">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link to="/contact" className="btn-primary">
                      Yêu cầu tư vấn
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link to="/products" className="btn-outline">
                      Xem sản phẩm
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Process Section */}
          <div className="mt-24">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Quy trình làm việc của chúng tôi</h2>
              <p className="text-lg text-muted-foreground">
                Chúng tôi cung cấp giải pháp trọn gói từ khảo sát, thiết kế đến lắp đặt và bảo trì.
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-muted -translate-x-1/2"></div>
              
              <div className="space-y-12 md:space-y-0">
                {/* Step 1 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 relative md:mb-20">
                  <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold z-10">
                    1
                  </div>
                  
                  <div className="md:text-right md:pr-12">
                    <div className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold mb-4">
                      1
                    </div>
                    <h3 className="text-xl font-bold mb-3">Tư vấn và khảo sát</h3>
                    <p className="text-muted-foreground">
                      Chuyên gia của chúng tôi sẽ trao đổi về nhu cầu của bạn, 
                      tiến hành khảo sát địa điểm và đánh giá tiềm năng năng lượng mặt trời.
                    </p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:pl-12"></div>
                </div>
                
                {/* Step 2 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 relative md:mb-20">
                  <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold z-10">
                    2
                  </div>
                  
                  <div className="md:pr-12"></div>
                  
                  <div className="mt-4 md:mt-0 md:pl-12">
                    <div className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold mb-4">
                      2
                    </div>
                    <h3 className="text-xl font-bold mb-3">Thiết kế và báo giá</h3>
                    <p className="text-muted-foreground">
                      Dựa trên khảo sát, chúng tôi sẽ thiết kế hệ thống phù hợp nhất 
                      và cung cấp báo giá chi tiết, bao gồm phân tích ROI và tiết kiệm năng lượng.
                    </p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 relative md:mb-20">
                  <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold z-10">
                    3
                  </div>
                  
                  <div className="md:text-right md:pr-12">
                    <div className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold mb-4">
                      3
                    </div>
                    <h3 className="text-xl font-bold mb-3">Lắp đặt chuyên nghiệp</h3>
                    <p className="text-muted-foreground">
                      Đội ngũ kỹ thuật chuyên nghiệp của chúng tôi sẽ tiến hành lắp đặt hệ thống 
                      với sự tỉ mỉ và an toàn cao nhất, đảm bảo hiệu suất tối đa.
                    </p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:pl-12"></div>
                </div>
                
                {/* Step 4 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                  <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold z-10">
                    4
                  </div>
                  
                  <div className="md:pr-12"></div>
                  
                  <div className="mt-4 md:mt-0 md:pl-12">
                    <div className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold mb-4">
                      4
                    </div>
                    <h3 className="text-xl font-bold mb-3">Hỗ trợ và bảo trì</h3>
                    <p className="text-muted-foreground">
                      Chúng tôi cung cấp dịch vụ hỗ trợ và bảo trì toàn diện, 
                      bao gồm giám sát từ xa, kiểm tra định kỳ và dịch vụ khẩn cấp 24/7.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="mt-24 bg-gradient-to-r from-primary/80 to-primary rounded-xl p-8 md:p-12 text-primary-foreground">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Bạn sẵn sàng chuyển đổi sang năng lượng mặt trời?</h2>
                <p className="text-primary-foreground/90 max-w-2xl">
                  Liên hệ với chúng tôi ngay hôm nay để nhận tư vấn miễn phí và bắt đầu hành trình 
                  tiết kiệm năng lượng của bạn với SolarTech.
                </p>
              </div>
              
              <div className="shrink-0">
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center bg-white text-primary hover:bg-white/90 font-medium rounded-md px-6 py-3 transition-colors"
                >
                  Liên hệ ngay
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Solutions;
