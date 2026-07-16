import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Store from './app-store.svg';
import Google from './google-play.svg';
import Gallary from './app-gallary.svg';

export const AbsherFooter: React.FC = () => {
  return (
    <footer className="bg-white py-5" style={{ direction: 'rtl', textAlign: 'right', color: '#4a5568', fontSize: '0.88rem' }}>
      <Container>
        {/* Row مُقسّم داخلياً إلى 6 أعمدة (12 / 2 = 6 أعمدة على الشاشات الكبيرة) */}
        <Row className="gy-4 justify-content-between">
          
          {/* العمود 1: الشعار والوصف وأزرار المتاجر */}
          <Col lg={2} md={6} sm={12} className="d-flex flex-column align-items-start">
            <div className="mb-3">
              <h4>سودابوست</h4>
            </div>
            <p className="fw-bold mb-1" style={{ color: '#2d3748', fontSize: '0.85rem', lineHeight: '1.6' }}>
              منصة تقدم خدمات وزارة الداخلية السودنية للمواطنين والمقيمين والزوار
            </p>
            
            <h6 className="fw-bold mt-3 mb-2 text-dark" style={{ fontSize: '0.8rem' }}>حمل تطبيق سودابوست</h6>
            <div className="d-flex flex-column gap-1.5 w-100">
              <a href="#appstore" className="text-decoration-none">
                <img  src={Store} alt="app-store.svg"  style={{ height: '32px', width: 'auto' }} />
              </a>
              <a href="#googleplay" className="text-decoration-none">
                <img src={Google} alt="google-play.svg" style={{ height: '32px', width: 'auto' }} />
              </a>
              <a href="#appgallery" className="text-decoration-none">
                <img src={Gallary} alt="app-gallary.svg" style={{ height: '32px', width: 'auto' }} />
              </a>
            </div>
          </Col>

          {/* العمود 2: عن منصة أبشر */}
          <Col lg={2} md={4} sm={6}>
            <h6 className="fw-bold mb-3" style={{ color: '#102a43', fontSize: '0.95rem' }}>عن منصة سودابوست</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 m-0 p-0" style={{ fontSize: '0.85rem' }}>
              <li><a href="#about" className="text-muted text-decoration-none hover-link">عن سودابوست</a></li>
              <li><a href="#privacy" className="text-muted text-decoration-none hover-link">سياسة الخصوصية</a></li>
              <li><a href="#terms" className="text-muted text-decoration-none hover-link">شروط الاستخدام</a></li>
              <li><a href="#news" className="text-muted text-decoration-none hover-link">الأخبار</a></li>
              <li><a href="#sla" className="text-muted text-decoration-none hover-link">اتفاقية مستوى الخدمة</a></li>
              <li><a href="#accessibility" className="text-muted text-decoration-none hover-link">أدوات سهولة الوصول</a></li>
              <li><a href="#data" className="text-muted text-decoration-none hover-link">بيانات إحصائية</a></li>
              <li><a href="#security" className="text-muted text-decoration-none hover-link">أمن المعلومات</a></li>
            </ul>
          </Col>

          {/* العمود 3: المساعدة والدعم */}
          <Col lg={2} md={4} sm={6}>
            <h6 className="fw-bold mb-3" style={{ color: '#102a43', fontSize: '0.95rem' }}>المساعدة والدعم</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 m-0 p-0" style={{ fontSize: '0.85rem' }}>
              <li><a href="#contact" className="text-muted text-decoration-none hover-link">اتصل بنا</a></li>
              <li><a href="#report" className="text-muted text-decoration-none hover-link">بلاغ عن فساد (نزاهة)</a></li>
              <li><a href="#faq" className="text-muted text-decoration-none hover-link">الأسئلة الشائعة</a></li>
              <li><a href="#channels" className="text-muted text-decoration-none hover-link">قنوات الخدمة</a></li>
              <li><a href="#activate" className="text-muted text-decoration-none hover-link">قنوات تفعيل الهوية الوطنية</a></li>
              <li><a href="#register" className="text-muted text-decoration-none hover-link">التسجيل والاشتراك</a></li>
            </ul>
          </Col>

          {/* العمود 4: روابط مهمة */}
          <Col lg={2} md={4} sm={6}>
            <h6 className="fw-bold mb-3" style={{ color: '#102a43', fontSize: '0.95rem' }}>روابط مهمة</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 m-0 p-0" style={{ fontSize: '0.85rem' }}>
              <li><a href="#moi" className="text-muted text-decoration-none hover-link">بوابة وزارة الداخلية</a></li>
              <li><a href="#sso" className="text-muted text-decoration-none hover-link">المنصة الوطنية الموحدة</a></li>
              <li><a href="#strategy" className="text-muted text-decoration-none hover-link">الاستراتيجية الوطنية للبيانات والذكاء الاصطناعي</a></li>
              <li><a href="#open-data" className="text-muted text-decoration-none hover-link">منصة البيانات المفتوحة</a></li>
              <li><a href="#e-participation" className="text-muted text-decoration-none hover-link">بوابة المشاركة الإلكترونية</a></li>
              <li><a href="#consultations" className="text-muted text-decoration-none hover-link">منصة الاستشارات</a></li>
            </ul>
          </Col>

          {/* العمود 5: أدوات المساعدة */}
          <Col lg={2} md={6} sm={6} className="d-flex flex-column align-items-start">
            <h6 className="fw-bold mb-3" style={{ color: '#102a43', fontSize: '0.95rem' }}>أدوات المساعدة</h6>
            <div className="d-flex align-items-center gap-2 mb-3">
              <button className="btn btn-light rounded-circle d-flex align-items-center justify-content-center p-0" style={{ width: '32px', height: '32px', color: '#1e5631', border: '1px solid #cbd5e1' }}><i className="bi bi-zoom-in"></i></button>
              <button className="btn btn-light rounded-circle d-flex align-items-center justify-content-center p-0" style={{ width: '32px', height: '32px', color: '#1e5631', border: '1px solid #cbd5e1' }}><i className="bi bi-zoom-out"></i></button>
              <button className="btn btn-light rounded-circle d-flex align-items-center justify-content-center p-0" style={{ width: '32px', height: '32px', color: '#1e5631', border: '1px solid #cbd5e1' }}><i className="bi bi-eye"></i></button>
            </div>
            
          </Col>

          {/* العمود 6 (الأخير أقصى اليسار): تواصل معنا وبطاقة التوثيق الحكومية */}
          <Col lg={2} md={6} sm={12} className="d-flex flex-column align-items-start gap-4">
            <div className="w-100">
              <h6 className="fw-bold mb-3" style={{ color: '#102a43', fontSize: '0.95rem' }}>تواصل معنا</h6>
              <div className="d-flex align-items-center gap-2 px-3 py-1.5 mb-3" style={{ backgroundColor: '#eaf4ec', color: '#1e5631', borderRadius: '30px', width: 'fit-content' }}>
                <i className="bi bi-telephone"></i>
                <span className="fw-bold" style={{ fontSize: '0.85rem' }}>966551540183+</span>
              </div>
              <div className="d-flex gap-2">
                {['snapchat', 'facebook', 'twitter-x', 'youtube'].map((platform) => (
                  <a key={platform} href={`#${platform}`} className="d-flex align-items-center justify-content-center rounded-circle text-decoration-none" 
                     style={{ width: '34px', height: '34px', backgroundColor: '#eaf4ec', color: '#1e5631', fontSize: '0.95rem' }}>
                    <i className={`bi bi-${platform}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </Col>

        </Row>
      </Container>

      <style>{`
        .hover-link {
          color: #718096 !important;
          transition: color 0.2s ease;
        }
        .hover-link:hover {
          color: #1e5631 !important;
          text-decoration: underline !important;
        }
      `}</style>
    </footer>
  );
};

export default AbsherFooter;