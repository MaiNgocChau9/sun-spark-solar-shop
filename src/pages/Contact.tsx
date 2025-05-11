import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chatbot/Chatbot";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Gửi thành công!",
        description: "Chúng tôi đã nhận được thông tin của bạn và sẽ liên hệ lại trong thời gian sớm nhất.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Liên hệ với chúng tôi</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Hãy liên hệ với chúng tôi, đội ngũ của Solar Diệp Châu luôn sẵn sàng hỗ trợ bạn.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-solar-900 rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Điện thoại</h3>
              <p className="text-muted-foreground mb-2">Gọi ngay cho chúng tôi</p>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText("0987261283");
                  toast({ title: "Đã sao chép số điện thoại!", description: "0987 261 283" });
                }}
                className="font-medium text-primary hover:underline focus:outline-none"
              >
                0987 261 283
              </button>
            </div>
            
            <div className="bg-white dark:bg-solar-900 rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4">
                <Mail className="h-6 w-6" /> 
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground mb-2">Gửi email cho chúng tôi</p>
              <a 
                href="mailto:info@solardiepchau.vn" 
                className="font-medium text-primary hover:underline"
              >
                info@solardiepchau.vn
              </a>
            </div>
            
            <div className="bg-white dark:bg-solar-900 rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Địa chỉ</h3>
              <p className="text-muted-foreground mb-2">Đến thăm văn phòng của chúng tôi</p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Cửa hàng Điện nước Diệp Châu, Ấp 4, xã Thạnh Phú, huyện Vĩnh Cửu, tỉnh Đồng Nai")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                Ấp 4, xã Thạnh Phú, huyện Vĩnh Cửu, tỉnh Đồng Nai
              </a>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Contact Form */}
            <div className="bg-white dark:bg-solar-900 rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Gửi tin nhắn cho chúng tôi</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Nguyễn Văn A"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Số điện thoại
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="0901234567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Chủ đề <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="">-- Chọn chủ đề --</option>
                      <option value="Tư vấn sản phẩm">Tư vấn sản phẩm</option>
                      <option value="Báo giá">Báo giá</option>
                      <option value="Hỗ trợ kỹ thuật">Hỗ trợ kỹ thuật</option>
                      <option value="Khảo sát lắp đặt">Khảo sát lắp đặt</option>
                      <option value="Khiếu nại">Khiếu nại</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    placeholder="Chi tiết yêu cầu của bạn..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin mr-2"></div>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Gửi tin nhắn
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Map */}
            <div className="bg-white dark:bg-solar-900 rounded-xl shadow-sm overflow-hidden">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent("Cửa hàng Điện nước Diệp Châu, Ấp 4, xã Thạnh Phú, huyện Vĩnh Cửu, tỉnh Đồng Nai")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Solar Diệp Châu Map Location"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Contact;
