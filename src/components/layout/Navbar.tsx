
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Sun, Search } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
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
          <div className="flex items-center space-x-4 mt-4 pt-4 border-t">
            <button className="p-2 rounded-full hover:bg-muted transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link 
              to="/cart" 
              className="p-2 rounded-full hover:bg-muted transition-colors relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
