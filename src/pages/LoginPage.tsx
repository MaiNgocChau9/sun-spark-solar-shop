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
      let friendlyError = 'Đăng nhập thất bại. Vui lòng kiểm tra thông tin.';
      switch (err.code) {
        case 'auth/user-not-found':
          friendlyError = 'Không tìm thấy tài khoản nào với địa chỉ email này.';
          break;
        case 'auth/wrong-password':
          friendlyError = 'Mật khẩu không đúng.';
          break;
        case 'auth/invalid-email':
          friendlyError = 'Địa chỉ email không hợp lệ.';
          break;
        case 'auth/user-disabled':
          friendlyError = 'Tài khoản người dùng đã bị vô hiệu hóa.';
          break;
        default:
          console.error("Login error:", err);
      }
      setError(friendlyError);
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
      {/* Áp dụng nền tương tự Hero section */}
      <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-solar-100 via-solar-50 to-sky-100 dark:from-solar-900 dark:via-solar-800 dark:to-sky-900 py-12 px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 overflow-hidden">
        {/* Lớp ảnh nền mờ */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')] bg-no-repeat bg-cover opacity-5 dark:opacity-[0.03]"></div>
        
        {/* Card với hiệu ứng mờ */}
        <Card className="relative w-full max-w-md shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border border-white/20 dark:border-slate-700/50">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary dark:text-solar-400">Đăng Nhập</CardTitle>
            <CardDescription className="dark:text-slate-300">Chào mừng trở lại! Vui lòng nhập thông tin của bạn.</CardDescription>
          </CardHeader>
          <CardContent>
            {error && <p className="mb-4 text-center text-sm text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-500/20 p-3 rounded-md">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-slate-200">Địa chỉ Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ban@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-white/70 dark:bg-slate-800/70 dark:text-slate-50 dark:placeholder-slate-400"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="dark:text-slate-200">Mật khẩu</Label>
                  <Link to="/forgot-password" // TODO: Tạo trang ForgotPassword
                    className="text-sm font-medium text-primary dark:text-solar-400 hover:underline"
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
                  className="bg-white/70 dark:bg-slate-800/70 dark:text-slate-50 dark:placeholder-slate-400"
                />
              </div>
              <Button type="submit" className="w-full btn-primary" disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
              </Button>
            </form>
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-500"></div>
              <span className="mx-4 flex-shrink text-sm text-gray-500 dark:text-gray-400">Hoặc tiếp tục với</span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-500"></div>
            </div>
            <Button 
              variant="outline" 
              className="w-full bg-white/70 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-700/90 dark:border-slate-600" 
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <Chrome className="mr-2 h-4 w-4" /> Đăng nhập với Google
            </Button>
          </CardContent>
          <CardFooter className="text-center block">
            <p className="text-sm text-gray-600 dark:text-slate-300">
              Chưa có tài khoản?{' '}
              <Link to="/signup" className="font-medium text-primary dark:text-solar-400 hover:underline">
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
