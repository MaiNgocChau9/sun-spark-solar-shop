
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import { Star, ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import { products } from '@/data/products'; // Dữ liệu sản phẩm hiện tại là local
// Cân nhắc: Nếu sản phẩm cũng được lấy từ Firestore, logic fetch product sẽ khác
import { useAuth } from '@/contexts/AuthContext';
import { addToCart } from '@/services/cartService';
import { useToast } from '@/components/ui/use-toast';
import { ProductType } from '@/types';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chatbot/Chatbot";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Simulate API call
    setLoading(true);
    
    setTimeout(() => {
      const foundProduct = products.find(p => p.id === id);
      setProduct(foundProduct || null);
      
      if (foundProduct) {
        setActiveImage(foundProduct.image);
        
        // Get related products (same category, excluding current product)
        const related = products.filter(
          p => p.category === foundProduct.category && p.id !== foundProduct.id
        ).slice(0, 4);
        
        setRelatedProducts(related);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= (product?.stock || 1)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return; // Should not happen if button is enabled

    if (!currentUser) {
      toast({
        title: "Vui lòng đăng nhập",
        description: "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.",
        variant: "destructive",
      });
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname + window.location.search));
      return;
    }

    try {
      const productDataForCart = {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image, // Hoặc activeImage nếu muốn ảnh đang chọn
      };
      await addToCart(currentUser.uid, productDataForCart, quantity);
      toast({
        title: "Thành công!",
        description: `${quantity} x ${product.name} đã được thêm vào giỏ hàng.`,
      });
      // TODO: Cập nhật số lượng trên icon giỏ hàng ở Navbar
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Lỗi",
        description: error.message || "Không thể thêm sản phẩm vào giỏ hàng.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-muted-foreground">Đang tải thông tin sản phẩm...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="container text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
            <p className="mb-8 text-muted-foreground">
              Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
            <Link 
              to="/products" 
              className="btn-primary inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại danh sách sản phẩm
            </Link>
          </div>
        </main>
        <Footer />
        <Chatbot />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="flex text-sm text-muted-foreground mb-6">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <span>/</span>
                <Link to="/products" className="hover:text-primary transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <span>/</span>
                <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-primary transition-colors">
                  {product.category}
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <span>/</span>
                <span className="text-foreground font-medium truncate">{product.name}</span>
              </li>
            </ol>
          </nav>

          {/* Product Detail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg overflow-hidden border">
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="w-full h-auto object-contain aspect-square"
                />
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`border rounded-lg overflow-hidden ${
                        activeImage === img 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'hover:border-muted-foreground/50'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} - Ảnh ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center text-amber-500 mr-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-5 w-5 ${i < product.rating ? 'fill-current' : ''}`} 
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  ({product.reviewCount} đánh giá)
                </span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-primary">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                  </span>
                  
                  {product.oldPrice && (
                    <span className="ml-2 text-muted-foreground line-through">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.oldPrice)}
                    </span>
                  )}
                </div>
                
                <div className="text-sm text-muted-foreground mt-1">
                  Đã bao gồm VAT
                </div>
              </div>
              
              <div className="prose max-w-none mb-6">
                <p>{product.description}</p>
              </div>
              
              {/* Specs */}
              {product.specs && (
                <div className="mb-8">
                  <h3 className="font-semibold mb-3">Thông số kỹ thuật:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-1.5 border-b">
                        <span className="text-muted-foreground">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center mb-6">
                <div className="mr-6 flex items-center">
                  <span className="text-muted-foreground mr-3">Số lượng:</span>
                  <div className="flex items-center">
                    <button 
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="w-8 h-8 flex items-center justify-center rounded-l border bg-muted disabled:opacity-50"
                    >
                      −
                    </button>
                    <input 
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="h-8 w-12 text-center border-y outline-none"
                    />
                    <button 
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= (product.stock || 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-r border bg-muted disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  {product.stock && product.stock > 0 ? (
                    <div className="flex items-center text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      <span>Còn hàng ({product.stock} sản phẩm)</span>
                    </div>
                  ) : (
                    <div className="text-red-500">Hết hàng</div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="btn-primary flex-1 md:flex-none md:min-w-[200px]"
                  disabled={!product.stock || product.stock <= 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Thêm vào giỏ hàng
                </button>
                
                <button 
                  // TODO: Implement Buy Now functionality
                  className="btn-secondary flex-1 md:flex-none md:min-w-[200px]"
                  disabled={!product.stock || product.stock <= 0}
                >
                  Mua ngay
                </button>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p className="flex items-center mb-1">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  Bảo hành chính hãng: {product.warranty || "12 tháng"}
                </p>
                <p className="flex items-center mb-1">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  Giao hàng miễn phí toàn quốc
                </p>
                <p className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  Hỗ trợ kỹ thuật 24/7
                </p>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <Link 
                    key={relatedProduct.id} 
                    to={`/products/${relatedProduct.id}`}
                    className="bg-white dark:bg-solar-900 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow p-4 flex flex-col"
                  >
                    <div className="h-48 mb-4">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="font-medium line-clamp-2">{relatedProduct.name}</h3>
                    <div className="mt-auto pt-2 font-bold text-primary">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(relatedProduct.price)}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default ProductDetail;
