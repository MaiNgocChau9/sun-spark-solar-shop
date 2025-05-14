
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Mail } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

const AdminHeader = () => {
  const { currentUser } = useAuth();

  return (
    <header className="h-16 border-b dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center px-6">
      <div className="flex-1"></div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
          <Mail size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>
        <Link to="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          Về trang chủ
        </Link>
        <Avatar>
          <img
            src={currentUser?.photoURL || "https://github.com/shadcn.png"}
            alt={currentUser?.displayName || "Admin user"}
          />
        </Avatar>
      </div>
    </header>
  );
};

export default AdminHeader;
