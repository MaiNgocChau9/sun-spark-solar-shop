import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import { blogPosts } from '@/data/blog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [productResults, setProductResults] = useState<any[]>([]);
  const [blogResults, setBlogResults] = useState<any[]>([]);

  useEffect(() => {
    if (!query) {
      setProductResults([]);
      setBlogResults([]);
      return;
    }
    const searchLower = query.toLowerCase();
    setProductResults(
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
      )
    );
    setBlogResults(
      blogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.content.toLowerCase().includes(searchLower)
      )
    );
  }, [query]);

  return (
    <main className="bg-gray-50 dark:bg-solar-900/30 min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl font-bold mb-8 text-center">Kết quả tìm kiếm cho: "{query}"</h1>
        {(!productResults.length && !blogResults.length) ? (
          <Card className="text-center py-12 shadow-lg">
            <CardContent>
              <p className="text-xl md:text-2xl text-foreground mb-4">Không tìm thấy kết quả phù hợp.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Sản phẩm</CardTitle>
                </CardHeader>
                <CardContent>
                  {productResults.length === 0 ? (
                    <p className="text-muted-foreground">Không có sản phẩm phù hợp.</p>
                  ) : (
                    <ul className="space-y-3">
                      {productResults.map((product) => (
                        <li key={product.id}>
                          <Link to={`/products/${product.id}`} className="font-medium text-primary hover:underline">
                            {product.name}
                          </Link>
                          <span className="ml-2 text-muted-foreground">{product.category}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Bài viết</CardTitle>
                </CardHeader>
                <CardContent>
                  {blogResults.length === 0 ? (
                    <p className="text-muted-foreground">Không có bài viết phù hợp.</p>
                  ) : (
                    <ul className="space-y-3">
                      {blogResults.map((post) => (
                        <li key={post.slug}>
                          <Link to={`/blog/${post.slug}`} className="font-medium text-primary hover:underline">
                            {post.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchPage;
