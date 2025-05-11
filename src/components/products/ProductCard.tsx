
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { ProductType } from '@/types';

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white dark:bg-solar-900 rounded-xl shadow-sm overflow-hidden card-hover">
      <Link to={`/products/${product.id}`} className="block relative">
        {product.featured && (
          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium py-1 px-2 rounded-full">
            Nổi bật
          </span>
        )}
        {product.sale && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium py-1 px-2 rounded-full">
            Giảm giá
          </span>
        )}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">
              <Link to={`/products/${product.id}`} className="hover:text-primary transition-colors">
                {product.name}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground">
              {product.category}
            </p>
          </div>
          <div className="font-bold text-primary">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
          </div>
        </div>
        
        <div className="flex items-center text-sm text-amber-500 mb-4">
          {"★".repeat(product.rating)}
          {"☆".repeat(5 - product.rating)}
          <span className="text-muted-foreground ml-1">({product.reviewCount})</span>
        </div>
        
        {product.specs && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mb-4">
            {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-muted-foreground">{key}:</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        )}
        
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
  );
};

export default ProductCard;
