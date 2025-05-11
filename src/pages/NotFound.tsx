
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="text-center">
        <div className="text-primary text-7xl md:text-9xl font-bold mb-4">404</div>
        <h1 className="text-2xl md:text-4xl font-bold mb-6">Oops! Trang không tồn tại</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
