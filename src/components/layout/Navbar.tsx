import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, Sun, Search, User, LogOut } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { auth, signOutFirebase } from '@/firebase';
import { getCart } from '@/services/cartService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchCartItemsCount = async () => {
      if (currentUser) {
        try {
          const cart = await getCart(currentUser.uid);
          const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
          setCartItemCount(count);
        } catch (error) {
          console.error("Error fetching cart for navbar:", error);
          setCartItemCount(0);
        }
      } else {
        setCartItemCount(0);
      }
    };

    fetchCartItemsCount();
  }, [currentUser, location]);

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
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { title: 'Trang chủ', path: '/' },
    { title: 'Sản phẩm', path: '/products' },
    { title: 'Giải pháp', path: '/solutions' },
    { title: 'Blog', path: '/blog' },
    { title: 'Về chúng tôi', path: '/about' },
    { title: 'Liên hệ', path: '/contact' },
  ];

  const renderAuthButtons = () => {
    if (currentUser) {
      // Đã đăng nhập
      if (windowWidth >= 1240) { // Thay đổi breakpoint từ 1200px thành 1240px
        // Màn hình lớn: Hiển thị tên user và nút Đăng xuất
        return (
          <>
            <span className="text-sm text-foreground">
              Chào, {currentUser.displayName || currentUser.email?.split('@')[0]}
            </span>
            <button
              onClick={async () => {
                try {
                  await signOutFirebase(auth);
                  navigate('/');
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
        );
      } else { // Điều kiện này bao gồm 1100px <= windowWidth < 1240px (do logic hiển thị desktop menu)
        // Màn hình trung bình: Chỉ hiển thị tên user (hoặc icon) và nút Đăng xuất
         return (
          <>
             <span className="text-sm text-foreground hidden lg:inline"> 
               Chào, {currentUser.displayName || currentUser.email?.split('@')[0]}
             </span>
             <button
               onClick={async () => {
                 try {
                   await signOutFirebase(auth);
                   navigate('/');
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
         );
      }
    } else {
      // Chưa đăng nhập
      if (windowWidth >= 1240) { // Thay đổi breakpoint từ 1200px thành 1240px
        // Màn hình lớn: Hiển thị cả Đăng nhập và Đăng ký
        return (
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
        );
      } else { // Điều kiện này bao gồm 1100px <= windowWidth < 1240px
        // Màn hình trung bình: Chỉ hiển thị nút Đăng nhập
        return (
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Đăng nhập
          </Link>
        );
      }
    }
  };

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
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary"
          >
            <Sun className="h-8 w-8" />
            <span>Solar Diệp Châu</span>
          </Link>

          {/* Desktop Navigation & Right Icons Container */}
          {windowWidth >= 1130 && ( // Thay đổi breakpoint từ 1100px thành 1130px
            <div className="flex items-center">
              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center space-x-6 mr-6"> {/* lg:flex để đảm bảo nó ẩn trên tablet nếu cần */}
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

              {/* Right Icons (Search, Cart, Auth) */}
              {/* Điều kiện windowWidth >= 900 đã được xử lý trong renderAuthButtons và logic chung */}
              <div className="flex items-center space-x-4">
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
                {renderAuthButtons()}
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          {windowWidth < 1130 && ( // Thay đổi breakpoint từ 1100px thành 1130px
            <div className="flex items-center"> {/* Không cần md:hidden ở đây nữa */}
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
          )}
        </div>
      </div>

      {/* Mobile Menu Content */}
      {windowWidth < 1130 && ( // Thay đổi breakpoint từ 1100px thành 1130px
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${ // Bỏ md:hidden
            isOpen ? 'max-h-screen bg-background shadow-lg' : 'max-h-0'
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
                onClick={() => setIsOpen(false)}
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
                        await signOutFirebase(auth);
                        navigate('/');
                        setIsOpen(false);
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
      )}
    </nav>
  );
};

export default Navbar;
