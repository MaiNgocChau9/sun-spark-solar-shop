
import { 
  collection, 
  getDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  query, 
  where, 
  serverTimestamp,
  addDoc
} from '@/firebase';
import { db } from '@/firebase';
import { OrderType, CartItem } from '@/types';

// Create a new order
export const createOrder = async (
  userId: string,
  customerData: {
    name: string;
    email: string;
    phone: string;
    address: string;
  },
  cartItems: CartItem[],
  totalAmount: number,
  notes?: string
): Promise<string> => {
  try {
    const orderRef = await addDoc(collection(db, 'orders'), {
      userId,
      customerName: customerData.name,
      customerEmail: customerData.email,
      customerPhone: customerData.phone,
      shippingAddress: customerData.address,
      items: cartItems,
      totalAmount,
      status: 'pending', // Initial status is pending
      orderDate: serverTimestamp(),
      notes: notes || ''
    });
    
    return orderRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Không thể tạo đơn hàng. Vui lòng thử lại sau.');
  }
};

// Get all orders for a user
export const getUserOrders = async (userId: string): Promise<OrderType[]> => {
  try {
    const ordersCollection = collection(db, 'orders');
    const q = query(ordersCollection, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as OrderType));
    
    return orders;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw new Error('Không thể tải đơn hàng. Vui lòng thử lại sau.');
  }
};

// Get a single order by ID
export const getOrderById = async (orderId: string): Promise<OrderType> => {
  try {
    const orderDoc = await getDoc(doc(db, 'orders', orderId));
    
    if (!orderDoc.exists()) {
      throw new Error('Đơn hàng không tồn tại.');
    }
    
    return {
      id: orderDoc.id,
      ...orderDoc.data()
    } as OrderType;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw new Error('Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.');
  }
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: string): Promise<void> => {
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      status
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error('Không thể cập nhật trạng thái đơn hàng. Vui lòng thử lại sau.');
  }
};

// Cancel an order
export const cancelOrder = async (orderId: string): Promise<void> => {
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      status: 'cancelled'
    });
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw new Error('Không thể hủy đơn hàng. Vui lòng thử lại sau.');
  }
};
