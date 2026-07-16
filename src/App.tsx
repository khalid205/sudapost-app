import React from 'react';
import { Routes, Route } from 'react-router-dom'; // تأكد أنه لا يوجد هنا 'Router' أو 'HashRouter'
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
    <>
      <Navbar />
      <div className="content">
      <Routes>
  <Route path="/" element={<First />} />
  <Route path="Services" element={<Services />} />
  <Route path="ServicePost" element={<ServicePost />} />
  <Route path="HowPost" element={<HowPost />} />
  <Route path="Financial" element={<Financial />} />
  <Route path="Customs" element={<Customs />} />
  <Route path="*" element={<Error404 />} />
</Routes>
      </div>
      <Footer />
    </>
  );
}
export default App;