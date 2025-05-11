
import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface FilterProps {
  categories: string[];
  priceRanges: {
    min: number;
    max: number;
    label: string;
  }[];
  powerRanges?: {
    min: number;
    max: number;
    label: string;
  }[];
  onFilterChange: (filters: {
    category?: string;
    priceRange?: { min: number; max: number };
    powerRange?: { min: number; max: number };
    search?: string;
  }) => void;
}

const ProductFilter = ({
  categories,
  priceRanges,
  powerRanges,
  onFilterChange,
}: FilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [selectedPowerRange, setSelectedPowerRange] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    const newCategory = selectedCategory === category ? '' : category;
    setSelectedCategory(newCategory);
    
    onFilterChange({
      category: newCategory || undefined,
      priceRange: selectedPriceRange || undefined,
      powerRange: selectedPowerRange || undefined,
      search: searchQuery || undefined,
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    const newPriceRange =
      selectedPriceRange?.min === min && selectedPriceRange?.max === max
        ? null
        : { min, max };
    setSelectedPriceRange(newPriceRange);
    
    onFilterChange({
      category: selectedCategory || undefined,
      priceRange: newPriceRange || undefined,
      powerRange: selectedPowerRange || undefined,
      search: searchQuery || undefined,
    });
  };

  const handlePowerRangeChange = (min: number, max: number) => {
    const newPowerRange =
      selectedPowerRange?.min === min && selectedPowerRange?.max === max
        ? null
        : { min, max };
    setSelectedPowerRange(newPowerRange);
    
    onFilterChange({
      category: selectedCategory || undefined,
      priceRange: selectedPriceRange || undefined,
      powerRange: newPowerRange || undefined,
      search: searchQuery || undefined,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      category: selectedCategory || undefined,
      priceRange: selectedPriceRange || undefined,
      powerRange: selectedPowerRange || undefined,
      search: searchQuery || undefined,
    });
  };

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedPriceRange(null);
    setSelectedPowerRange(null);
    setSearchQuery('');
    
    onFilterChange({});
  };

  const hasActiveFilters = !!(
    selectedCategory ||
    selectedPriceRange ||
    selectedPowerRange ||
    searchQuery
  );

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="bg-white dark:bg-solar-900 rounded-lg shadow-sm p-5 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="pl-10 pr-4 py-2 w-full border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <button
          onClick={toggleFilters}
          className="inline-flex items-center md:hidden bg-muted px-3 py-2 rounded-lg text-sm font-medium"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Bộ lọc
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center text-primary hover:underline text-sm"
          >
            <X className="mr-1 h-3 w-3" />
            Xóa bộ lọc
          </button>
        )}
      </div>

      <div className={`md:flex gap-8 ${isFilterOpen ? 'block' : 'hidden md:flex'}`}>
        <div className="mb-4 md:mb-0 md:flex-1">
          <h3 className="font-medium mb-2">Danh mục</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 md:mb-0 md:flex-1">
          <h3 className="font-medium mb-2">Khoảng giá</h3>
          <div className="flex flex-wrap gap-2">
            {priceRanges.map((range) => (
              <button
                key={`${range.min}-${range.max}`}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  selectedPriceRange?.min === range.min &&
                  selectedPriceRange?.max === range.max
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
                onClick={() => handlePriceRangeChange(range.min, range.max)}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {powerRanges && (
          <div className="md:flex-1">
            <h3 className="font-medium mb-2">Công suất</h3>
            <div className="flex flex-wrap gap-2">
              {powerRanges.map((range) => (
                <button
                  key={`${range.min}-${range.max}`}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    selectedPowerRange?.min === range.min &&
                    selectedPowerRange?.max === range.max
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                  onClick={() => handlePowerRangeChange(range.min, range.max)}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
