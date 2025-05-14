
// Product Types
export interface ProductType {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  sale?: boolean;
  specs?: Record<string, string | number>;
  relatedProducts?: string[];
  stock?: number;
  warranty?: string;
}

// Blog Post Types
export interface BlogPostType {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: {
    name: string;
    avatar?: string;
  };
  coverImage: string;
  excerpt: string;
  content: string;
  tags?: string[];
  readingTime: number;
  relatedPosts?: string[];
}

// Order Types
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderType {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  orderDate: string;
  notes?: string;
}

// Cart Types
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartType {
  userId: string;
  items: CartItem[];
  totalAmount: number;
  updatedAt: string;
}
