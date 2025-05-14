
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminOverview from '@/components/admin/AdminOverview';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  
  // Redirect if not admin (you'll need to add isAdmin field to user data)
  if (!currentUser) {
    return <Navigate to="/login?redirect=/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <AdminOverview />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
