
import { useState, useEffect } from 'react';
import { products } from '@/data/products';
import { ProductType } from '@/types';
import ProductFilter from '@/components/products/ProductFilter';
import ProductCard from '@/components/products/ProductCard';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chatbot/Chatbot";

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setFilteredProducts(products);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Extract unique categories
  const categories = [...new Set(products.map(product => product.category))];

  // Define price ranges
  const priceRanges = [
    { min: 0, max: 5000000, label: 'Dưới 5 triệu' },
    { min: 5000000, max: 10000000, label: '5 - 10 triệu' },
    { min: 10000000, max: 50000000, label: '10 - 50 triệu' },
    { min: 50000000, max: 100000000, label: '50 - 100 triệu' },
    { min: 100000000, max: Infinity, label: 'Trên 100 triệu' },
  ];

  // Define power ranges for solar panels
  const powerRanges = [
    { min: 0, max: 200, label: 'Dưới 200W' },
    { min: 200, max: 400, label: '200W - 400W' },
    { min: 400, max: 600, label: '400W - 600W' },
    { min: 600, max: Infinity, label: 'Trên 600W' },
  ];

  const handleFilterChange = (filters: {
    category?: string;
    priceRange?: { min: number; max: number };
    powerRange?: { min: number; max: number };
    search?: string;
  }) => {
    setLoading(true);
    
    // Apply filters
    let result = [...products];
    
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }
    
    if (filters.priceRange) {
      result = result.filter(
        product => 
          product.price >= filters.priceRange!.min && 
          product.price <= filters.priceRange!.max
      );
    }
    
    // Apply search if provided
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(searchLower) || 
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Simulate API delay
    setTimeout(() => {
      setFilteredProducts(result);
      setLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Sản phẩm năng lượng mặt trời</h1>
            <p className="text-muted-foreground max-w-3xl">
              Khám phá các sản phẩm năng lượng mặt trời chất lượng cao của chúng tôi. 
              Từ tấm pin mặt trời đến bộ lưu trữ điện và các phụ kiện khác.
            </p>
          </div>

          <ProductFilter 
            categories={categories} 
            priceRanges={priceRanges}
            powerRanges={powerRanges}
            onFilterChange={handleFilterChange}
          />

          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-muted-foreground">Đang tải sản phẩm...</p>
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-xl font-medium mb-2">Không tìm thấy sản phẩm</p>
                  <p className="text-muted-foreground">Vui lòng thử lại với bộ lọc khác</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Products;
