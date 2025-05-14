
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { products } from '@/data/products';
import { ProductType } from '@/types';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    // Filter featured products
    const featured = products.filter(product => product.featured).slice(0, 4);
    setFeaturedProducts(featured);
  }, []);

  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sản phẩm nổi bật</h2>
            <p className="text-muted-foreground max-w-2xl">
              Khám phá những sản phẩm năng lượng mặt trời tiên tiến và hiệu quả nhất của chúng tôi,
              được thiết kế để tối ưu hóa việc sử dụng năng lượng mặt trời.
            </p>
          </div>
          <Link to="/products" className="btn-outline mt-4 md:mt-0">
            Xem tất cả sản phẩm
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-card dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden card-hover">
              <Link to={`/products/${product.id}`} className="block relative">
                <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium py-1 px-2 rounded-full">
                  Nổi bật
                </span>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover"
                />
              </Link>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-foreground dark:text-white">
                      <Link to={`/products/${product.id}`} className="hover:text-primary transition-colors">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      {product.category}
                    </p>
                  </div>
                  <div className="font-bold text-primary">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-amber-500 dark:text-amber-400 mb-4">
                  {"★".repeat(product.rating)}
                  {"☆".repeat(5 - product.rating)}
                  <span className="text-muted-foreground dark:text-gray-400 ml-1">({product.reviewCount})</span>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Link 
                    to={`/products/${product.id}`} 
                    className="flex-1 btn-outline text-center"
                  >
                    Chi tiết
                  </Link>
                  <button 
                    className="flex items-center justify-center p-2 rounded bg-primary text-primary-foreground hover:bg-primary/90"
                    aria-label="Thêm vào giỏ hàng"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
