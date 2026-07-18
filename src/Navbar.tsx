import React from 'react';
import { Link } from 'react-router-dom'; // استيراد Link
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const CollapsibleExample: React.FC = () => {
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" className="bg-body-tertiary header py-3" style={{ direction: 'rtl' }}>
      <Container fluid className="d-flex justify-content-between align-items-center">
        
        {/* تغيير Navbar.Brand href إلى Link */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 d-flex align-items-center m-0 p-0" style={{textDecoration: 'none'}}>
          <div 
            className="d-flex align-items-center justify-content-center rounded-3 text-white" 
            style={{ 
              backgroundColor: '#006650', 
              width: '42px', 
              height: '42px',
              boxShadow: '0 4px 10px rgba(245, 158, 11, 0.3)',
              marginLeft: '12px' 
            }}
          >
             {/* الـ SVG الخاص بك */}
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.001.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
            </svg>
          </div>

          <div className="d-flex flex-column align-items-start lh-sm">
            <span style={{ color: '#006650', letterSpacing: '0.5px', lineHeight: '1.2' }} className="fw-extrabold fs-4">
              سودابوست
            </span>
            <span className="text-muted fw-medium" style={{ fontSize: '0.75rem', letterSpacing: '1px', marginTop: '1px' }}>
              SUDAPOST
            </span>
          </div>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
        <Navbar.Collapse id="responsive-navbar-nav" style={{ flexGrow: 0 }}>
     <Nav className="gap-4 fs-5 fw-medium align-items-stretch align-items-lg-center pt-3 pt-lg-0" style={{ textAlign: 'right' }}>
    <Nav.Link as={Link} to="/" eventKey="1" className="px-2 py-2 py-lg-0">الرئيسية</Nav.Link>
    <Nav.Link as={Link} to="/Services" eventKey="2" className="px-2 py-2 py-lg-0">الخدمات اللوجستية</Nav.Link>
    <Nav.Link as={Link} to="/HowPost" eventKey="3" className="px-2 py-2 py-lg-0">كيفية الشحن</Nav.Link>
    <Nav.Link as={Link} to="/ServicePost" eventKey="4" className="px-2 py-2 py-lg-0">خدماتنا البريدية</Nav.Link>
    <Nav.Link as={Link} to="/Financial" eventKey="5" className="px-2 py-2 py-lg-0">خدماتنا المالية</Nav.Link>
    <Nav.Link as={Link} to="/Customs" eventKey="6" className="px-2 py-2 py-lg-0">خدمات الجمارك</Nav.Link>
</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CollapsibleExample;