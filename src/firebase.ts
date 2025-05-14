
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    GoogleAuthProvider, 
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
// Thay thế firestore-lite bằng firestore đầy đủ
import { 
    getFirestore,
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    deleteDoc,
    collection,
    query,
    where,
    getDocs,
    arrayUnion,
    arrayRemove,
    writeBatch,
    serverTimestamp,
    increment,
    FieldValue,
    addDoc // Added missing addDoc export
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js"; 
// import { getStorage } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-storage.js"; // Nếu cần Storage
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js"; // Nếu cần Analytics

/**
 * Your web app's Firebase configuration
 * API Key này là public và an toàn để đưa vào code frontend.
 * Tuy nhiên, hãy ĐẢM BẢO rằng bạn đã cấu hình:
 * 1. App Check: Để xác minh các yêu cầu đến từ ứng dụng hợp lệ của bạn.
 * 2. Security Rules (cho Firestore, Realtime Database, Storage): Để kiểm soát quyền truy cập dữ liệu.
 * Truy cập Firebase Console để cấu hình các biện pháp bảo mật này.
 */
export const firebaseConfig = {
  apiKey: "AIzaSyB2IxYD0GPgdBczj-H9KIGhUwfxI3dBGTs", 
  authDomain: "website-52770.firebaseapp.com",
  projectId: "website-52770",
  storageBucket: "website-52770.appspot.com", // Thường là projectID.appspot.com, kiểm tra lại trong Firebase Console
  messagingSenderId: "408630240570",
  appId: "1:408630240570:web:eee8d91d579dac6c4b9c03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo các dịch vụ Firebase và export chúng
// Chúng ta export cả các hàm cụ thể từ auth để tiện sử dụng,
// bên cạnh việc export service `auth` và `db`.
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app); // Nếu cần
// export const analytics = getAnalytics(app); // Nếu cần

export {
  // Auth exports
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFirebase, // Đổi tên để tránh trùng lặp nếu có hàm signOut khác
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  // Firestore exports
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  arrayUnion,
  arrayRemove,
  writeBatch,
  serverTimestamp,
  increment,
  FieldValue,
  addDoc // Added export of addDoc
};

export default app;
