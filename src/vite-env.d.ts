/// <reference types="vite/client" />

declare module "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js" {
  export const initializeApp: any;
}

declare module "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js" {
  export const getAuth: any;
  export const createUserWithEmailAndPassword: any;
  export const signInWithEmailAndPassword: any;
  export const signOut: any;
  export const onAuthStateChanged: any;
  export const GoogleAuthProvider: any;
  export const signInWithPopup: any;
}

// declare module "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore-lite.js" {
//   export const getFirestore: any;
// }

declare module "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js" {
  export const getFirestore: any;
  export const doc: any;
  export const getDoc: any;
  export const setDoc: any;
  export const updateDoc: any;
  export const deleteDoc: any;
  export const collection: any;
  export const query: any;
  export const where: any;
  export const getDocs: any;
  export const arrayUnion: any;
  export const arrayRemove: any;
  export const writeBatch: any;
  export const serverTimestamp: any; // Đây là một hàm trả về một sentinel, không phải là 'Timestamp' type
  export const increment: any;
  export const FieldValue: any; // Class hoặc object cung cấp các sentinels như serverTimestamp(), increment()
  // Nếu cần type Timestamp, nó thường được import riêng hoặc là một phần của FieldValue
  // export type Timestamp: any; // Hoặc một định nghĩa cụ thể hơn nếu biết
}
