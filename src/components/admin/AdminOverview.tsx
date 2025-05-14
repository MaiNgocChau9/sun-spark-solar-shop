
import React from 'react';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const AdminOverview = () => {
  // Trong thực tế, các dữ liệu này sẽ được lấy từ database
  const stats = [
    {
      title: "Tổng sản phẩm",
      value: "48",
      icon: Package,
      change: "+12%",
      trend: "up"
    },
    {
      title: "Đơn hàng mới",
      value: "16",
      icon: ShoppingCart,
      change: "+24%",
      trend: "up"
    },
    {
      title: "Người dùng mới",
      value: "573",
      icon: Users,
      change: "+9.1%",
      trend: "up"
    },
    {
      title: "Doanh thu tháng",
      value: "68.5M",
      icon: DollarSign,
      change: "-5.4%",
      trend: "down"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700"
          >
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-primary/10 text-primary">
                <stat.icon size={24} />
              </div>
              <div className="ml-auto text-sm flex items-center">
                {stat.trend === "up" ? (
                  <>
                    <ArrowUp size={16} className="text-green-500" />
                    <span className="text-green-500">{stat.change}</span>
                  </>
                ) : (
                  <>
                    <ArrowDown size={16} className="text-red-500" />
                    <span className="text-red-500">{stat.change}</span>
                  </>
                )}
              </div>
            </div>
            <h3 className="mt-4 text-2xl font-bold">{stat.value}</h3>
            <p className="text-gray-500 dark:text-gray-400">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Đơn hàng gần đây</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-4 text-sm font-medium text-gray-500">
              <div>Mã đơn</div>
              <div>Khách hàng</div>
              <div>Trạng thái</div>
              <div>Tổng tiền</div>
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="grid grid-cols-4 text-sm py-2 border-b last:border-0">
                  <div className="font-medium">ORD-{(10000 + i).toString()}</div>
                  <div>Nguyễn Văn A</div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      i % 3 === 0 
                        ? "bg-yellow-100 text-yellow-800" 
                        : i % 3 === 1
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                    }`}>
                      {i % 3 === 0 
                        ? "Chờ xác nhận" 
                        : i % 3 === 1
                          ? "Đã xác nhận"
                          : "Hoàn thành"}
                    </span>
                  </div>
                  <div>{(2 + i * 1.5).toFixed(1)}M VND</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Sản phẩm bán chạy</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 text-sm font-medium text-gray-500">
              <div>Sản phẩm</div>
              <div>Đã bán</div>
              <div>Doanh thu</div>
            </div>
            <div className="space-y-4">
              {[
                { name: "Tấm Pin A1 Pro", sold: 124, revenue: "434M" },
                { name: "Inverter Solar 5kW", sold: 98, revenue: "1.47B" },
                { name: "Bộ lưu trữ điện", sold: 76, revenue: "912M" },
                { name: "Pin tuổi thọ cao", sold: 65, revenue: "325M" },
                { name: "Bộ điều khiển", sold: 57, revenue: "273M" },
              ].map((product, i) => (
                <div key={i} className="grid grid-cols-3 text-sm items-center">
                  <div className="font-medium">{product.name}</div>
                  <div>{product.sold} chiếc</div>
                  <div>{product.revenue} VND</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
