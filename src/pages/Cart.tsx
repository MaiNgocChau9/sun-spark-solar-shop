import { useState, useEffect } from 'react'; // Thêm useEffect
import { Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getCart as fetchCartFS, 
  updateCartItemQuantity as updateCartItemQuantityFS, 
  removeCartItem as removeCartItemFS,
  CartItem as FirestoreCartItem // Đổi tên để tránh xung đột
} from '@/services/cartService';

// Interface cho item trong state của component, có thể thêm các trường UI nếu cần
interface CartPageItem extends FirestoreCartItem {
  // Có thể thêm các trường chỉ dùng cho UI ở đây nếu cần
  // ví dụ: brand, description (nếu không có trong FirestoreCartItem)
  brand?: string; 
  description?: string;
}


const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartPageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      // Nếu chưa đăng nhập, có thể chuyển hướng đến trang đăng nhập
      // Hoặc hiển thị thông báo yêu cầu đăng nhập
      // Tạm thời, sẽ hiển thị giỏ hàng trống và thông báo
      setLoading(false);
      setCartItems([]); // Xóa item placeholder nếu có
      // navigate('/login?redirect=/cart'); // Tùy chọn: chuyển hướng
      return;
    }

    const loadCart = async () => {
      setLoading(true);
      setError(null);
      try {
        const cartData = await fetchCartFS(currentUser.uid);
        // Chuyển đổi FirestoreCartItem sang CartPageItem nếu cần
        // Hiện tại, giả sử FirestoreCartItem đã đủ thông tin hoặc sẽ lấy thêm sau
        setCartItems(cartData.items as CartPageItem[]); 
      } catch (err: any) {
        console.error("Failed to load cart:", err);
        setError(err.message || "Không thể tải giỏ hàng.");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [currentUser, navigate]);

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (!currentUser) return;
    if (newQuantity < 0) return; // Số lượng không thể âm

    // Cập nhật UI trước (optimistic update)
    const originalItems = [...cartItems];
    if (newQuantity === 0) {
      setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
    
    try {
      await updateCartItemQuantityFS(currentUser.uid, productId, newQuantity);
    } catch (err) {
      console.error("Failed to update quantity:", err);
      setError("Lỗi cập nhật số lượng.");
      setCartItems(originalItems); // Rollback nếu lỗi
    }
  };

  const handleRemoveItem = async (productId: string) => {
    if (!currentUser) return;
    
    const originalItems = [...cartItems];
    setCartItems(prevItems => prevItems.filter(item => item.productId !== productId)); // Optimistic update

    try {
      await removeCartItemFS(currentUser.uid, productId);
    } catch (err) {
      console.error("Failed to remove item:", err);
      setError("Lỗi xóa sản phẩm.");
      setCartItems(originalItems); // Rollback
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = subtotal > 0 ? 50000 : 0; // Phí ship nếu có hàng
  const total = subtotal + shippingCost;

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="bg-gray-50 dark:bg-solar-900/30 min-h-screen pt-20 md:pt-24 flex items-center justify-center">
          <p className="text-xl">Đang tải giỏ hàng...</p> {/* Hoặc spinner */}
        </main>
        <Footer />
      </>
    );
  }
  
  if (!currentUser && !loading) {
     return (
      <>
        <Navbar />
        <main className="bg-gray-50 dark:bg-solar-900/30 min-h-screen pt-20 md:pt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
            <Card className="py-12 shadow-lg">
              <CardContent>
                <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
                <p className="text-xl md:text-2xl text-foreground mb-4">Vui lòng đăng nhập để xem giỏ hàng.</p>
                <Button size="lg" asChild className="btn-primary">
                  <Link to={`/login?redirect=${encodeURIComponent('/cart')}`}>Đăng nhập</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    );
  }


  return (
    <>
      <Navbar />
      <main className="bg-gray-50 dark:bg-solar-900/30 min-h-screen pt-20 md:pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex items-center justify-center mb-10 md:mb-12">
            <ShoppingBag className="w-10 h-10 mr-3 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Giỏ hàng của bạn</h1>
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
                  <Card key={item.productId} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 card-hover">
                    <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                      <img
                        src={item.image || '/placeholder.svg'} // Sử dụng placeholder nếu không có image
                        alt={item.name}
                        className="w-full sm:w-32 h-32 object-cover rounded-lg border border-border shadow-sm"
                      />
                      <div className="flex-grow">
                        <Link to={`/products/${item.productId}`} className="hover:underline">
                          <h3 className="text-lg md:text-xl font-semibold text-foreground hover:text-primary transition-colors">{item.name}</h3>
                        </Link>
                        {/* Giả sử brand và description không có trong FirestoreCartItem, cần lấy từ nguồn khác hoặc bỏ đi */}
                        {/* <p className="text-sm text-muted-foreground mt-1">Thương hiệu: {item.brand}</p> */}
                        {/* <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p> */}
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
                            onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 0} // Cho phép giảm về 0 để xóa
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                                const newQty = parseInt(e.target.value);
                                if (!isNaN(newQty)) {
                                    handleQuantityChange(item.productId, newQty);
                                }
                            }}
                            className="w-14 text-center h-8 sm:h-9"
                            min="0" // Cho phép nhập 0 để xóa
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 sm:h-9 sm:w-9"
                            onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 flex items-center gap-1.5"
                          onClick={() => handleRemoveItem(item.productId)}
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
