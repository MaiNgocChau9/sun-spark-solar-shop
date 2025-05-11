
import { ProductType } from '@/types';

export const products: ProductType[] = [
  {
    id: "sp001",
    name: "Tấm Pin Năng Lượng Mặt Trời A1 Pro",
    description: "Tấm pin A1 Pro với hiệu suất cao 22%, công nghệ đơn tinh thể, khả năng hấp thụ ánh sáng mặt trời tối ưu ngay cả trong điều kiện ánh sáng yếu hoặc có bóng râm một phần. Sản phẩm bền bỉ với khả năng chống chọi với các điều kiện thời tiết khắc nghiệt, bảo hành 25 năm.",
    category: "Tấm Pin Mặt Trời",
    price: 3500000,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
      "https://images.unsplash.com/photo-1611365892117-00d77d9a4efd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
    rating: 5,
    reviewCount: 127,
    featured: true,
    specs: {
      "Công suất": "450W",
      "Kích thước": "1755 x 1038 x 35mm",
      "Hiệu suất": "22%",
      "Tuổi thọ": "25 năm",
      "Chất liệu": "Mono Crystalline",
      "Bảo hành": "25 năm"
    },
    stock: 150,
    warranty: "25 năm"
  },
  {
    id: "sp002",
    name: "Bộ Inverter Solar 5kW",
    description: "Bộ inverter công suất 5kW, chuyển đổi điện một chiều từ tấm pin mặt trời thành điện xoay chiều để sử dụng trong gia đình và doanh nghiệp. Thiết kế thông minh với khả năng giám sát từ xa, hiệu suất chuyển đổi lên đến 98%, tích hợp hệ thống bảo vệ quá tải và ngắn mạch.",
    category: "Inverter",
    price: 15000000,
    oldPrice: 17500000,
    image: "https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    rating: 4,
    reviewCount: 89,
    featured: false,
    sale: true,
    specs: {
      "Công suất": "5kW",
      "Hiệu suất": "98%",
      "Điện áp đầu vào": "80-450V DC",
      "Điện áp đầu ra": "220V AC",
      "Kết nối": "WiFi/Bluetooth",
      "Bảo hành": "10 năm"
    },
    stock: 45,
    warranty: "10 năm"
  },
  {
    id: "sp004",
    name: "Bộ Điều Khiển Sạc MPPT 60A",
    description: "Bộ điều khiển sạc MPPT công nghệ mới nhất với dòng điện tối đa 60A, tối ưu hóa quá trình sạc từ tấm pin mặt trời vào ắc quy. Thiết kế với thuật toán theo dõi điểm công suất cực đại, giúp tăng hiệu suất sạc lên đến 30% so với bộ điều khiển PWM truyền thống.",
    category: "Phụ Kiện",
    price: 4800000,
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    rating: 4,
    reviewCount: 56,
    featured: false,
    specs: {
      "Dòng điện tối đa": "60A",
      "Điện áp": "12/24/48V tự động",
      "Công nghệ": "MPPT",
      "Hiệu suất": "97%",
      "Màn hình": "LCD",
      "Bảo hành": "5 năm"
    },
    stock: 68,
    warranty: "5 năm"
  },
  {
    id: "sp006",
    name: "Hệ thống Giám sát Năng lượng Solar",
    description: "Hệ thống giám sát năng lượng mặt trời toàn diện, cho phép theo dõi sản lượng điện, hiệu suất và phát hiện lỗi theo thời gian thực. Tích hợp ứng dụng di động thông minh, cung cấp thông báo và báo cáo định kỳ. Kết nối với các nền tảng đám mây để lưu trữ và phân tích dữ liệu dài hạn.",
    category: "Hệ thống giám sát",
    price: 5600000,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rating: 5,
    reviewCount: 27,
    featured: true,
    specs: {
      "Kết nối": "WiFi/4G/Ethernet",
      "Ứng dụng": "iOS/Android",
      "Tính năng": "Báo cáo, Cảnh báo, Phân tích",
      "Cảm biến": "Điện áp, Dòng điện, Nhiệt độ",
      "Lưu trữ dữ liệu": "Đám mây, 10 năm",
      "Bảo hành": "3 năm"
    },
    stock: 19,
    warranty: "3 năm"
  },
];
