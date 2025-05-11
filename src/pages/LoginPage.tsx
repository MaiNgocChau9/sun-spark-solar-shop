import React, { useState, useEffect } from 'react'; // Thêm useEffect
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Thêm Link, useLocation
import { auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Chrome } from 'lucide-react'; // Icon cho Google

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // State cho loading
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const params = new URLSearchParams(location.search);
      const redirectPath = params.get('redirect') || '/';
      navigate(redirectPath);
    }
  }, [currentUser, navigate, location.search]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Chuyển hướng đã được xử lý bởi useEffect
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra thông tin.');
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Chuyển hướng đã được xử lý bởi useEffect
    } catch (err: any) {
      setError(err.message || 'Đăng nhập bằng Google thất bại.');
      console.error("Google sign-in error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-solar-dark-background py-12 px-4 sm:px-6 lg:px-8 pt-24 md:pt-28">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">Đăng Nhập</CardTitle>
            <CardDescription>Chào mừng trở lại! Vui lòng nhập thông tin của bạn.</CardDescription>
          </CardHeader>
          <CardContent>
            {error && <p className="mb-4 text-center text-sm text-red-600 bg-red-100 dark:bg-red-900/30 p-3 rounded-md">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Địa chỉ Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ban@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Link to="/forgot-password" // TODO: Tạo trang ForgotPassword
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full btn-primary" disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
              </Button>
            </form>
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              <span className="mx-4 flex-shrink text-sm text-gray-500 dark:text-gray-400">Hoặc tiếp tục với</span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <Chrome className="mr-2 h-4 w-4" /> Đăng nhập với Google
            </Button>
          </CardContent>
          <CardFooter className="text-center block">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Chưa có tài khoản?{' '}
              <Link to="/signup" className="font-medium text-primary hover:underline">
                Đăng ký ngay
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
