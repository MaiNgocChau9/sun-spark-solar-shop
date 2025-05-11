
import { Link } from 'react-router-dom';
import { Check, Award, Users, Sun, ArrowRight } from 'lucide-react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chatbot/Chatbot";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-solar-50 to-solar-200">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Chúng tôi là <span className="text-primary">SolarTech</span>
              </h1>
              <p className="text-xl mb-8 text-muted-foreground">
                Nhà cung cấp hàng đầu các giải pháp năng lượng mặt trời chất lượng cao, 
                với sứ mệnh mang đến nguồn năng lượng sạch và bền vững cho mọi người.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Câu chuyện của chúng tôi</h2>
                <p className="mb-4 text-muted-foreground">
                  SolarTech được thành lập vào năm 2010 bởi một nhóm các kỹ sư và nhà khoa học có niềm đam mê 
                  mãnh liệt với năng lượng tái tạo. Xuất phát từ nhận thức về tình trạng biến đổi khí hậu 
                  và nhu cầu cấp thiết phải chuyển đổi sang nguồn năng lượng sạch, chúng tôi bắt đầu hành trình 
                  của mình với mục tiêu mang công nghệ năng lượng mặt trời tiên tiến đến với mọi ngôi nhà 
                  và doanh nghiệp tại Việt Nam.
                </p>
                <p className="mb-4 text-muted-foreground">
                  Từ một đội ngũ nhỏ chỉ với 5 thành viên ban đầu, SolarTech đã phát triển thành một 
                  doanh nghiệp với hơn 100 nhân viên, hoạt động trên khắp Việt Nam. Chúng tôi tự hào là 
                  đối tác tin cậy của hàng nghìn khách hàng, từ hộ gia đình đến các tập đoàn lớn, 
                  trong việc chuyển đổi sang năng lượng xanh.
                </p>
                <p className="text-muted-foreground">
                  Với hơn 10 năm kinh nghiệm và hàng nghìn dự án đã thực hiện thành công, SolarTech cam kết 
                  tiếp tục đổi mới và phát triển để mang lại những giải pháp năng lượng mặt trời tốt nhất 
                  cho khách hàng của mình.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="SolarTech Team"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-solar-900 rounded-lg shadow-lg p-6">
                  <div className="text-4xl font-bold text-primary">10+</div>
                  <div className="text-sm">Năm kinh nghiệm</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Vision & Mission */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Tầm nhìn & Sứ mệnh</h2>
              <p className="text-lg text-muted-foreground">
                Với cam kết không ngừng đổi mới và phát triển, chúng tôi hướng tới 
                tương lai nơi năng lượng sạch trở thành lựa chọn chính của mọi người.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-solar-900 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Sun className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Tầm nhìn</h3>
                <p className="text-muted-foreground">
                  Trở thành doanh nghiệp hàng đầu trong lĩnh vực năng lượng tái tạo tại Việt Nam 
                  và Đông Nam Á, đồng thời góp phần vào sự chuyển đổi toàn cầu sang năng lượng sạch 
                  và bền vững. Chúng tôi hướng tới một tương lai nơi mỗi mái nhà đều được trang bị 
                  các giải pháp năng lượng mặt trời hiệu quả và thân thiện với môi trường.
                </p>
              </div>
              
              <div className="bg-white dark:bg-solar-900 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Sứ mệnh</h3>
                <p className="text-muted-foreground">
                  Cung cấp các giải pháp năng lượng mặt trời chất lượng cao, hiệu quả và phù hợp với 
                  nhu cầu của từng khách hàng. Thông qua việc áp dụng công nghệ tiên tiến và dịch vụ chuyên nghiệp, 
                  chúng tôi cam kết giúp khách hàng tiết kiệm chi phí năng lượng, đồng thời góp phần 
                  vào việc giảm thiểu tác động môi trường và bảo vệ hành tinh của chúng ta.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Giá trị cốt lõi</h2>
              <p className="text-lg text-muted-foreground">
                Những giá trị cốt lõi định hướng mọi hoạt động và quyết định của chúng tôi.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-solar-900 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Chất lượng</h3>
                <p className="text-muted-foreground">
                  Chúng tôi cam kết cung cấp các sản phẩm và dịch vụ chất lượng cao nhất, 
                  không ngừng cải tiến để đáp ứng vượt trội mong đợi của khách hàng.
                </p>
              </div>
              
              <div className="bg-white dark:bg-solar-900 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Đổi mới</h3>
                <p className="text-muted-foreground">
                  Chúng tôi không ngừng tìm kiếm các giải pháp mới và áp dụng công nghệ tiên tiến 
                  để mang lại những sản phẩm hiệu quả và bền vững hơn.
                </p>
              </div>
              
              <div className="bg-white dark:bg-solar-900 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Khách hàng</h3>
                <p className="text-muted-foreground">
                  Khách hàng là trung tâm của mọi việc chúng tôi làm. Chúng tôi lắng nghe, 
                  hiểu và cung cấp giải pháp tối ưu cho từng nhu cầu cụ thể.
                </p>
              </div>
              
              <div className="bg-white dark:bg-solar-900 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Bền vững</h3>
                <p className="text-muted-foreground">
                  Chúng tôi cam kết bảo vệ môi trường và thúc đẩy sự phát triển bền vững 
                  thông qua các sản phẩm và hoạt động kinh doanh của mình.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Đội ngũ của chúng tôi</h2>
              <p className="text-lg text-muted-foreground">
                Gặp gỡ những con người tài năng và đam mê đằng sau thành công của SolarTech.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-solar-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                  alt="Trần Minh Quân - CEO"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg">Trần Minh Quân</h3>
                  <p className="text-primary">CEO / Founder</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-solar-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80"
                  alt="Nguyễn Thị Hương - COO"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg">Nguyễn Thị Hương</h3>
                  <p className="text-primary">COO</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-solar-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1556157382-97eda2f9e69d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Lê Đức Thành - CTO"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg">Lê Đức Thành</h3>
                  <p className="text-primary">CTO</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-solar-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=922&q=80"
                  alt="Phạm Thị Mai - Marketing Director"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg">Phạm Thị Mai</h3>
                  <p className="text-primary">Marketing Director</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Achievements */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Thành tựu của chúng tôi</h2>
              <p className="text-lg text-muted-foreground">
                Những con số và giải thưởng minh chứng cho hành trình phát triển của SolarTech.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
              <div className="bg-white dark:bg-solar-900 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                <p className="text-muted-foreground">Khách hàng hài lòng</p>
              </div>
              
              <div className="bg-white dark:bg-solar-900 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <p className="text-muted-foreground">Dự án lớn</p>
              </div>
              
              <div className="bg-white dark:bg-solar-900 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-primary mb-2">50 MW</div>
                <p className="text-muted-foreground">Công suất lắp đặt</p>
              </div>
              
              <div className="bg-white dark:bg-solar-900 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-primary mb-2">20+</div>
                <p className="text-muted-foreground">Giải thưởng</p>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-solar-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <img 
                    src="https://via.placeholder.com/120x80?text=Award+1"
                    alt="Top Solar Solution Provider 2024"
                    className="mx-auto h-20 w-auto object-contain"
                  />
                </div>
                <h3 className="text-center font-bold mb-2">Top Solar Solution Provider 2024</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Giải thưởng cho nhà cung cấp giải pháp năng lượng mặt trời hàng đầu Việt Nam.
                </p>
              </div>
              
              <div className="bg-white dark:bg-solar-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <img 
                    src="https://via.placeholder.com/120x80?text=Award+2"
                    alt="Green Energy Innovation 2023"
                    className="mx-auto h-20 w-auto object-contain"
                  />
                </div>
                <h3 className="text-center font-bold mb-2">Green Energy Innovation 2023</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Giải thưởng đổi mới sáng tạo trong lĩnh vực năng lượng xanh.
                </p>
              </div>
              
              <div className="bg-white dark:bg-solar-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <img 
                    src="https://via.placeholder.com/120x80?text=Award+3"
                    alt="Best Customer Service 2023"
                    className="mx-auto h-20 w-auto object-contain"
                  />
                </div>
                <h3 className="text-center font-bold mb-2">Best Customer Service 2023</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Giải thưởng cho dịch vụ khách hàng xuất sắc trong ngành năng lượng tái tạo.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Sẵn sàng chuyển đổi sang năng lượng mặt trời?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Hãy liên hệ với chúng tôi ngay hôm nay để nhận tư vấn miễn phí và bắt đầu 
                hành trình tiết kiệm năng lượng với SolarTech.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center bg-white text-primary hover:bg-white/90 font-medium rounded-md px-6 py-3 transition-colors"
              >
                Liên hệ ngay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default About;
