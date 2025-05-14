
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  ShoppingCart, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { signOutFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

const AdminSidebar = () => {
  const location = useLocation();
  const { toast } = useToast();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOutFirebase();
      toast({
        title: "Đăng xuất thành công",
        description: "Bạn đã đăng xuất khỏi trang quản trị",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Lỗi đăng xuất",
        description: "Đã có lỗi xảy ra khi đăng xuất",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/admin',
      icon: <LayoutDashboard size={20} />
    },
    {
      title: 'Sản phẩm',
      path: '/admin/products',
      icon: <Package size={20} />
    },
    {
      title: 'Bài viết',
      path: '/admin/blog',
      icon: <FileText size={20} />
    },
    {
      title: 'Đơn hàng',
      path: '/admin/orders',
      icon: <ShoppingCart size={20} />
    },
    {
      title: 'Cài đặt',
      path: '/admin/settings',
      icon: <Settings size={20} />
    }
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 h-screen sticky top-0">
      <div className="h-full flex flex-col">
        <div className="p-5 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold">Admin Dashboard</h2>
          {currentUser && (
            <div className="mt-2 text-sm text-muted-foreground truncate">
              {currentUser.email}
            </div>
          )}
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-500 transition-colors"
          >
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
