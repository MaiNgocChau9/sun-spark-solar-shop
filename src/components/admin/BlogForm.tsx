
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { collection, doc, setDoc, updateDoc } from '@/firebase';
import { db } from '@/firebase';
import { BlogPostType } from '@/types';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';

interface BlogFormProps {
  post?: BlogPostType | null;
  onClose: () => void;
  onSuccess: (post: BlogPostType) => void;
}

const BlogForm = ({ post, onClose, onSuccess }: BlogFormProps) => {
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [tagInput, setTagInput] = useState('');
  
  const form = useForm({
    defaultValues: post ? {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      readingTime: post.readingTime
    } : {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: '',
      readingTime: 5
    }
  });

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\sàáảãạăắằẳẵặâấầẩẫậđèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựýỳỷỹỵ]+/g, '')
      .replace(/\s+/g, '-')
      .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const updateSlug = () => {
    const title = form.getValues('title');
    if (title) {
      const slug = generateSlug(title);
      form.setValue('slug', slug);
    }
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      const authorInfo = {
        name: currentUser?.displayName || 'Admin',
        avatar: currentUser?.photoURL || "https://github.com/shadcn.png"
      };
      
      const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      
      if (post) {
        // Update existing post
        await updateDoc(doc(db, 'blog_posts', post.id), {
          ...data,
          tags,
          author: post.author, // Keep original author
          date: post.date // Keep original date
        });
        
        toast({
          title: "Thành công",
          description: "Cập nhật bài viết thành công",
        });
        
        onSuccess({
          ...post,
          ...data,
          tags
        });
      } else {
        // Create new post
        const newPostRef = doc(collection(db, 'blog_posts'));
        const newPost = {
          id: newPostRef.id,
          ...data,
          author: authorInfo,
          date: currentDate,
          tags
        };
        
        await setDoc(newPostRef, newPost);
        
        toast({
          title: "Thành công",
          description: "Thêm bài viết mới thành công",
        });
        
        onSuccess(newPost as BlogPostType);
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu bài viết",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {post ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề bài viết</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Nhập tiêu đề bài viết" 
                      onChange={(e) => {
                        field.onChange(e);
                        // Only auto-generate slug if it's a new post or slug hasn't been manually edited
                        if (!post || post.slug === form.getValues('slug')) {
                          form.setValue('slug', generateSlug(e.target.value));
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Slug (URL)</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input {...field} placeholder="url-bai-viet" />
                      </FormControl>
                      <Button type="button" size="sm" variant="outline" onClick={updateSlug}>
                        Tạo lại
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="readingTime"
                render={({ field }) => (
                  <FormItem className="w-40">
                    <FormLabel>Thời gian đọc (phút)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        {...field} 
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL ảnh bìa</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="URL ảnh bìa cho bài viết" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả ngắn</FormLabel>
                  <FormControl>
                    <textarea 
                      {...field} 
                      className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px] resize-y"
                      placeholder="Nhập mô tả ngắn cho bài viết (hiển thị ở trang danh sách)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Thẻ (Tags)</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <div 
                    key={index} 
                    className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-md"
                  >
                    <span className="mr-1">{tag}</span>
                    <button 
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Nhập thẻ và nhấn Thêm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus size={16} className="mr-1" /> Thêm
                </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung bài viết</FormLabel>
                  <FormControl>
                    <textarea 
                      {...field} 
                      className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[300px] resize-y"
                      placeholder="Nhập nội dung đầy đủ của bài viết"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Hủy bỏ
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang lưu...' : post ? 'Cập nhật' : 'Đăng bài'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BlogForm;
