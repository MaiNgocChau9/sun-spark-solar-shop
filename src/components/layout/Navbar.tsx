
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, Sun, Search, User, LogOut } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { auth, signOutFirebase } from '@/firebase';
import { getCart } from '@/services/cartService'; // Import getCart

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const fetchCartItemsCount = async () => {
      if (currentUser) {
        try {
          const cart = await getCart(currentUser.uid);
          const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
          setCartItemCount(count);
        } catch (error) {
          console.error("Error fetching cart for navbar:", error);
          setCartItemCount(0); // Reset nếu có lỗi
        }
      } else {
        setCartItemCount(0); // Reset khi không có user
      }
    };

    fetchCartItemsCount();
    // TODO: Để cập nhật real-time hơn, cần lắng nghe sự kiện thay đổi giỏ hàng
    // hoặc sử dụng onSnapshot nếu CartContext được triển khai.
    // Hiện tại, số lượng sẽ cập nhật khi currentUser thay đổi (đăng nhập/đăng xuất)
    // hoặc khi Navbar được re-render vì lý do khác (ví dụ: route change).
  }, [currentUser, location]); // Thêm location để có thể cập nhật khi điều hướng (dù không lý tưởng)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close menu when route changes
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { title: 'Trang chủ', path: '/' },
    { title: 'Sản phẩm', path: '/products' },
    { title: 'Giải pháp', path: '/solutions' },
    { title: 'Blog', path: '/blog' },
    { title: 'Về chúng tôi', path: '/about' },
    { title: 'Liên hệ', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-solar-900/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-2xl font-bold text-primary"
          >
            <Sun className="h-8 w-8" />
            <span>Solar Diệp Châu</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-foreground'
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Tìm kiếm"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-muted transition-colors relative"
              aria-label="Giỏ hàng"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            {currentUser ? (
              <>
                <span className="text-sm text-foreground">
                  Chào, {currentUser.displayName || currentUser.email?.split('@')[0]}
                </span>
                <button
                  onClick={async () => {
                    try {
                      await signOutFirebase(auth); // auth cần được import từ firebase.ts hoặc truyền vào
                      navigate('/'); // Điều hướng về trang chủ sau khi đăng xuất
                    } catch (error) {
                      console.error("Error signing out: ", error);
                    }
                  }}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label="Đăng xuất"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen bg-background' : 'max-h-0'
        }`}
      >
        <div className="space-y-1 px-4 pb-5 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block py-2 px-3 rounded-md font-medium ${
                location.pathname === link.path
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-muted text-foreground'
              }`}
            >
              {link.title}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t">
            {currentUser ? (
              <>
                <div className="flex items-center space-x-2 px-3 py-2">
                  <User className="h-5 w-5 text-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {currentUser.displayName || currentUser.email}
                  </span>
                </div>
                <button
                  onClick={async () => {
                    try {
                      await signOutFirebase(auth); // auth cần được import từ firebase.ts hoặc truyền vào
                      navigate('/');
                      setIsOpen(false); // Đóng menu sau khi đăng xuất
                    } catch (error) {
                      console.error("Error signing out: ", error);
                    }
                  }}
                  className="w-full text-left block py-2 px-3 rounded-md font-medium hover:bg-muted text-foreground"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 rounded-md font-medium hover:bg-muted text-foreground"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 rounded-md font-medium hover:bg-muted text-foreground"
                >
                  Đăng ký
                </Link>
              </>
            )}
            <div className="flex items-center space-x-4 mt-4 pt-4 border-t">
              <button className="p-2 rounded-full hover:bg-muted transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-muted transition-colors relative"
              >
                <ShoppingCart className="h-5 w-5" />
                 {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
