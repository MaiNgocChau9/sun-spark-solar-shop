import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, ShoppingCart, User, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { signOutFirebase, auth, db, doc, getDoc } from '@/firebase'; // Import db, doc, getDoc
import { useToast } from '@/hooks/use-toast';
import SearchBox from '@/components/layout/SearchBox';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { currentUser } = useAuth();
  const [dbAvatar, setDbAvatar] = useState(""); // State for avatar from Firestore
  const { toast } = useToast();
  const navigate = useNavigate();
  const isAuthenticated = !!currentUser;

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showUserMenu && !target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  // Fetch cart count
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!currentUser) {
        setCartCount(0);
        return;
      }

      try {
        // This would be replaced with actual cart data fetching
        // For now, just simulate a cart count
        setCartCount(3);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartCount();
  }, [currentUser]);

  // Fetch Firebase avatar from Firestore
  useEffect(() => {
    const fetchAvatar = async () => {
      if (currentUser && currentUser.email) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.email));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setDbAvatar(data.avatar || "");
          } else {
            setDbAvatar(""); // Clear avatar if user doc doesn't exist
          }
        } catch (error) {
          console.error("Error fetching user avatar:", error);
          setDbAvatar(""); // Clear avatar on error
        }
      } else {
        setDbAvatar(""); // Clear avatar if no current user or email
      }
    };
    fetchAvatar();
  }, [currentUser]); // Re-fetch when currentUser changes

  const handleLogout = async () => {
    try {
      // signOutFirebase cần truyền vào auth
      await signOutFirebase(auth);
      toast({
        title: "Đăng xuất thành công",
        description: "Hẹn gặp lại bạn lần sau!",
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Lỗi đăng xuất",
        description: "Đã có lỗi xảy ra khi đăng xuất",
        variant: "destructive",
      });
    }
  };

  const navLinks = [
    { to: "/", label: "Trang chủ" },
    { to: "/products", label: "Sản phẩm" },
    { to: "/solutions", label: "Giải pháp" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "Về chúng tôi" },
    { to: "/contact", label: "Liên hệ" },
  ];

  return (
    <header className="fixed w-full top-0 left-0 right-0 z-40 bg-white dark:bg-black dark:text-white">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-primary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-8 w-8">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            SolarTech
          </Link>
          <div className="hidden md:flex ml-10 space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-x-6">
          <div className="w-64">
            <SearchBox />
          </div>
          
          <div className="flex items-center gap-x-4">
            <ThemeToggle />
            
            <Link
              to="/cart"
              className="inline-flex relative rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 p-2"
            >
              <ShoppingCart size={24} />
              {isAuthenticated && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border">
                    {dbAvatar ? ( // Use dbAvatar here
                      <img src={dbAvatar} alt={currentUser?.displayName || 'User'} />
                    ) : currentUser?.photoURL ? (
                      <img src={currentUser.photoURL} alt={currentUser.displayName || 'User'} />
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                        {currentUser?.displayName || currentUser?.email}
                      </div>
                      
                      
                      {/* Chỉ hiển thị cho admin, ví dụ kiểm tra email */}
                      {currentUser?.email === 'admin@gmail.com' && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Quản trị
                        </Link>
                      )}
                      
                      <Link
                        to="/account"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Tài khoản
                      </Link>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-x-1 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium"
              >
                <User size={20} />
                <span>Đăng nhập</span>
              </Link>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <Link
            to="/cart"
            className="inline-flex relative rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 p-2"
          >
            <ShoppingCart size={24} />
            {isAuthenticated && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
            <div className="container py-4">
              <div className="mb-4">
                <SearchBox />
              </div>
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-md transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
                
                <div className="h-px bg-gray-200 dark:bg-gray-800 my-2"></div>
                
                <div className="flex items-center justify-between px-4 py-3">
                  <ThemeToggle />
                  
                  {isAuthenticated ? (
                    <div className="flex flex-col gap-y-1">
                      {/* Chỉ hiển thị cho admin, ví dụ kiểm tra email */}
                      {currentUser?.email === 'admin@gmail.com' && (
                        <Link
                          to="/admin"
                          className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Quản trị
                        </Link>
                      )}
                      <button
                        className="px-3 py-2 rounded-md text-red-600"
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        Đăng xuất
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="px-4 py-2 bg-primary text-white rounded-md font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Đăng nhập
                    </Link>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    );
  };

export default Navbar;
