import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // تغيير الاستيراد هنا
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // تأكد من وجود ملف الـ CSS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter> {/* تغيير المكون هنا */}
      <App />
    </HashRouter>
  </React.StrictMode>
);