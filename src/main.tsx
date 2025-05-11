import React from 'react'; // Thêm React import nếu chưa có (cần cho StrictMode nếu dùng)
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.tsx'; // Import AuthProvider

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode> {/* Nên giữ StrictMode nếu có thể */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}
