
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { collection, getDocs, doc, updateDoc } from '@/firebase';
import { db } from '@/firebase';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { OrderType } from '@/types';
import { Check } from 'lucide-react';

const AdminOrders = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Redirect if not admin
  if (!currentUser) {
    return <Navigate to="/login?redirect=/admin/orders" replace />;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, 'orders');
        const snapshot = await getDocs(ordersCollection);
        const ordersList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as OrderType));
        
        // Sort by date descending
        ordersList.sort((a, b) => 
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );
        
        setOrders(ordersList);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách đơn hàng",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [toast]);

  const handleConfirmOrder = async (id: string) => {
    try {
      await updateDoc(doc(db, 'orders', id), {
        status: 'confirmed'
      });
      
      setOrders(orders.map(order => 
        order.id === id ? { ...order, status: 'confirmed' } : order
      ));
      
      toast({
        title: "Thành công",
        description: "Đã xác nhận đơn hàng",
      });
    } catch (error) {
      console.error('Error confirming order:', error);
      toast({
        title: "Lỗi",
        description: "Không thể xác nhận đơn hàng",
        variant: "destructive",
      });
    }
  };

  const handleCompleteOrder = async (id: string) => {
    try {
      await updateDoc(doc(db, 'orders', id), {
        status: 'completed'
      });
      
      setOrders(orders.map(order => 
        order.id === id ? { ...order, status: 'completed' } : order
      ));
      
      toast({
        title: "Thành công",
        description: "Đã hoàn thành đơn hàng",
      });
    } catch (error) {
      console.error('Error completing order:', error);
      toast({
        title: "Lỗi",
        description: "Không thể hoàn thành đơn hàng",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const translateStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="ml-2">Đang tải...</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn hàng</TableHead>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Ngày đặt</TableHead>
                    <TableHead>Tổng tiền</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id.slice(0, 8).toUpperCase()}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{formatDate(order.orderDate)}</TableCell>
                        <TableCell>
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          }).format(order.totalAmount)}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
                            {translateStatus(order.status)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {order.status === 'pending' && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-500 hover:text-blue-700"
                                onClick={() => handleConfirmOrder(order.id)}
                              >
                                <Check size={16} className="mr-1" />
                                Xác nhận
                              </Button>
                            )}
                            {order.status === 'confirmed' && (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleCompleteOrder(order.id)}
                              >
                                <Check size={16} className="mr-1" />
                                Hoàn thành
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Không có đơn hàng nào
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminOrders;
