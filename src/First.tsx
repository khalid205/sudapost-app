import React, { useRef, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom'; 
import './First.css';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth } from './firebase'; 
import picmap from './Untitled-1.jpg';
import logo7 from './AbsherApp.png';
import { Apple, BoxSeam, ChevronRight, ChevronLeft, ArrowLeft, Google } from 'react-bootstrap-icons';



export const MostUsedServices: React.FC = () => {

  const services = [
    {
      id: 1,
      title: "شحن بضائع ومواد تموينية",
      description: "نقل وشحن المواد التموينية والغذائية بأعلى معايير الجودة والتحكم الحراري.",
      icon: "bi-box-seam"
    },
    {
      id: 2,
      title: "شحن أثاث منزلي ومكتبي",
      description: "نظافة، تغليف، وفك وتركيب الأثاث المنزلي والمكتبي بعناية فائقة.",
      icon: "bi-house-heart"
    },
    {
      id: 3,
      title: "شحن مواشي وأغنام",
      description: "أساطيل مجهزة خصيصاً لنقل وشحن المواشي الحية وفق الاشتراطات الرسمية.",
      icon: "bi-truck"
    },

    {
      id: 4,
      title: "شحن مركبات ",
      description: "أساطيل مجهزة خصيصاً لنقل وشحن المركبات وفق الاشتراطات الرسمية.",
      icon: "bi-truck"
    }
  ];

  // تعريف مرجع حاوية التمرير
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // --- تعريف دالة scrollRight هنا ---
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // المسافة التي يتم التمرير إليها (بالبيكسل)
        behavior: 'smooth'
      });
    }
  };

  // --- تعريف دالة scrollLeft (اختياري للسهم الآخر) ---
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const [showLeftArrow, setShowLeftArrow] = useState(true);

  const handleScroll = () => {
  if (scrollContainerRef.current) {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // نستخدم Math.abs لأن التمرير في الواجهات العربية (RTL) قد يعطي قيماً سالبة
    const currentScroll = Math.abs(scrollLeft);

    // إظهار سهم اليمين إذا تحركنا من نقطة البداية
    setShowRightArrow(currentScroll > 0);
    
    // إظهار سهم اليسار إذا لم نصل إلى نهاية الحاوية
    setShowLeftArrow(currentScroll < scrollWidth - clientWidth - 5);
  }
};



  // 1. حالات شاشة تسجيل الدخول (الرئيسية في الكارد العائم)
  const [usernameOrId, setUsernameOrId] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  // حالات التحكم في النوافذ المنبثقة (Modals)
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // 2. حالات شاشة "تسجيل حساب جديد"
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  // 3. حالات شاشة "نسيت كلمة المرور"
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

 

  // تنفيذ شاشة تسجيل الدخول
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      await signInWithEmailAndPassword(auth, usernameOrId, password);
      setLoginLoading(false);
      setLoginSuccess(true);
    } catch (err: any) {
      setLoginLoading(false);
      setLoginError('فشل تسجيل الدخول: تأكد من صحة البريد الإلكتروني أو كلمة المرور.');
    }
  };

  // تنفيذ شاشة تسجيل حساب جديد
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (regPassword !== regConfirmPassword) {
      setRegError('كلمتا المرور غير متطابقتين. يرجى التحقق مرة أخرى.');
      return;
    }

    setRegLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: regFullName
        });
      }

      setRegLoading(false);
      setRegSuccess(true);
    } catch (err: any) {
      setRegLoading(false);
      if (err.code === 'auth/email-already-in-use') {
        setRegError('البريد الإلكتروني مستخدم مسبقاً، يرجى تسجيل الدخول بدلاً من ذلك.');
      } else if (err.code === 'auth/weak-password') {
        setRegError('كلمة المرور ضعيفة جداً، يجب أن تكون 6 أحرف على الأقل.');
      } else {
        setRegError('حدث خطأ أثناء إنشاء الحساب. حاول مرة أخرى.');
      }
    }
  };

  // تنفيذ شاشة نسيت كلمة المرور
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotLoading(true);

    try {
      await sendPasswordResetEmail(auth, forgotEmail);
      setForgotLoading(false);
      setForgotSuccess(true);
    } catch (err: any) {
      setForgotLoading(false);
      if (err.code === 'auth/user-not-found') {
        setForgotError('لم يتم العثور على حساب مرتبط بهذا البريد الإلكتروني.');
      } else {
        setForgotError('حدث خطأ أثناء إرسال رابط الاستعادة. تأكد من صحة البريد.');
      }
    }
  };

  

  return (
    <div dir="rtl" style={{ textAlign: 'right' }}>
      {/* القسم الأول: السلايدر الرئيسي للإعلانات مع شاشة/لوحة تسجيل الدخول في أقصى اليسار */}
      <section className="position-relative" style={{ direction: 'rtl', minHeight: '500px', backgroundColor: '#f8f9fa' }}>
        
        {/* الكاروسيل */}
        <Carousel indicators={true} controls={false} interval={4000} fade>
          {[
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=1200&auto=format&fit=crop"
          ].map((imgUrl, index) => (
            <Carousel.Item key={index} style={{ maxHeight: '550px', position: 'relative' }}>
              <img src={imgUrl} className="d-block w-100 object-fit-cover" style={{ height: '520px' }} alt="" />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1 }}></div>
            </Carousel.Item>
          ))}
        </Carousel>
    
        {/* [1] شاشة تسجيل الدخول الرئيسية (الكارد العائم) */}
        <div 
          className="position-absolute top-50 translate-middle-y shadow-lg d-none d-md-block"
          style={{ 
            left: '8%', 
            zIndex: 10, 
            width: '380px', 
            backgroundColor: '#ffffff', 
            borderRadius: '20px',
            padding: '35px 30px', 
            border: '1px solid #e2e8f0'
          }}
        >
          <div className="text-center mb-4">
            <h4 className="fw-bold mb-1" style={{ color: '#102a43' }}>تسجيل الدخول</h4>
            <p className="text-muted small mb-0">الوصول الآمن لخدمات منصة سودابوست</p>
          </div>

          {loginSuccess ? (
            <div className="text-center py-4">
              <div className="text-success display-5 mb-2">✓</div>
              <h5 className="fw-bold text-success">تم تسجيل الدخول بنجاح!</h5>
              <p className="text-muted small">مرحباً بك مجدداً في منصة سودابوست.</p>
              <button 
                className="btn btn-outline-secondary btn-sm mt-2" 
                onClick={() => setLoginSuccess(false)}
              >
                تسجيل الخروج
              </button>
            </div>
          ) : (
            <>
              {loginError && <div className="alert alert-danger p-2 small mb-3 text-center">{loginError}</div>}

              <form onSubmit={handleLoginSubmit}>
                <div className="mb-3"> 
                  <label className="form-label small fw-bold text-secondary mb-1">البريد الإلكتروني</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-start-0" style={{ borderTopRightRadius: '8px', borderBottomRightRadius: '8px', padding: '10px' }}>
                      <i className="bi bi-person text-muted"></i>
                    </span>
                    <input 
                      type="email" 
                      className="form-control bg-light border-end-0" 
                      placeholder="name@example.com"
                      value={usernameOrId}
                      onChange={(e) => setUsernameOrId(e.target.value)}
                      style={{ borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px', fontSize: '0.9rem', padding: '10px' }} 
                      required
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px', fontSize: '0.9rem', padding: '10px' }} 
                      required
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4 small">
                  <button 
                    type="button" 
                    className="btn btn-link p-0 text-decoration-none" 
                    style={{ color: '#2b8a3e', fontWeight: '600' }}
                    onClick={() => { 
                      setShowForgotModal(true); 
                      setForgotSuccess(false); 
                      setForgotError(''); 
                      setForgotEmail('');
                    }}
                  >
                    نسيت كلمة المرور؟
                  </button>

                  <button 
                    type="button" 
                    className="btn btn-link p-0 text-decoration-none text-secondary fw-semibold"
                    onClick={() => { 
                      setShowRegisterModal(true); 
                      setRegSuccess(false); 
                      setRegError(''); 
                      setRegFullName('');
                      setRegEmail('');
                      setRegPassword('');
                      setRegConfirmPassword('');
                    }}
                  >
                    مستخدم جديد؟
                  </button>
                </div>

                <button 
                  type="submit" 
                  className="btn w-100 py-2.5 fw-bold text-white shadow-sm d-flex align-items-center justify-content-center gap-2"
                  style={{ backgroundColor: '#1e5631', borderRadius: '8px', fontSize: '1rem', border: 'none' }}
                  disabled={loginLoading}
                >
                  {loginLoading ? <Spinner animation="border" size="sm" /> : 'تسجيل الدخول'}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* قسم الخدمات الفورية والتبويبات الرئيسية */}
      <section className="mt-5" style={{ direction: 'rtl', textAlign: 'right' }}>
        <Container>
          <div className="title mb-4">
            <h2 className="fw-bold" style={{ color: '#102a43' }}>خدمات سودابوست الفورية</h2>
            <p style={{ color: '#627d98' }}>خدمات لا تتطلب تسجيل دخول لتنفيذها</p>
          </div>

          <Tabs transition={false} id="noanim-tab-example" className="mb-5 mt-4 custom-tabs border-0">
            {/* Tab 1: مواعيد */}
            <Tab eventKey="مواعيد" title={<span><i className="bi bi-calendar2 me-2"></i> حجز مواعيد</span>} >
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={5} className="mb-4">
                    <Nav variant="pills" className="flex-column custom-pills">
                      <Nav.Item><Nav.Link eventKey="first"><i className="bi bi-question-circle me-2"></i> إصدار رخصة قيادة</Nav.Link></Nav.Item>
                      <Nav.Item><Nav.Link eventKey="second" className="my-2"><i className="bi bi-question-circle me-2"></i> مواعيد الأحوال المدنية</Nav.Link></Nav.Item>
                      <Nav.Item><Nav.Link eventKey="third"><i className="bi bi-question-circle me-2"></i> مواعيد المديرية العامة للجوازات</Nav.Link></Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={7} style={{ borderRight: '1px solid #edf2f7', paddingRight: '30px' }}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}>إصدار رخصة قيادة</h4>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>تتيح هذه الخدمة للمستفيدين حجز مواعيد التدريب في مدارس تعليم القيادة وإصدار الرخصة.</p>
                        <Nav.Link as={Link} to="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm d-inline-flex align-items-center gap-2" style={{ backgroundColor: "#006650", color: "#ffffff" }}>بدء الخدمة <ArrowLeft /></Nav.Link>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}>مواعيد الأحوال المدنية</h4>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>تتيح هذه الخدمة للمستفيد حجز موعد جديد أو تعديل موعد سابق لمراجعة مكاتب الأحوال المدنية.</p>
                        <Nav.Link as={Link} to="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm d-inline-flex align-items-center gap-2" style={{ backgroundColor: "#006650", color: "#ffffff" }}>بدء الخدمة <ArrowLeft /></Nav.Link>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}>مواعيد المديرية العامة للجوازات</h4>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>تتيح هذه الخدمة للأفراد المسجلين على منصة سودابوست حجز المواعيد لدى مكاتب المديرية العامة للجوازات.</p>
                        <Nav.Link as={Link} to="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm d-inline-flex align-items-center gap-2" style={{ backgroundColor: "#006650", color: "#ffffff" }}>بدء الخدمة <ArrowLeft /></Nav.Link>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Tab>

            {/* Tab 2: مركبات */}
            <Tab eventKey="مركبات" title={<span><i className="bi bi-car-front-fill me-2"></i> شحن مركبات</span>}>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={5} className="mb-4">
                    <Nav variant="pills" className="flex-column custom-pills">
                      <Nav.Item><Nav.Link eventKey="first"><i className="bi bi-question-circle me-2"></i> استعراض المراكز المعتمدة لإسقاط المركبات</Nav.Link></Nav.Item>
                      <Nav.Item><Nav.Link eventKey="second" className="my-2"><i className="bi bi-question-circle me-2"></i> مزاد اللوحات</Nav.Link></Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={7} style={{ borderRight: '1px solid #edf2f7', paddingRight: '30px' }}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}>استعراض المراكز المعتمدة لإسقاط المركبات</h4>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>تتيح هذه الخدمة التعرّف على المراكز المعتمدة لإسقاط جميع أنواع المركبات المهملة والتالفة.</p>
                        <Nav.Link as={Link} to="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm d-inline-flex align-items-center gap-2" style={{ backgroundColor: "#006650", color: "#ffffff" }}>بدء الخدمة <ArrowLeft /></Nav.Link>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}>مزاد اللوحات</h4>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>تتيح هذه الخدمة إمكانية المزايدة على لوحة مركبة من نوع خصوصي، أو نقل خاص أو دراجة نارية.</p>
                        <Nav.Link as={Link} to="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm d-inline-flex align-items-center gap-2" style={{ backgroundColor: "#006650", color: "#ffffff" }}>بدء الخدمة <ArrowLeft /></Nav.Link>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Tab>

            {/* Tab 3: أثاث */}
            <Tab eventKey="زوار" title={<span><i className="bi bi-bag-heart me-2"></i> شحن اثاثات</span>}>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={5} className="mb-4">
                    <Nav variant="pills" className="flex-column custom-pills">
                      <Nav.Item><Nav.Link eventKey="first"><i className="bi bi-question-circle me-2"></i> اثاثات منزلية</Nav.Link></Nav.Item>
                      <Nav.Item><Nav.Link eventKey="second" className="my-2"><i className="bi bi-question-circle me-2"></i> اثاثات مكتبية</Nav.Link></Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={7} style={{ borderRight: '1px solid #edf2f7', paddingRight: '30px' }}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}>ارتقِ بأسلوب حياتك: أثاث فاخر يصنع فارقاً في منزلك</h4>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>ننسج الفخامة والراحة في كل قطعة أثاث ومفروشات نقدمها لك لتجتمع جودة الخامات مع دقة التصميم.</p>
                        <Nav.Link as={Link} to="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm d-inline-flex align-items-center gap-2" style={{ backgroundColor: "#006650", color: "#ffffff" }}>بدء الخدمة <ArrowLeft /></Nav.Link>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}>صمّم بيئة عمل تلهم النجاح وتصنع الفارق لشركتك</h4>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>نقدم للشركات والمنشآت حلولاً متكاملة من الأثاث المكتبي الفاخر لتشجيع الإبداع والإنتاجية.</p>
                        <Nav.Link as={Link} to="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm d-inline-flex align-items-center gap-2" style={{ backgroundColor: "#006650", color: "#ffffff" }}>بدء الخدمة <ArrowLeft /></Nav.Link>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Tab>

            {/* Tab 4: شهادات */}
            <Tab eventKey="شهادات" title={<span><i className="bi bi-journal-bookmark-fill me-2"></i> استخراج وتوثيق شهادات</span>}>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={5} className="mb-4">
                    <Nav variant="pills" className="flex-column custom-pills">
                      <Nav.Item><Nav.Link eventKey="first"><i className="bi bi-question-circle me-2"></i> استعراض المراكز المعتمدة</Nav.Link></Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={7} style={{ borderRight: '1px solid #edf2f7', paddingRight: '30px' }}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}>دليلك الشامل للمراكز المعتمدة للشهادات المهنية</h4>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>نستعرض لك الدليل الحصري لكافة المراكز والمعاهد المعتمدة من الجهات الرسمية في المملكة العربية السعودية.</p>
                        <Nav.Link as={Link} to="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm d-inline-flex align-items-center gap-2" style={{ backgroundColor: "#006650", color: "#ffffff" }}>بدء الخدمة <ArrowLeft /></Nav.Link>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Tab>

            {/* Tab 5: شحن بضاعة */}
            <Tab eventKey="مخالفات" title={<span><i className="bi bi-chat-right-text me-2"></i> شحن بضاعة</span>}>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={5} className="mb-4">
                    <Nav variant="pills" className="flex-column custom-pills">
                      <Nav.Item><Nav.Link eventKey="first"><i className="bi bi-question-circle me-2"></i> شحن مواشي</Nav.Link></Nav.Item>
                      <Nav.Item><Nav.Link eventKey="second" className="my-2"><i className="bi bi-question-circle me-2"></i> شحن مواد تموينية</Nav.Link></Nav.Item>
                      <Nav.Item><Nav.Link eventKey="three" className="my-2"><i className="bi bi-question-circle me-2"></i> شحن اجهزة كهربائية</Nav.Link></Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={7} style={{ borderRight: '1px solid #edf2f7', paddingRight: '30px' }}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}>التميز في نقل وشحن المواشي الحية بأعلى معايير السلامة</h4>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>نوفر لك حلولاً متكاملة لنقل وشحن المواشي الحية عبر أساطيل مجهزة بالكامل ومطابقة للمواصفات.</p>
                        <Nav.Link as={Link} to="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm d-inline-flex align-items-center gap-2" style={{ backgroundColor: "#006650", color: "#ffffff" }}>بدء الخدمة <ArrowLeft /></Nav.Link>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}>حلول الشحن المبرد والجاف للمواد التموينية</h4>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>منظومة متكاملة لشحن المواد التموينية والغذائية عبر أساطيل مجهزة بأحدث تقنيات التحكم الحراري.</p>
                        <Nav.Link as={Link} to="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm d-inline-flex align-items-center gap-2" style={{ backgroundColor: "#006650", color: "#ffffff" }}>بدء الخدمة <ArrowLeft /></Nav.Link>
                      </Tab.Pane>
                      <Tab.Pane eventKey="three">
                        <h4 className="fw-bold mb-3" style={{ color: '#102a43' }}>شحن الأجهزة الكهربائية بعناية فائقة</h4>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>نقل وتوصيل الأجهزة الحساسة والكهربائية مع ضمان الحماية التامة والتغليف الاحترافي.</p>
                        <Nav.Link as={Link} to="/HowPost" className="btn mt-4 px-4 py-2 fw-semibold shadow-sm d-inline-flex align-items-center gap-2" style={{ backgroundColor: "#006650", color: "#ffffff" }}>بدء الخدمة <ArrowLeft /></Nav.Link>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Tab>
          </Tabs>
        </Container>
      </section>

      {/* [2] نافذة إنشاء حساب جديد (Modal) */}
      <Modal show={showRegisterModal} onHide={() => setShowRegisterModal(false)} centered>
        <Modal.Body className="p-4 bg-white rounded-4 shadow-lg">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold m-0" style={{ color: '#102a43' }}>إنشاء حساب جديد</h4>
            <button type="button" className="btn-close" onClick={() => setShowRegisterModal(false)} />
          </div>

          {!regSuccess ? (
            <Form onSubmit={handleRegisterSubmit}>
              {regError && <div className="alert alert-danger p-2 small mb-3 text-center">{regError}</div>}
              
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">الاسم الكامل</label>
                <input 
                  type="text" 
                  className="form-control py-2" 
                  placeholder="أدخل اسمك الكامل"
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  className="form-control py-2" 
                  placeholder="name@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">كلمة المرور</label>
                <input 
                  type="password" 
                  className="form-control py-2" 
                  placeholder="6 أحرف على الأقل"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required 
                  minLength={6}
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary">تأكيد كلمة المرور</label>
                <input 
                  type="password" 
                  className="form-control py-2" 
                  placeholder="أعد إدخال كلمة المرور"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  required 
                  minLength={6}
                />
              </div>

              <Button 
                type="submit" 
                className="w-100 py-2.5 fw-bold border-0 text-white" 
                style={{ backgroundColor: '#1e5631', borderRadius: '8px' }}
                disabled={regLoading}
              >
                {regLoading ? <Spinner animation="border" size="sm" /> : 'تسجيل الحساب'}
              </Button>
            </Form>
          ) : (
            <div className="text-center py-4">
              <div className="text-success display-4 mb-2">✓</div>
              <h5 className="fw-bold">تم إنشاء الحساب بنجاح!</h5>
              <p className="text-muted small">يمكنك الآن إغلاق النافذة وتسجيل الدخول بحسابك الجديد.</p>
              <Button 
                variant="dark" 
                className="mt-3 px-4" 
                onClick={() => setShowRegisterModal(false)}
              >
                إغلاق وتسجيل الدخول
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* [3] نافذة نسيت كلمة المرور (Modal) */}
      <Modal show={showForgotModal} onHide={() => setShowForgotModal(false)} centered>
        <Modal.Body className="p-4 bg-white rounded-4 shadow-lg">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold m-0" style={{ color: '#102a43' }}>استعادة كلمة المرور</h4>
            <button type="button" className="btn-close" onClick={() => setShowForgotModal(false)} />
          </div>

          {!forgotSuccess ? (
            <Form onSubmit={handleForgotSubmit}>
              <p className="text-muted small mb-3">
                أدخل بريدك الإلكتروني المسجل، وسنرسل لك فوراً رابطاً آمناً لإعادة تعيين كلمة المرور.
              </p>
              
              {forgotError && <div className="alert alert-danger p-2 small mb-3 text-center">{forgotError}</div>}

              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  className="form-control py-2" 
                  placeholder="name@example.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required 
                />
              </div>

              <Button 
                type="submit" 
                className="w-100 py-2.5 fw-bold border-0 text-white" 
                style={{ backgroundColor: '#1e5631', borderRadius: '8px' }}
                disabled={forgotLoading}
              >
                {forgotLoading ? <Spinner animation="border" size="sm" /> : 'إرسال رابط الاستعادة'}
              </Button>
            </Form>
          ) : (
            <div className="text-center py-4">
              <div className="text-success display-4 mb-2">✓</div>
              <h5 className="fw-bold">تم إرسال الرابط بنجاح</h5>
              <p className="text-muted small">تفقد صندوق الوارد في بريدك الإلكتروني واتبع التعليمات لتغيير كلمة المرور.</p>
              <Button 
                variant="dark" 
                className="mt-3 px-4" 
                onClick={() => setShowForgotModal(false)}
              >
                إغلاق
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>

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
                <Google size={22} className="me-2 ms-1" />
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