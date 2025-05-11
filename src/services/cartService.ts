import { 
  db,
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove, 
  serverTimestamp,
  // Timestamp // Firestore Timestamp type, nếu cần khai báo tường minh
} from '@/firebase'; // Import từ firebase.ts đã cập nhật
import { FirebaseUser } from '@/contexts/AuthContext'; // Giả sử FirebaseUser type được export từ AuthContext hoặc định nghĩa chung

// Định nghĩa kiểu dữ liệu cho một sản phẩm trong giỏ hàng
export interface CartItem {
  productId: string;
  name: string; // Denormalized for quick display
  price: number; // Price at the time of adding to cart
  quantity: number;
  image?: string; // Denormalized for quick display
  // Thêm các thuộc tính khác của sản phẩm nếu cần, ví dụ: variant, sku
}

// Định nghĩa kiểu dữ liệu cho document giỏ hàng trong Firestore
export interface CartDocument {
  userId: string; // Có thể không cần nếu ID document chính là userId
  items: CartItem[];
  lastUpdatedAt: any; // Sử dụng any cho serverTimestamp() hoặc import Timestamp type nếu có
}

const CARTS_COLLECTION = 'carts';

/**
 * Lấy giỏ hàng của người dùng từ Firestore.
 * Nếu chưa có giỏ hàng, sẽ tạo một giỏ hàng rỗng.
 */
export const getCart = async (userId: string): Promise<CartDocument> => {
  if (!userId) throw new Error("User ID is required to get cart.");
  const cartRef = doc(db, CARTS_COLLECTION, userId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    return cartSnap.data() as CartDocument;
  } else {
    // Tạo giỏ hàng mới nếu chưa có
    const newCart: CartDocument = {
      userId: userId,
      items: [],
      lastUpdatedAt: serverTimestamp(),
    };
    await setDoc(cartRef, newCart);
    // Để lastUpdatedAt được set bởi server, cần get lại doc hoặc chấp nhận giá trị client-side tạm thời
    // Hoặc có thể trả về newCart trực tiếp và client hiểu rằng lastUpdatedAt sẽ được server điền
    return { ...newCart, lastUpdatedAt: new Date() }; // Trả về với Date() tạm thời cho client
  }
};

/**
 * Thêm một sản phẩm vào giỏ hàng hoặc cập nhật số lượng nếu đã tồn tại.
 */
export const addToCart = async (userId: string, product: Omit<CartItem, 'quantity'>, quantityToAdd: number = 1): Promise<void> => {
  if (!userId) throw new Error("User ID is required to add to cart.");
  if (!product || !product.productId) throw new Error("Product information is required.");
  if (quantityToAdd <= 0) throw new Error("Quantity must be positive.");

  const cartRef = doc(db, CARTS_COLLECTION, userId);
  const cartSnap = await getDoc(cartRef);

  if (!cartSnap.exists()) {
    // Nếu giỏ hàng chưa tồn tại, tạo mới với sản phẩm này
    const newItem: CartItem = { ...product, quantity: quantityToAdd };
    const newCart: CartDocument = {
      userId: userId,
      items: [newItem],
      lastUpdatedAt: serverTimestamp(),
    };
    await setDoc(cartRef, newCart);
  } else {
    // Giỏ hàng đã tồn tại, kiểm tra xem sản phẩm đã có trong giỏ chưa
    const cartData = cartSnap.data() as CartDocument;
    const existingItemIndex = cartData.items.findIndex(item => item.productId === product.productId);

    if (existingItemIndex > -1) {
      // Sản phẩm đã tồn tại, cập nhật số lượng
      // Cách 1: Đọc, sửa, ghi lại (dễ bị race condition nếu không dùng transaction)
      // cartData.items[existingItemIndex].quantity += quantityToAdd;
      // await updateDoc(cartRef, { 
      //   items: cartData.items,
      //   lastUpdatedAt: serverTimestamp() 
      // });
      // Cách 2: Sử dụng arrayRemove và arrayUnion (phức tạp hơn cho việc chỉ cập nhật quantity)
      // Để cập nhật quantity của một item trong array, thường phải đọc, sửa rồi ghi lại toàn bộ array items.
      // Hoặc, nếu dùng subcollection cho items thì dễ hơn.
      // Với cấu trúc hiện tại (array of objects), cách an toàn nhất là đọc, sửa, ghi lại trong một transaction.
      // Tuy nhiên, CDN Firestore (đặc biệt bản JS v9 modular) có thể không hỗ trợ transaction trực tiếp dễ dàng như SDK admin.
      // Giải pháp đơn giản hơn cho client: đọc, sửa, ghi lại.
      const updatedItems = cartData.items.map((item, index) => 
        index === existingItemIndex 
          ? { ...item, quantity: item.quantity + quantityToAdd } 
          : item
      );
      await updateDoc(cartRef, { items: updatedItems, lastUpdatedAt: serverTimestamp() });

    } else {
      // Sản phẩm chưa tồn tại, thêm mới vào mảng items
      const newItem: CartItem = { ...product, quantity: quantityToAdd };
      await updateDoc(cartRef, {
        items: arrayUnion(newItem),
        lastUpdatedAt: serverTimestamp(),
      });
    }
  }
};

/**
 * Cập nhật số lượng của một sản phẩm trong giỏ hàng.
 */
export const updateCartItemQuantity = async (userId: string, productId: string, newQuantity: number): Promise<void> => {
  if (!userId) throw new Error("User ID is required.");
  if (!productId) throw new Error("Product ID is required.");
  if (newQuantity < 0) throw new Error("Quantity cannot be negative.");

  const cartRef = doc(db, CARTS_COLLECTION, userId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    const cartData = cartSnap.data() as CartDocument;
    let updatedItems;
    if (newQuantity === 0) {
      // Nếu số lượng mới là 0, xóa sản phẩm khỏi giỏ
      updatedItems = cartData.items.filter(item => item.productId !== productId);
    } else {
      updatedItems = cartData.items.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
    }
    await updateDoc(cartRef, { items: updatedItems, lastUpdatedAt: serverTimestamp() });
  } else {
    console.warn("Cart not found, cannot update item quantity.");
    // Hoặc throw new Error("Cart not found.");
  }
};

/**
 * Xóa một sản phẩm khỏi giỏ hàng.
 */
export const removeCartItem = async (userId: string, productId: string): Promise<void> => {
  if (!userId) throw new Error("User ID is required.");
  if (!productId) throw new Error("Product ID is required.");

  const cartRef = doc(db, CARTS_COLLECTION, userId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    const cartData = cartSnap.data() as CartDocument;
    // arrayRemove yêu cầu object phải khớp hoàn toàn. Điều này khó khi chỉ có productId.
    // Do đó, chúng ta sẽ đọc, lọc và ghi lại.
    const updatedItems = cartData.items.filter(item => item.productId !== productId);
    await updateDoc(cartRef, { items: updatedItems, lastUpdatedAt: serverTimestamp() });
  } else {
    console.warn("Cart not found, cannot remove item.");
    // Hoặc throw new Error("Cart not found.");
  }
};

/**
 * Xóa toàn bộ sản phẩm khỏi giỏ hàng (clear cart).
 */
export const clearCart = async (userId: string): Promise<void> => {
  if (!userId) throw new Error("User ID is required.");
  const cartRef = doc(db, CARTS_COLLECTION, userId);
  // Ghi đè mảng items bằng mảng rỗng
  await updateDoc(cartRef, {
    items: [],
    lastUpdatedAt: serverTimestamp(),
  });
};

// Cân nhắc:
// - Error handling chi tiết hơn.
// - Sử dụng transactions cho các thao tác phức tạp hơn để đảm bảo tính nhất quán dữ liệu,
//   tuy nhiên, với CDN và client-side, việc này có thể phức tạp.
// - Tối ưu hóa việc đọc/ghi (ví dụ: chỉ cập nhật các trường thay đổi).
// - Type `Timestamp` từ Firestore: `import { Timestamp } from "firebase/firestore";` nếu dùng package npm.
//   Với CDN, `serverTimestamp()` là một sentinel, và khi đọc, trường đó sẽ là một object có toDate(), toMillis().
//   Trong `CartDocument`, `lastUpdatedAt: any` là một cách đơn giản.
//   Hoặc định nghĩa một interface cho nó:
//   interface FirestoreTimestamp { toDate: () => Date; toMillis: () => number; seconds: number; nanoseconds: number; }
//   rồi dùng `lastUpdatedAt: FirestoreTimestamp | null;`
