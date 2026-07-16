import React, { useRef, useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import {Button } from "react-bootstrap";
import { Apple, GooglePlay, BoxSeam, ChevronRight, ChevronLeft, ArrowLeft } from 'react-bootstrap-icons'; // استدعاء أيقونات الشحن والمتاجر القياسية

// استيراد الصور
import picmap from './Untitled-1.jpg';
import './First.css';
import logo7 from './AbsherApp.png';

interface ServiceItem {
  id: number;
  title: string;
  description: string; // إضافة حقل الوصف ليعرض تحت العنوان
  icon: string;
}

export const MostUsedServices: React.FC = () => {
  const services: ServiceItem[] = [
    { id: 1, title: " أكثر من 16 مليون عملية إلكترونية عبر منصة سودابوست في أبريل 2026م", description: "نفذت منصة وزارة الداخلية الإلكترونية سوابوست خلال شهر أبريل الماضي 16,536,826 عملية إلكترونية، للمستفيدين عبر سوابوست أفراد وأعمال", icon: "bi-card-id" },
    { id: 2, title: "منصة سودابوست تنفّذ أكثر من 448 مليون عملية إلكترونية في 2025م", description: "نفذت منصة وزارة الداخلية الإلكترونية سوابوست خلال العام الماضي (2025) 448,243,708 عمليات إلكترونية، للمستفيدين عبر سوابوست أفراد وأعمال.", icon: "bi-car-front" },
    { id: 3, title: "أكثر من (43) مليون عملية إلكترونية عبر منصة سودابوست في مارس 2026م", description: "نفذت منصة وزارة الداخلية الإلكترونية سوابوست خلال شهر مارس الماضي (43,585,844) عملية إلكترونية، للمستفيدين عبر سوابوست أفراد وأعمال.", icon: "bi-truck" },
    { id: 4, title: "أكثر من (42) مليون عملية إلكترونية عبر منصة سودابوست في فبراير 2026م", description: " نفذت منصة وزارة الداخلية الإلكترونية سوابوست خلال شهر فبراير الماضي (42,736,435) عملية إلكترونية، للمستفيدين عبر سوابوست أفراد وأعمال.", icon: "bi-exclamation-triangle" },
    { id: 5, title: "أكثر من 44 مليون عملية إلكترونية عبر منصة سودابوست في يناير 2026", description: "نفذت منصة وزارة الداخلية الإلكترونية سوابوست خلال شهر يناير الماضي (44,831,914) عملية إلكترونية، للمستفيدين عبر سوابوست أفراد وأعمال.", icon: "bi-file-earmark-text" },
    
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // حالات للتحكم في ظهور واختفاء الأسهم بناءً على التمرير
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(true);

  // دالة لمراقبة التمرير وتحديث ظهور الأسهم
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      
      const currentScroll = Math.abs(scrollLeft);
      const maxScroll = scrollWidth - clientWidth;

      // إظهار سهم اليمين إذا تحركنا عن البداية بأكثر من 10 بكسل
      setShowRightArrow(currentScroll > 10);
      
      // إخفاء سهم اليسار إذا وصلنا لنهاية العناصر تقريباً
      setShowLeftArrow(currentScroll < maxScroll - 10);
    }
  };

  // دالة التمرير لليسار (المزيد من الخدمات)
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  // دالة التمرير لليمين (الرجوع للبداية)
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  // التأكد من فحص حالة التمرير الأولية عند تحميل المكون
  useEffect(() => {
    handleScroll();
  }, []);




  

  return (
    <div>
     {/* القسم الأول: السلايدر الرئيسي للإعلانات مع لوحة الدخول في أقصى اليسار */}
     <section className="position-relative" style={{ direction: 'rtl' }}>
  
  {/* لوحة تسجيل الدخول العائمة - حجم متوسط متناسق وخلفية بيضاء ناصعة */}
  <div 
    className="position-absolute top-50 translate-middle-y shadow-lg d-none d-md-block"
    style={{ 
      left: '8%', 
      zIndex: 10, 
      width: '370px', /* حجم متوسط موزون */
      backgroundColor: '#ffffff', /* بيضاء ناصعة بالكامل */
      borderRadius: '20px',
      padding: '35px 30px', /* مسافات داخلية معتدلة لتقليل الطول الكلي */
      border: '1px solid #e2e8f0',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }}
  >
    {/* ترويسة الكارت */}
    <div className="text-center mb-4">
      <h4 className="fw-bold mb-1" style={{ color: '#102a43' }}>تسجيل الدخول</h4>
      <p className="text-muted small mb-0">الوصول الآمن لخدمات منصة سودابوست</p>
    </div>

    {/* حقول الإدخال */}
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="mb-3"> {/* مسافات متزنة تعطي حجماً معتدلاً */}
        <label className="form-label small fw-bold text-secondary mb-1">اسم المستخدم أو رقم الهوية</label>
        <div className="input-group">
          <span className="input-group-text bg-light border-start-0" style={{ borderTopRightRadius: '8px', borderBottomRightRadius: '8px', padding: '10px' }}>
            <i className="bi bi-person text-muted"></i>
          </span>
          <input 
            type="text" 
            className="form-control bg-light border-end-0" 
            placeholder="أدخل رقم الهوية"
            style={{ borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px', fontSize: '0.9rem', padding: '10px' }} 
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label small fw-bold text-secondary mb-1">كلمة المرور</label>
        <div className="input-group">
          <span className="input-group-text bg-light border-start-0" style={{ borderTopRightRadius: '8px', borderBottomRightRadius: '8px', padding: '10px' }}>
            <i className="bi bi-lock text-muted"></i>
          </span>
          <input 
            type="password" 
            className="form-control bg-light border-end-0" 
            placeholder="••••••••"
            style={{ borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px', fontSize: '0.9rem', padding: '10px' }} 
          />
        </div>
      </div>

      {/* روابط مساعدة */}
      <div className="d-flex justify-content-between align-items-center mb-4 small">
        <a href="#forgot" className="text-decoration-none" style={{ color: '#2b8a3e', fontWeight: '600' }}>نسيت كلمة المرور؟</a>
        <a href="#register" className="text-decoration-none text-secondary fw-semibold">مستخدم جديد؟</a>
      </div>

      {/* زر الدخول الأخضر */}
      <button 
        type="submit" 
        className="btn w-100 py-2.5 fw-bold text-white shadow-sm"
        style={{ 
          backgroundColor: '#1e5631', 
          borderRadius: '8px',
          fontSize: '1rem',
          transition: 'all 0.2s',
          border: 'none'
        }}
      >
        تسجيل الدخول
      </button>
    </form>
  </div>

  {/* الكاروسيل */}

  
  <Carousel indicators={true} controls={false} interval={4000} fade>
  
  {/* الصورة الأولى */}
  <Carousel.Item style={{ maxHeight: '550px', position: 'relative' }}>
    <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop" className="d-block w-100 object-fit-cover" style={{ height: '520px' }} />
    {/* طبقة التعتيم الواضحة */}
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1 }}></div>
  </Carousel.Item>

  {/* الصورة الثانية */}
  <Carousel.Item style={{ maxHeight: '550px', position: 'relative' }}>
    <img src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1200&auto=format&fit=crop" className="d-block w-100 object-fit-cover" style={{ height: '520px' }} />
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1 }}></div>
  </Carousel.Item>

  {/* الصورة الثالثة */}
  <Carousel.Item style={{ maxHeight: '550px', position: 'relative' }}>
    <img src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=1200&auto=format&fit=crop" className="d-block w-100 object-fit-cover" style={{ height: '520px' }} />
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1 }}></div>
  </Carousel.Item>

  {/* الصورة الرابعة */}
  <Carousel.Item style={{ maxHeight: '550px', position: 'relative' }}>
    <img src="https://images.unsplash.com/photo-1589758438368-0ad531db3366?q=80&w=1200&auto=format&fit=crop" className="d-block w-100 object-fit-cover" style={{ height: '520px' }} />
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1 }}></div>
  </Carousel.Item>

  {/* الصورة الخامسة */}
  <Carousel.Item style={{ maxHeight: '550px', position: 'relative' }}>
    <img src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1200&auto=format&fit=crop" className="d-block w-100 object-fit-cover" style={{ height: '520px' }} />
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1 }}></div>
  </Carousel.Item>

  {/* الصورة السادسة */}
  <Carousel.Item style={{ maxHeight: '550px', position: 'relative' }}>
    <img src="https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=1200&auto=format&fit=crop" className="d-block w-100 object-fit-cover" style={{ height: '520px' }} />
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1 }}></div>
  </Carousel.Item>

</Carousel>
</section>


      <section className="mt-5" style={{ direction: 'rtl', textAlign: 'right' }}>
      <Container>
        {/* العناوين بالجهة اليمنى */}
        <div className="title mb-4">
          <h2 className="fw-bold" style={{ color: '#102a43' }}>خدمات سودابوست الفورية</h2>
          <p style={{ color: '#627d98' }}>خدمات لا تتطلب تسجيل دخول لتنفيذها</p>
        </div>

        {/* التبويبات العلوية مع الكلاس المخصص */}
        <Tabs transition={false} id="noanim-tab-example" className="mb-5 mt-4 custom-tabs border-0">
          <Tab eventKey="مواعيد" title={<span><i className="bi bi-calendar2 me-2"></i> حجز مواعيد</span>} >
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                {/* التبويبات الجانبية أصبحت في اليمين تماماً */}
                <Col sm={5} className="mb-4">
                  <Nav variant="pills" className="flex-column custom-pills">
                    <Nav.Item><Nav.Link eventKey="first"> <i className="bi bi-question-circle me-2"></i> إصدار رخصة قيادة</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="second" className="my-2"> <i className="bi bi-question-circle me-2"></i> مواعيد الأحوال المدنية</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="third"> <i className="bi bi-question-circle me-2"></i> مواعيد المديرية العامة للجوازات</Nav.Link></Nav.Item>
                  </Nav>
                </Col>
                
                {/* المحتوى جهة اليسار */}
                <Col sm={7} style={{ borderRight: '1px solid #edf2f7', paddingRight: '30px' }}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}> إصدار رخصة قيادة </h4>
                      <p className="text-muted" style={{ lineHeight: '1.6' }}>تتيح هذه الخدمة للمستفيدين حجز مواعيد التدريب في مدارس تعليم القيادة، ما يمكّنهم من استكمال متطلبات التدريب اللازم للحصول على رخصة القيادة، ثم إصدارها بعد إتمام كامل المتطلبات.</p>
                      {/* زر أخضر متناسق مع هوية أبشر */}
                      <Button href="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm" style={{ backgroundColor: "#006650", color: "#ffffff" }} >بدء الخدمة <ArrowLeft /></Button>
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="second">
                      <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}>مواعيد الأحوال المدنية</h4>
                      <p className="text-muted" style={{ lineHeight: '1.6' }}>تتيح هذه الخدمة للمستفيد حجز موعد جديد أو تعديل موعد سابق لمراجعة مكاتب الأحوال المدنية، مع عرض متطلبات تنفيذ الخدمة المطلوبة قبل الزيارة.</p>
                      <Button href="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm" style={{ backgroundColor: "#006650", color: "#ffffff" }} >بدء الخدمة <ArrowLeft /></Button>
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="third">
                      <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}>مواعيد المديرية العامة للجوازات</h4>
                      <p className="text-muted" style={{ lineHeight: '1.6' }}>تتيح هذه الخدمة للأفراد المسجلين على منصة سودابوست حجز المواعيد لدى مكاتب المديرية العامة للجوازات.</p>
                      <Button href="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm" style={{ backgroundColor: "#006650", color: "#ffffff" }} >بدء الخدمة <ArrowLeft /></Button>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Tab>

          <Tab eventKey="مركبات" title={<span><i className="bi bi-car-front-fill me-2"></i> شحن مركبات</span>}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={5} className="mb-4">
                  <Nav variant="pills" className="flex-column custom-pills">
                    <Nav.Item><Nav.Link eventKey="first"> <i className="bi bi-question-circle me-2"></i> استعراض المراكز المعتمدة لإسقاط المركبات</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="second" className="my-2"> <i className="bi bi-question-circle me-2"></i> مزاد اللوحات</Nav.Link></Nav.Item>
                  </Nav>
                </Col>
                <Col sm={7} style={{ borderRight: '1px solid #edf2f7', paddingRight: '30px' }}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}> استعراض المراكز المعتمدة لإسقاط المركبات </h4>
                      <p className="text-muted" style={{ lineHeight: '1.6' }}>تتيح هذه الخدمة التعرّف على المراكز المعتمدة لدى منصة سودابوست في مختلف مناطق المملكة؛ لإسقاط جميع أنواع المركبات المهملة والتالفة.</p>
                      <Button href="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm" style={{ backgroundColor: "#006650", color: "#ffffff" }} >بدء الخدمة <ArrowLeft /></Button>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}>مزاد اللوحات</h4>
                      <p className="text-muted" style={{ lineHeight: '1.6' }}>تتيح هذه الخدمة إمكانية المزايدة على لوحة مركبة من نوع خصوصي، أو نقل خاص أو دراجة نارية.</p>
                      <Button href="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm" style={{ backgroundColor: "#006650", color: "#ffffff" }} >بدء الخدمة <ArrowLeft /></Button>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Tab>

          <Tab eventKey="زوار" title={<span><i className="bi bi-bag-heart me-2"></i> شحن اثاثات</span>}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={5} className="mb-4">
                  <Nav variant="pills" className="flex-column custom-pills">
                    <Nav.Item><Nav.Link eventKey="first"> <i className="bi bi-question-circle me-2"></i> اثاثات منزلية</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="second" className="my-2"> <i className="bi bi-question-circle me-2"></i> اثاثات مكتبية</Nav.Link></Nav.Item>
                  </Nav>
                </Col>
                <Col sm={7} style={{ borderRight: '1px solid #edf2f7', paddingRight: '30px' }}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}> ارتقِ بأسلوب حياتك: أثاث فاخر يصنع فارقاً في منزلك </h4>
                      <p className="text-muted" style={{ lineHeight: '1.6' }}>في متجرنا، نؤمن أن المنزل ليس مجرد مساحة، بل هو انعكاس لشخصيتك وذوقك الرفيع. ننسج الفخامة والراحة في كل قطعة أثاث ومفروشات نقدمها لك؛ حيث تجتمع جودة الخامات الإيطالية مع دقة التصميم العصري لنهديك مساحات دافئة تدوم لأجيال وتلهم ضيوفك من النظرة الأولى</p>
                      <Button href="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm" style={{ backgroundColor: "#006650", color: "#ffffff" }} >بدء الخدمة <ArrowLeft /></Button>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}>صمّم بيئة عمل تلهم النجاح وتصنع الفارق لشركتك</h4>
                      <p className="text-muted" style={{ lineHeight: '1.6' }}>نحن لا نبيع مجرد مكاتب، بل نبتكر مساحات عمل محفزة للإبداع والإنتاجية. نقدم للشركات والمنشآت حلولاً متكاملة من الأثاث المكتبي الفاخر؛ بدءاً من طاولات الاجتماعات الكبرى ومكاتب الإدارة التنفيذية، ووصولاً إلى وحدات العمل المشتركة الذكية، مصممة بخامات متميزة تعكس قوة هويتك التجارية أمام عملائك وموظفيك</p>
                      <Button href="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm" style={{ backgroundColor: "#006650", color: "#ffffff" }} >بدء الخدمة <ArrowLeft /></Button>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Tab>

          <Tab eventKey="شهادات" title={<span><i className="bi bi-journal-bookmark-fill me"></i> استخراج وتوثيق شهادات</span>}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={5} className="mb-4">
                  <Nav variant="pills" className="flex-column custom-pills">
                    <Nav.Item><Nav.Link eventKey="first"> <i className="bi bi-question-circle me-2"></i> استعراض المراكز المعتمدة لاستخراج الشهادات في السعودية</Nav.Link></Nav.Item>
                  </Nav>
                </Col>
                <Col sm={7} style={{ borderRight: '1px solid #edf2f7', paddingRight: '30px' }}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}> سودابوست هو دليلك الشامل للمراكز المعتمدة للشهادات المهنية بالمملكة </h4>
                      <p className="text-muted" style={{ lineHeight: '1.6' }}>استثمر في مستقبلك المهني عبر جهات موثوقة. نستعرض لك الدليل الحصري والمنظم لكافة المراكز والمعاهد المعتمدة من الجهات الرسمية في المملكة العربية السعودية (مثل المؤسسة العامة للتدريب التقني والمهني، وصندوق "هدف") لاستخراج الشهادات الاحترافية والتقنية. نوفر لك عناء البحث لنضع بين يديك بوابتك المباشرة لتطوير مهاراتك بما يتوافق مع معايير سوق العمل السعودي ورؤية المملكة 2030</p>
                      <Button href="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm" style={{ backgroundColor: "#006650", color: "#ffffff" }} >بدء الخدمة <ArrowLeft /></Button>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Tab>

          <Tab eventKey="مخالفات" title={<span><i className="bi bi-chat-right-text"></i> شحن بضاعة</span>}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={5} className="mb-4">
                  <Nav variant="pills" className="flex-column custom-pills">
                    <Nav.Item><Nav.Link eventKey="first"> <i className="bi bi-question-circle me-2"></i> شحن مواشي</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="second" className="my-2"> <i className="bi bi-question-circle me-2"></i> شحن مواد تموينية</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="three" className="my-2"> <i className="bi bi-question-circle me-2"></i> شحن اجهزة كهربائية</Nav.Link></Nav.Item>
                  </Nav>
                </Col>
                <Col sm={7} style={{ borderRight: '1px solid #edf2f7', paddingRight: '30px' }}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}> التميز في نقل وشحن المواشي الحية من والي السعودية بأعلى معايير السلامة والرعاية </h4>
                      <p className="text-muted" style={{ lineHeight: '1.6' }}>نحن لا ننقل مجرد شحنات، بل ندير ثروتك الحيوانية بعناية فائقة. نوفر لك حلولاً متكاملة لنقل وشحن المواشي الحية (برياً وبحرياً) عبر أساطيل مجهزة بالكامل ومطابقة للمواصفات القياسية؛ حيث نضمن التهوية المثالية، والتحكم الحراري، والتغذية المستمرة طوال الرحلة تحت إشراف طواقم بيطرية متخصصة، لضمان وصول قطيعك بأمان وصحة كاملة دون إجهاد.</p>
                      <Button href="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm" style={{ backgroundColor: "#006650", color: "#ffffff" }} >بدء الخدمة <ArrowLeft /></Button>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}>حلول الشحن المبرد والجاف للمواد التموينية بأعلى معايير سلامة الغذاء</h4>
                      <p className="text-muted" style={{ lineHeight: '1.6' }}>ندرك أهمية الحفاظ على جودة وقيمة شحناتك الغذائية حتى تصل إلى المستهلك النهائي. نوفر لك منظومة متكاملة لشحن المواد التموينية والغذائية عبر أساطيل مجهزة بأحدث تقنيات التحكم الحراري والرطوبة (تبريد، تجميد، وجاف)، ملتزمين بأدق المعايير الصحية العالمية لضمان حماية الشحنات من التلف أو التلوث طوال فترة الرحلة</p>
                      <Button href="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm" style={{ backgroundColor: "#006650", color: "#ffffff" }} >بدء الخدمة <ArrowLeft /></Button>
                    </Tab.Pane>
                    <Tab.Pane eventKey="three">
                      <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}>شحن آمن ومضمون للأجهزة الكهربائية والإلكترونيات الحساسة</h4>
                      <p className="text-muted" style={{ lineHeight: '1.6' }}>ندرك أن الأجهزة الكهربائية تتطلب معالجة خاصة وحماية فائقة ضد الصدمات والرطوبة. نوفر لك حلول شحن لوجستية متكاملة للأجهزة المنزلية والتقنية، مدعومة بأنظمة تغليف متطورة ومقاومة للاهتزازات، مع أسطول مجهز يضمن نقل بضائعك الثمينة بأمان تام من المصنع وحتى وصولها لعملائك دون أي أضرار تشغيلية. </p>
                      <Button href="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm" style={{ backgroundColor: "#006650", color: "#ffffff" }} >بدء الخدمة <ArrowLeft /></Button>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Tab>
          
          {/* يمكنك تطبيق نفس الهيكل على بقية الـ Tabs (زوار، شهادات، مخالفات) بسلاسة */}
        </Tabs>
      </Container>
    </section>

    <section className="services-carousel-section position-relative py-5 bg-light mt-5 overflow-hidden" style={{ direction: 'rtl' }}>
      
      {/* ستايل مخصص متجاوب مع الموبايل */}
      <style>{`
        .services-carousel .carousel-control-prev,
        .services-carousel .carousel-control-next {
          width: 45px;
          height: 45px;
          background-color: #1e5631; /* لون أخضر  */
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.9;
          display: none; /* إخفاء الأسهم افتراضياً على الموبايل لمنع المسطرة */
        }

        /* إظهار الأسهم وضبط أماكنها فقط على الشاشات الكبيرة (الكمبيوتر) */
        @media (min-width: 992px) {
          .services-carousel .carousel-control-prev,
          .services-carousel .carousel-control-next {
            display: flex; /* إظهار الأسهم */
          }
          .services-carousel .carousel-control-prev { right: -55px; left: auto; }
          .services-carousel .carousel-control-next { left: -55px; right: auto; }
        }

        .services-carousel .carousel-indicators { bottom: -40px; }
        .services-carousel .carousel-indicators button { background-color: #1e5631; }
      `}</style>

      <Container>
        {/* الترويسة العلوية */}
        <div className="pages d-flex justify-content-between align-items-center mb-5 text-right">
          <div>
            <h2 className="fw-bold mb-1" style={{ color: '#102a43' }}>الخدمات الأكثر استخدامًا</h2>
            <p className="text-muted small mb-0">الوصول السريع للخدمات الحكومية الحيوية</p>
          </div>
        </div>

        {/* الكاروسيل العادي الذكي */}
        <Carousel 
          className="services-carousel" 
          indicators={true} 
          controls={true} 
          interval={null} /* منع التحرك التلقائي المزعج */
          touch={true}    /* تفعيل السحب باللمس لسهولة الاستخدام على الموبايل */
        >
          
          {/* المجموعة الأولى: الخدمات (1، 2، 3) */}
          <Carousel.Item>
            <Row className="g-3 pb-3">
              {services.slice(0, 3).map((service) => (
                <Col md={4} key={service.id}>
                  <div 
                    className="card service-card p-4 border-0 shadow-sm d-flex flex-column align-items-start text-right h-100"
                    style={{ borderRadius: '16px', minHeight: '200px', backgroundColor: '#ffffff' }}
                  >
                    <div className="icon-wrapper mb-3 text-success fs-3 bg-light rounded-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                      <i className={`bi ${service.icon}`} style={{ color: '#1e5631' }}></i>
                    </div>
                    <h5 className="fs-6 fw-bold text-dark mb-2 w-100">{service.title}</h5>
                    <p className="text-muted mb-0 w-100" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                      {service.description}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </Carousel.Item>

          {/* المجموعة الثانية: الخدمات (4، 5، 6) */}
          <Carousel.Item>
            <Row className="g-3 pb-3">
              {services.slice(3, 6).map((service) => (
                <Col md={4} key={service.id}>
                  <div 
                    className="card service-card p-4 border-0 shadow-sm d-flex flex-column align-items-start text-right h-100"
                    style={{ borderRadius: '16px', minHeight: '200px', backgroundColor: '#ffffff' }}
                  >
                    <div className="icon-wrapper mb-3 text-success fs-3 bg-light rounded-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                      <i className={`bi ${service.icon}`} style={{ color: '#1e5631' }}></i>
                    </div>
                    <h5 className="fs-6 fw-bold text-dark mb-2 w-100">{service.title}</h5>
                    <p className="text-muted mb-0 w-100" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                      {service.description}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </Carousel.Item>

        </Carousel>
      </Container>
    </section>

    
      {/* القسم الرابع: جهزة تفعيل ابشر  */}
      <section className="mt-5">
      <Container>
      <div className="title">
            <h2 className="fw-bold" style={{ color: '#102a43' }}>فروع مكاتب سودابوست في السعودية</h2>
            <p>مواقع مكاتب سودابوست حول المملكة العربية السعودية</p>
          </div>
    
     <div className="map">
       <Row>
       <Col sm={6}>
       <div className=" my-3" style={{ direction: 'rtl' }}>
  {/* الحاوية الرئيسية القابلة للتمرير عمودياً (تظهر 3 عناصر فقط) */}
  <div className="vertical-scroll-wrapper p-2">
    
    {/* الكرت الأول باللون الرمادي الخفيف */}
    <div className="custom-vertical-card d-flex align-items-center p-3 mb-3 border-0 shadow-sm rounded-4 text-end bg-light">
      {/* الأيقونة باللون الأخضر (في الجهة اليمنى) */}
      <div className="vertical-icon-box bg-white rounded-3 d-flex align-items-center justify-content-center text-success fs-4 ms-3 shadow-sm">
        <i className="bi bi-geo-alt-fill"></i>
      </div>
      {/* المحتوى النصي */}
      <div className="flex-grow-1">
        <h5 className="fw-bold mb-1 text-dark fs-6">فرع الرياض الرئيسي</h5>
        <p className="text-muted mb-0 small">طريق الملك فهد، حي المروج، المجمع الحكومي.</p>
      </div>
    </div>

    {/* الكرت الثاني باللون الرمادي الخفيف */}
    <div className="custom-vertical-card d-flex align-items-center p-3 mb-3 border-0 shadow-sm rounded-4 text-end bg-light">
      {/* الأيقونة باللون الأخضر (في الجهة اليمنى) */}
      <div className="vertical-icon-box bg-white rounded-3 d-flex align-items-center justify-content-center text-success fs-4 ms-3 shadow-sm">
        <i className="bi bi-geo-alt-fill"></i>
      </div>
      {/* المحتوى النصي */}
      <div className="flex-grow-1">
        <h5 className="fw-bold mb-1 text-dark fs-6">فرع منطقة مكة المكرمة</h5>
        <p className="text-muted mb-0 small">حي النسيم، طريق الملك عبدالله، بجوار الدوائر الحكومية.</p>
      </div>
    </div>

    {/* الكرت الثالث باللون الرمادي الخفيف */}
    <div className="custom-vertical-card d-flex align-items-center p-3 mb-3 border-0 shadow-sm rounded-4 text-end bg-light">
      {/* الأيقونة باللون الأخضر (في الجهة اليمنى) */}
      <div className="vertical-icon-box bg-white rounded-3 d-flex align-items-center justify-content-center text-success fs-4 ms-3 shadow-sm">
        <i className="bi bi-geo-alt-fill"></i>
      </div>
      {/* المحتوى النصي */}
      <div className="flex-grow-1">
        <h5 className="fw-bold mb-1 text-dark fs-6">فرع المنطقة الشرقية</h5>
        <p className="text-muted mb-0 small">الدمام، حي الشاطئ، طريق الملك فيصل.</p>
      </div>
    </div>

    {/* الكرت الرابع باللون الرمادي الخفيف (مخفي ويظهر بالتمرير) */}
    <div className="custom-vertical-card d-flex align-items-center p-3 mb-3 border-0 shadow-sm rounded-4 text-end bg-light">
      {/* الأيقونة باللون الأخضر (في الجهة اليمنى) */}
      <div className="vertical-icon-box bg-white rounded-3 d-flex align-items-center justify-content-center text-success fs-4 ms-3 shadow-sm">
        <i className="bi bi-geo-alt-fill"></i>
      </div>
      {/* المحتوى النصي */}
      <div className="flex-grow-1">
        <h5 className="fw-bold mb-1 text-dark fs-6">فرع منطقة المدينة المنورة</h5>
        <p className="text-muted mb-0 small">طريق سلطانة، مقابل مجمع الدوائر الحكومية.</p>
      </div>
    </div>

  </div>
</div>
       </Col>
         <Col sm={6}>
         <img src={picmap} alt="Untitled-1.jpg" height="100%" width="100%" className="d-inline-block align-top" />
         </Col>
       </Row>
     </div>
      </Container>
      </section>


        {/* قسم إنجازات الشركة بالأرقام */}
<section className="my-5 py-5 bg-white" style={{ direction: 'rtl' }}>
  <div className="container">
    
    {/* عنوان القسم */}
    <div className="title text-end mb-5">
      <h2 className="fw-bold" style={{ color: '#102a43' }}>إنجازاتنا بالأرقام</h2>
      <p className="text-muted">نعتز بثقة عملائنا ونستمر في تحقيق الأرقام القياسية لتقديم أفضل الخدمات الرقمية</p>
    </div>

    {/* صف الخانات الأربعة المتجاورة أفقياً */}
    <div className="row g-4 text-center">
      
      {/* الخانة الأولى: العمليات المنفذة */}
      <div className="col-lg-3 col-md-6">
        <div className="stats-card p-4 rounded-4 shadow-sm bg-light border-0">
          <div className="stats-icon-box bg-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow-sm">
          <i className="bi bi-person-vcard fs-3"></i>
          </div>
          <h6 className="fw-bold text-secondary mb-2">إجمالي عدد الهويات الرقمية</h6>
          <div className="d-flex align-items-center justify-content-center gap-1">
            <span className="stats-number fw-bold text-success">+28</span>
            <span className="stats-unit fw-bold text-dark">مليون</span>
          </div>
        </div>
      </div>

      {/* الخانة الثانية: المستخدمين النشطين */}
      <div className="col-lg-3 col-md-6">
        <div className="stats-card p-4 rounded-4 shadow-sm bg-light border-0">
          <div className="stats-icon-box bg-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow-sm">
          <i className="bi bi-arrows-collapse-vertical fs-3"></i>
          </div>
          <h6 className="fw-bold text-secondary mb-2">عدد العمليات المنفذة</h6>
          <div className="d-flex align-items-center justify-content-center gap-1">
            <span className="stats-number fw-bold text-success">+430</span>
            <span className="stats-unit fw-bold text-dark">مليون</span>
          </div>
        </div>
      </div>

      {/* الخانة الثالثة: الوثائق الرقمية */}
      <div className="col-lg-3 col-md-6">
        <div className="stats-card p-4 rounded-4 shadow-sm bg-light border-0">
          <div className="stats-icon-box bg-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow-sm">
          <i className="bi bi-arrow-bar-right fs-3"></i>
          </div>
          <h6 className="fw-bold text-secondary mb-2">عملية تسجيل الدخول  </h6>
          <div className="d-flex align-items-center justify-content-center gap-1">
            <span className="stats-number fw-bold text-success">+347</span>
            <span className="stats-unit fw-bold text-dark">مليون</span>
          </div>
        </div>
      </div>

      {/* الخانة الرابعة: زيارات المنصة */}
      <div className="col-lg-3 col-md-6">
        <div className="stats-card p-4 rounded-4 shadow-sm bg-light border-0">
          <div className="stats-icon-box bg-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow-sm">
          <i className="bi bi-phone-flip fs-3"></i>
          </div>
          <h6 className="fw-bold text-secondary mb-2">عدد مرات تنزيل التطبيق </h6>
          <div className="d-flex align-items-center justify-content-center gap-1">
            <span className="stats-number fw-bold text-success">+24</span>
            <span className="stats-unit fw-bold text-dark">مليون</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

{/* القسم الثالث: كاروسيل خدمات وأخبار الشحن المحسّن لونيًا وهيكليًا */}
<section className="services-carousel-section position-relative py-5 mt-5" style={{ backgroundColor: '#f4f6f9' }}>
      <Container>
        <div className="pages d-flex justify-content-between align-items-center mb-4 border-0">
          <div>
            {/* لون داكن فخم للعنوان الرئيسي متناسق مع منصة سوداباس */}
            <h2 className="fw-bold" style={{ color: '#102a43' }}>آخر الأخبار والمستجدات</h2>
            <p className="mt-1" style={{ color: '#627d98', fontSize: '0.95rem' }}>تابع مواعيد الرحلات، التحديثات الجمركية، وبشريات شبكة شحن سودابوست</p>
          </div>
          
        </div>

        <div className="carousel-wrapper position-relative">
          
          {/* سهم اليمين (الرجوع للخلف) */}
          {showRightArrow && (
            <div className="carousel-blur-edge-right d-flex align-items-center justify-content-center">
              <button
                onClick={scrollRight}
                className="btn rounded-circle d-flex align-items-center justify-content-center shadow-lg"
                style={{ 
                  width: '46px', 
                  height: '46px', 
                  zIndex: 10, 
                  border: 'none',
                  backgroundColor: '#006650', /* لون أخضر لوجستي مريح متناسق مع هوية الشركة */
                  color: '#ffffff'
                }}
                aria-label="التمرير لليمين"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* حاوية كروت الأخبار المرنة */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="carousel-container d-flex gap-3 overflow-x-auto pb-3"
            style={{ scrollBehavior: 'smooth' }}
          >
            {services.map((service) => (
              <div
                key={service.id}
                className="card service-card p-4 border-0 flex-shrink-0 d-flex flex-column align-items-center text-center justify-content-center"
                style={{ 
                  width: '260px', 
                  borderRadius: '20px', 
                  minHeight: '380px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10px 30px rgba(0, 102, 80, 0.04)' /* ظل ناعم مائل للون الأخضر اللوجستي */
                }}
              >
                {/* خلفية الأيقونة: تم استبدال الشعار القديم بأيقونة طرد برمجية معبرة عن الشحن والتوصيل */}
                <div 
                  className="icon-wrapper mb-4 rounded-4 d-flex align-items-center justify-content-center" 
                  style={{ 
                    width: '65px', 
                    height: '65px',
                    backgroundColor: '#eaf4ec' /* تباين أخضر فاتح راقٍ */
                  }}
                >
                  <BoxSeam size={30} style={{ color: '#006650' }} />
                </div>
                
                {/* عنوان كارت الخبر */}
                <h5 className="fs-6  fw-bold mb-3 w-100" style={{ color: '#102a43' }}>{service.title}</h5>
                
                {/* نص وصف الخبر */}
                <p className="mb-0 w-100" style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#486581' }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* سهم اليسار (التقدم للأمام) */}
          {showLeftArrow && (
            <div className="carousel-blur-edge-left d-flex align-items-center justify-content-center">
              <button
                onClick={scrollLeft}
                className="btn rounded-circle d-flex align-items-center justify-content-center shadow-lg"
                style={{ 
                  width: '46px', 
                  height: '46px', 
                  zIndex: 10, 
                  border: 'none',
                  backgroundColor: '#006650',
                  color: '#ffffff'
                }}
                aria-label="التمرير لليسار"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
          )}

        </div>
      </Container>
    </section>


<section className="py-5 bg-white" style={{ direction: 'rtl', textAlign: 'right' }}>
      <Container>
        <Row className="align-items-center justify-content-center">
          
          {/* العمود الأول: صورة التطبيق الكبيرة موسطة */}
          <Col md={6} className="d-flex align-items-center justify-content-center mb-5 mb-md-0">
            <img 
              src={logo7} 
              alt="SudaPass App Mockup"  
              className="img-fluid" 
              style={{ maxWidth: '85%', height: 'auto' }} 
            />
          </Col>

          {/* العمود الثاني: المحتوى الإرشادي وأزرار المتاجر تحت بعضها تماماً */}
          <Col md={6} className="d-flex flex-column align-items-center align-items-md-start justify-content-center">
            
            {/* 1. الأيقونة اللوجستية في الأعلى المتناسبة مع خدمات الشحن بدلاً من الهوية الحكومية */}
            <div 
              className="icon-wrapper rounded-4 d-flex align-items-center justify-content-center shadow-sm mb-4" 
              style={{ 
                width: '90px', 
                height: '90px',
                backgroundColor: '#eaf4ec' // خلفية خضراء هادئة تناسب هوية سودابوست
              }}
            >
              {/* تم استخدام أيقونة الطرود الشحن البرمجية BoxSeam بلون أخضر لوجستي مميز وعصري */}
              <BoxSeam size={45} style={{ color: '#006650' }} />
            </div>

            {/* 2. العنوان الرئيسي */}
            <h2 className="fw-bold mb-3" style={{ color: '#102a43' }}>
              تطبيق سودابوست الذكي للشحن
            </h2>

            {/* 3. البرجراف الوصفي المحدث ليعبر عن الشحن والتتبع */}
            <p className="text-muted mb-4 fs-6" style={{ lineHeight: '1.8', maxWidth: '450px' }}>
              قم بتنزيل التطبيق الآن لإدارة شحناتك، تتبع الطرود خطوة بخطوة، حساب التكاليف التقديرية، والوصول إلى حلولنا اللوجستية المتكاملة في أي وقت ومن أي مكان.
            </p>

            {/* 4. قائمة أزرار التحميل باللون الأسود تحت المحتوى */}
            <div className="d-flex flex-wrap gap-3 mt-2 justify-content-center justify-content-md-start">
              
              {/* App Store */}
              <a href="#appstore" className="text-decoration-none text-white d-flex align-items-center px-3 py-2" 
                 style={{ backgroundColor: '#000000', borderRadius: '10px', minWidth: '145px', transition: 'transform 0.2s' }}>
                <Apple size={24} className="me-2 ms-1" />
                <div className="text-start d-flex flex-column ms-2">
                  <span style={{ fontSize: '0.65rem', color: '#a0aec0' }}>Download on the</span>
                  <span className="fw-bold" style={{ fontSize: '0.9rem', lineHeight: '1.2' }}>App Store</span>
                </div>
              </a>

              {/* Google Play */}
              <a href="#googleplay" className="text-decoration-none text-white d-flex align-items-center px-3 py-2" 
                 style={{ backgroundColor: '#000000', borderRadius: '10px', minWidth: '145px', transition: 'transform 0.2s' }}>
                <GooglePlay size={22} className="me-2 ms-1" />
                <div className="text-start d-flex flex-column ms-2">
                  <span style={{ fontSize: '0.65rem', color: '#a0aec0' }}>GET IT ON</span>
                  <span className="fw-bold" style={{ fontSize: '0.9rem', lineHeight: '1.2' }}>Google Play</span>
                </div>
              </a>

              {/* App Gallery (Huawei) */}
              <a href="#appgallery" className="text-decoration-none text-white d-flex align-items-center px-3 py-2" 
                 style={{ backgroundColor: '#000000', borderRadius: '10px', minWidth: '145px', transition: 'transform 0.2s' }}>
                {/* تم استبدال الأيقونة العشوائية بأيقونة طرد إضافية تناسب الهواوي بشكل أنيق وتدعم فكرة الشحن */}
                <BoxSeam size={22} className="me-2 ms-1" />
                <div className="text-start d-flex flex-column ms-2">
                  <span style={{ fontSize: '0.65rem', color: '#a0aec0' }}>EXPLORE IT ON</span>
                  <span className="fw-bold" style={{ fontSize: '0.85rem', lineHeight: '1.2' }}>AppGallery</span>
                </div>
              </a>

            </div>

          </Col>

        </Row>
      </Container>
    </section>

    <section className="py-5 bg-light" style={{ direction: 'rtl', textAlign: 'right' }}>
  <Container>
    {/* حاوية فرعية مرنة لترتيب العناصر عمودياً تحت بعضها والبدء من اليمين */}
    <div className="d-flex flex-column align-items-start gap-3">
      
      {/* 1. الـ div الحاوي للأيقونة */}
      <div 
        className="icon-container d-flex align-items-center justify-content-center rounded-circle shadow-sm"
        style={{ 
          width: '55px', 
          height: '55px', 
          backgroundColor: '#eaf4ec' /* خلفية خضراء فاتحة ناعمة */
        }}
      >
        <i className="bi bi-envelope-paper" style={{ color: '#1e5631' }}></i>
      </div>

      {/* 2. العنوان الرئيسي */}
      <h4 className="fw-bold" style={{ color: '#102a43' }}>
        هل لديك أي استفسارات أو مقترحات؟
      </h4>

      {/* 3. البرجراف الوصفي */}
      <p className="text-muted mb-3" >
        نرحب باستقبال استفساراتك ومقترحاتك من خلال صفحة اتصل بنا.
      </p>

      {/* 4. الزر باللون الأخضر الملكي */}
     {/* 4. الزر بعد تعديله ليفتح قائمة الاتصال في الهاتف مباشرة */}
<a 
  href="tel:+966551540183" // قم بتغيير هذا الرقم إلى رقم الهاتف المخصص لشركتك أو مركزك
  className="btn px-4 py-2.5 fw-bold text-white shadow-sm custom-feedback-btn d-inline-flex align-items-center gap-2"
  style={{ 
    backgroundColor: '#1e5631', 
    borderRadius: '8px',
    border: 'none',
    transition: 'all 0.2s',
    textDecoration: 'none' // لإزالة الخط السفلي الافتراضي للرابط
  }}
>
  <i className="bi bi-telephone-fill"></i> {/* إضافة أيقونة الهاتف لمظهر احترافي */}
  اتصل بنا الآن
</a>

    </div>
  </Container>
</section>
    </div>
  );
};

export default MostUsedServices;