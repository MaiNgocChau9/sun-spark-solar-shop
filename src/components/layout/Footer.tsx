
import { Link } from 'react-router-dom';
import { Sun, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/50 pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary mb-4">
              <Sun className="h-8 w-8" />
              <span>SolarTech</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Chúng tôi cung cấp các giải pháp năng lượng mặt trời hiệu quả,
              tiết kiệm chi phí và thân thiện với môi trường.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Giải pháp
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Sản phẩm</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products/solar-panels"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Tấm pin mặt trời
                </Link>
              </li>
              <li>
                <Link
                  to="/products/inverters"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Bộ Inverter
                </Link>
              </li>
              <li>
                <Link
                  to="/products/batteries"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Bộ lưu trữ điện
                </Link>
              </li>
              <li>
                <Link
                  to="/products/accessories"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Phụ kiện
                </Link>
              </li>
              <li>
                <Link
                  to="/products/monitoring"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  Hệ thống giám sát
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1 text-primary" />
                <span className="text-muted-foreground">
                  123 Đường Lê Lợi, <br />
                  Quận 1, Thành phố Hồ Chí Minh, <br />
                  Việt Nam
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-primary" />
                <a
                  href="tel:+842839123456"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +84 28 3912 3456
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-primary" />
                <a
                  href="mailto:info@solartech.vn"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  info@solartech.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SolarTech. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
