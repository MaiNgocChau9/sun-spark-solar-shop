import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBox = ({ onSearch, placeholder, className = '' }: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentPath = location.pathname;
  
  const getSearchPlaceholder = () => {
    if (currentPath.startsWith('/products')) {
      return 'Tìm kiếm sản phẩm...';
    } else if (currentPath.startsWith('/blog')) {
      return 'Tìm kiếm bài viết...';
    } else {
      return 'Tìm kiếm sản phẩm & bài viết...';
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // If external onSearch handler is provided, use it
    if (onSearch) {
      onSearch(searchQuery);
      return;
    }

    // Otherwise, navigate to the appropriate search page
    if (currentPath.startsWith('/products')) {
      // Already on products page, no need to navigate
      // Search will be handled by the filter component
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    } else if (currentPath.startsWith('/blog')) {
      // Already on blog page, no need to navigate
      navigate(`/blog?search=${encodeURIComponent(searchQuery)}`);
    } else {
      // On home page hoặc trang khác, tìm kiếm tổng hợp
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <input
        type="text"
        placeholder={placeholder || getSearchPlaceholder()}
        className="pl-10 pr-4 py-2 w-full border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all bg-background"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBox;
