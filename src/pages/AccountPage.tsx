import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db, doc, getDoc, updateDoc, setDoc } from "../firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const AccountPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUser) return;
      const userDoc = await getDoc(doc(db, "users", currentUser.email));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setName(data.displayName || "");
        setAvatar(data.avatar || "");
      }
    };
    fetchUser();
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      if (!currentUser) throw new Error("Chưa đăng nhập");
      await setDoc(doc(db, "users", currentUser.email), {
        displayName: name,
        avatar: avatar,
      }, { merge: true });
      setSuccess("Cập nhật thành công!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Có lỗi xảy ra khi cập nhật.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-solar-100 via-solar-50 to-sky-100 dark:from-solar-900 dark:via-solar-800 dark:to-sky-900 py-12 px-4">
        <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Quản lý tài khoản</h2>
          {success && <div className="mb-4 text-green-600">{success}</div>}
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Tên hiển thị</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={loading}
                className="bg-white/70 dark:bg-slate-800/70"
              />
            </div>
            <div>
              <Label htmlFor="avatar">Link ảnh đại diện</Label>
              <Input
                id="avatar"
                type="text"
                value={avatar}
                onChange={e => setAvatar(e.target.value)}
                disabled={loading}
                className="bg-white/70 dark:bg-slate-800/70"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AccountPage;
