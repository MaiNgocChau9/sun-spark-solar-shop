import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Placeholder cart item data
const placeholderItems = [
  {
    id: '1',
    name: 'Tấm pin mặt trời Mono 550W',
    price: 3500000,
    quantity: 1,
    image: '/placeholder.svg', // Replace with actual image path
    brand: 'Solar Diệp Châu',
    description: 'Công suất cao, hiệu suất ổn định, phù hợp cho hộ gia đình và doanh nghiệp.',
  },
  {
    id: '2',
    name: 'Biến tần Inverter Hybrid 5kW',
    price: 12000000,
    quantity: 1,
    image: '/placeholder.svg', // Replace with actual image path
    brand: 'Solar Diệp Châu',
    description: 'Kết hợp lưu trữ năng lượng, tối ưu hóa việc sử dụng điện mặt trời.',
  },
];

const CartPage = () => {
  // In a real app, cartItems would come from state/context
  const [cartItems, setCartItems] = useState(placeholderItems);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Or remove item if quantity is 0
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = 50000; // Example shipping cost
  const total = subtotal + shippingCost;

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 dark:bg-solar-900/30 min-h-screen pt-20 md:pt-24"> {/* Adjusted padding for Navbar */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex items-center justify-center mb-10 md:mb-12">
            <ShoppingBag className="w-10 h-10 mr-3 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Giỏ hàng của bạn</h1>
          </div>

          {cartItems.length === 0 ? (
            <Card className="text-center py-12 shadow-lg">
              <CardContent>
                <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
                <p className="text-xl md:text-2xl text-foreground mb-4">Giỏ hàng của bạn đang trống.</p>
                <p className="text-muted-foreground mb-8">Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!</p>
                <Button size="lg" asChild className="btn-primary">
                  <Link to="/products">Tiếp tục mua sắm</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Cart Items Section */}
              <div className="lg:col-span-8 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground mb-1">Chi tiết sản phẩm</h2>
                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 card-hover">
                    <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-32 h-32 object-cover rounded-lg border border-border shadow-sm"
                      />
                      <div className="flex-grow">
                        <Link to={`/products/${item.id}`} className="hover:underline">
                          <h3 className="text-lg md:text-xl font-semibold text-foreground hover:text-primary transition-colors">{item.name}</h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">Thương hiệu: {item.brand}</p>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                        <p className="text-primary font-semibold text-lg mt-2">
                          {item.price.toLocaleString('vi-VN')} đ
                        </p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-3 sm:gap-4 w-full sm:w-auto">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 sm:h-9 sm:w-9"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            className="w-14 text-center h-8 sm:h-9"
                            min="1"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 sm:h-9 sm:w-9"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 flex items-center gap-1.5"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" /> Xóa
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary Section */}
              <div className="lg:col-span-4 sticky top-24">
                <Card className="shadow-xl border-2 border-primary/20">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl md:text-3xl font-semibold text-foreground text-center">Tóm tắt đơn hàng</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0">
                    <Separator className="my-3"/>
                    <div className="flex justify-between text-md">
                      <span className="text-muted-foreground">Tạm tính</span>
                      <span className="font-medium text-foreground">{subtotal.toLocaleString('vi-VN')} đ</span>
                    </div>
                    <div className="flex justify-between text-md">
                      <span className="text-muted-foreground">Phí vận chuyển</span>
                      <span className="font-medium text-foreground">{shippingCost.toLocaleString('vi-VN')} đ</span>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between font-bold text-xl md:text-2xl text-primary">
                      <span>Tổng cộng</span>
                      <span>{total.toLocaleString('vi-VN')} đ</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3 pt-5">
                    <Button size="lg" className="w-full btn-primary text-base py-6">
                      Tiến hành thanh toán
                    </Button>
                    <Button variant="outline" size="lg" className="w-full text-base py-6" asChild>
                      <Link to="/products">Tiếp tục mua sắm</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
