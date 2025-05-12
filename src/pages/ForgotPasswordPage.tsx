import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, firebaseConfig } from '../firebase';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast"; // Import toast for notifications

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null); // State for success message

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      // Use Firebase Auth REST API directly
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${firebaseConfig.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email: email,
          }),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        // Handle specific Firebase error messages
        const errorMessage = data?.error?.message || 'Failed to send reset email';
        if (errorMessage.includes('EMAIL_NOT_FOUND')) {
          throw new Error('auth/user-not-found');
        } else if (errorMessage.includes('INVALID_EMAIL')) {
          throw new Error('auth/invalid-email');
        } else if (errorMessage.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
          throw new Error('auth/too-many-requests');
        }
        throw new Error(errorMessage);
      }
      setMessage('Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.');
      toast({
        title: "Thành công",
        description: "Email đặt lại mật khẩu đã được gửi.",
      });
      setEmail(''); // Clear email field after success
    } catch (err: any) {
      console.error("Password reset error:", err);
      let friendlyError = 'Gửi email đặt lại mật khẩu thất bại. Vui lòng thử lại.';
      const errorMessage = err.message || '';
      
      if (errorMessage === 'auth/user-not-found') {
        friendlyError = 'Không tìm thấy tài khoản nào với địa chỉ email này.';
      } else if (errorMessage === 'auth/invalid-email') {
        friendlyError = 'Địa chỉ email không hợp lệ.';
      } else if (errorMessage === 'auth/too-many-requests') {
        friendlyError = 'Quá nhiều yêu cầu. Vui lòng thử lại sau.';
      }
      setError(friendlyError);
      toast({
        title: "Lỗi",
        description: friendlyError,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-solar-100 via-solar-50 to-sky-100 dark:from-solar-900 dark:via-solar-800 dark:to-sky-900 py-12 px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')] bg-no-repeat bg-cover opacity-5 dark:opacity-[0.03]"></div>

        <Card className="relative w-full max-w-md shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border border-white/20 dark:border-slate-700/50">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary dark:text-solar-400">Quên Mật Khẩu?</CardTitle>
            <CardDescription className="dark:text-slate-300">Nhập email của bạn để nhận liên kết đặt lại mật khẩu.</CardDescription>
          </CardHeader>
          <CardContent>
            {error && <p className="mb-4 text-center text-sm text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-500/20 p-3 rounded-md">{error}</p>}
            {message && <p className="mb-4 text-center text-sm text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-500/20 p-3 rounded-md">{message}</p>}
            <form onSubmit={handleResetPassword} className="space-y-6">
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
              <Button 
                type="submit" 
                className="w-full btn-primary" 
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? 'Đang gửi...' : 'Gửi Liên Kết Đặt Lại'}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm font-medium text-primary dark:text-solar-400 hover:underline">
                Quay lại Đăng nhập
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
};

export default ForgotPasswordPage;
