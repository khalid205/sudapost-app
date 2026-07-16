import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // التغيير هنا
import Navbar from './Navbar';
import First from './First';
import Services from './Services';
import ServicePost from './ServicePost';
import HowPost from './HowPost';
import Financial from './Financial';
import Customs from './Customs';
import Error404 from './Error404';
import Footer from './Footer';

function App(): React.JSX.Element {
  return (
    <Router> {/* الآن سيتم التعامل مع المسارات باستخدام الهاش # */}
      <Navbar />
      
      <div className="content">
        <Routes>
          <Route path="/" element={<First />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/ServicePost" element={<ServicePost />} />
          <Route path="/HowPost" element={<HowPost />} />
          <Route path="/Financial" element={<Financial />} />
          <Route path="/Customs" element={<Customs />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
      
      <Footer />
    </Router>
  );
}

export default App;