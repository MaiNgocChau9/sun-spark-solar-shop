import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserOrders } from '@/services/orderService';
import { OrderType } from '@/types';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const statusColor = (status: string) => {
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

const formatDate = (date: any) => {
  if (!date) return '';
  try {
    // Firestore timestamp
    if (date.seconds) {
      return new Date(date.seconds * 1000).toLocaleString('vi-VN');
    }
    return new Date(date).toLocaleString('vi-VN');
  } catch {
    return '';
  }
};

const UserOrders = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setOrders([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    getUserOrders(currentUser.uid)
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [currentUser]);

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 dark:bg-solar-900/30 min-h-screen pt-20 md:pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl font-bold mb-8 text-center">Đơn hàng của tôi</h1>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="ml-2">Đang tải...</p>
            </div>
          ) : orders.length === 0 ? (
            <Card className="text-center py-12 shadow-lg">
              <CardContent>
                <p className="text-xl md:text-2xl text-foreground mb-4">Bạn chưa có đơn hàng nào.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <Card key={order.id} className="shadow-md">
                  <CardHeader className="flex flex-row justify-between items-center pb-2">
                    <CardTitle className="text-lg">
                      Đơn #{order.id.slice(0, 8).toUpperCase()}
                    </CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(order.status)}`}>
                      {translateStatus(order.status)}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                      <div>
                        <div><span className="font-medium">Ngày đặt:</span> {formatDate(order.orderDate)}</div>
                        <div><span className="font-medium">Tổng tiền:</span> {order.totalAmount?.toLocaleString('vi-VN')} đ</div>
                        <div><span className="font-medium">Ghi chú:</span> {order.notes || 'Không có'}</div>
                      </div>
                      <div>
                        <span className="font-medium">Sản phẩm:</span>
                        <ul className="list-disc ml-5">
                          {order.items?.map((item: any) => (
                            <li key={item.productId}>
                              {item.name} x {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UserOrders;
