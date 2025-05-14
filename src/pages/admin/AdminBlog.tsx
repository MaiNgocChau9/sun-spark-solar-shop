
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { collection, getDocs, doc, deleteDoc } from '@/firebase';
import { db } from '@/firebase';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import BlogForm from '@/components/admin/BlogForm';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { BlogPostType } from '@/types';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const AdminBlog = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostType | null>(null);
  
  // Redirect if not admin
  if (!currentUser) {
    return <Navigate to="/login?redirect=/admin/blog" replace />;
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, 'blog_posts');
        const snapshot = await getDocs(postsCollection);
        const postsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as BlogPostType));
        setPosts(postsList);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách bài viết",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [toast]);

  const handleEdit = (post: BlogPostType) => {
    setEditingPost(post);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      try {
        await deleteDoc(doc(db, 'blog_posts', id));
        setPosts(posts.filter(post => post.id !== id));
        toast({
          title: "Thành công",
          description: "Xóa bài viết thành công",
        });
      } catch (error) {
        console.error('Error deleting blog post:', error);
        toast({
          title: "Lỗi",
          description: "Không thể xóa bài viết",
          variant: "destructive",
        });
      }
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingPost(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Quản lý bài viết</h1>
            <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
              <Plus size={16} />
              Thêm bài viết mới
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="ml-2">Đang tải...</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hình ảnh</TableHead>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Ngày đăng</TableHead>
                    <TableHead>Tác giả</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <img 
                          src={post.coverImage} 
                          alt={post.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium max-w-xs truncate">{post.title}</TableCell>
                      <TableCell>{formatDate(post.date)}</TableCell>
                      <TableCell>{post.author.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {post.tags?.map((tag, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(post)}
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {isFormOpen && (
            <BlogForm 
              post={editingPost} 
              onClose={handleFormClose} 
              onSuccess={(updatedPost) => {
                if (editingPost) {
                  setPosts(posts.map(p => 
                    p.id === updatedPost.id ? updatedPost : p
                  ));
                } else {
                  setPosts([...posts, updatedPost]);
                }
                handleFormClose();
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminBlog;
