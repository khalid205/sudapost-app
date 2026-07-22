import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal, Form, Spinner } from 'react-bootstrap';
import { 
  CashCoin, 
  PeopleFill, 
  LightningChargeFill, 
  PiggyBankFill, 
  ArrowLeftRight, 
  CheckCircleFill, 
  EnvelopeCheckFill
} from 'react-bootstrap-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // تأكد من صحة مسار ملف الـ firebase لديك

// تعريف واجهات البيانات بدقة لتجنب أخطاء الـ Type
interface FinancialService {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  badgeText?: string;
  bgColor: string;
  iconBgColor: string;
  iconColor: string;
  buttonText: string;
}

const FinancialServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<FinancialService | null>(null);
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [showLoadingModal, setShowLoadingModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

  // حالات خاصة بنظام المصادقة (التحقق عند تقديم الطلب المالي)
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // حقول النموذج
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [dynamicValue, setDynamicValue] = useState<string>(''); 

  const formRef = useRef<HTMLFormElement>(null);

  const services: FinancialService[] = [
    {
      id: 'money-transfer',
      title: 'خدمة تحويل الأموال البريدية',
      description: 'نظام الحوالات المالية الفورية والأكثر أماناً لربط العائلات والأعمال عبر شبكة مكاتبنا الممتدة في كافة الولايات والمدن السودانية بأسعار كارموز تشغيلية منافسة.',
      features: ['إرسال واستلام فوري خلال دقائق', 'تغطية جغرافية شاملة لجميع الولايات', 'رسائل نصية تأكيدية للمرسل والمستلم'],
      icon: <ArrowLeftRight size={26} />,
      badgeText: 'الأكثر طلباً',
      bgColor: 'rgba(0, 102, 80, 0.03)', 
      iconBgColor: 'rgba(0, 102, 80, 0.08)',
      iconColor: '#006650',
      buttonText: 'إرسال حوالة الآن'
    },
    {
      id: 'pensions',
      title: 'خدمة صرف المعاشات',
      description: 'نلتزم بمسؤوليتنا الاجتماعية عبر توفير آلية ميسرة ومنظمة لصرف معاشات المتقاعدين من القطاعين الحكومي والخاص بكرامة وسهولة، مع تخصيص نوافذ مريحة لخدمتكم.',
      features: ['صرف سريع دون فترات انتظار طويلة', 'تأمين النوافذ والمقاعد لكبار السن', 'إمكانية الصرف عبر الوكلاء المعتمدين'],
      icon: <PeopleFill size={26} />,
      bgColor: 'rgba(13, 110, 253, 0.02)', 
      iconBgColor: 'rgba(13, 110, 253, 0.08)',
      iconColor: '#0d6efd',
      buttonText: 'الاستعلام عن مواعيد الصرف'
    },
    {
      id: 'electricity',
      title: 'خدمة بيع وتغذية الكهرباء',
      description: 'اشحن عداد الكهرباء الخاص بك فوراً ومن مكانك أو عبر أقرب مكتب بريد. نضمن لك اتصالاً مباشراً مع الشبكة القومية للكهرباء لضمان إصدار الرموز (Tokens) بلا تأخير.',
      features: ['متاح على مدار الساعة طوال الأسبوع', 'إصدار فوري لرمز الشحن الرقمي', 'دعم فني مخصص لحل مشاكل العدادات'],
      icon: <LightningChargeFill size={26} />,
      bgColor: 'rgba(253, 126, 20, 0.02)', 
      iconBgColor: 'rgba(253, 126, 20, 0.08)',
      iconColor: '#fd7e14',
      buttonText: 'شراء كهرباء الآن'
    },
    {
      id: 'savings',
      title: 'خدمة التوفير البريدي',
      description: 'حساب التوفير البريدي التاريخي بحلته الرقمية الجديدة. وسيلتك الآمنة والموثوقة لادخار أموالك وتنميتها، مع مرونة تامة في عمليات السحب والإيداع من أي مكتب بريد.',
      features: ['حماية حكومية كاملة للمدخرات', 'إصدار دفتر توفير وبطاقة سحب آمنة', 'إمكانية فتح الحساب بمبالغ رمزية'],
      icon: <PiggyBankFill size={26} />,
      badgeText: 'محدث رقمياً',
      bgColor: 'rgba(111, 66, 193, 0.02)', 
      iconBgColor: 'rgba(111, 66, 193, 0.08)',
      iconColor: '#6f42c1',
      buttonText: 'فتح حساب توفير'
    }
  ];

  const handleServiceClick = (service: FinancialService) => {
    setSelectedService(service);
    setValidated(false);
    setPhoneNumber('');
    setClientName('');
    setDynamicValue('');
    setShowFormModal(true);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    } 

    setValidated(false);

    // 1. التحقق مما إذا كان المستخدم مسجلاً الدخول في Firebase
    const currentUser = auth.currentUser;
    if (!currentUser) {
      // إذا لم يكن مسجلاً، نغلق نافذة الإدخال ونظهر نافذة تسجيل الدخول المنبثقة
      setShowFormModal(false);
      setShowAuthModal(true);
      return;
    }

    // 2. إذا كان مسجلاً، نكمل العملية مباشرة
    processFinancialSubmission();
  };

  // دالة تنفيذ العملية المالية بعد التأكد من تسجيل الدخول
  const processFinancialSubmission = () => {
    // 1. طباعة مدخلات المستخدم في الـ Console
    console.log("=== مدخلات طلب المستخدم ===");
    console.log("معرّف الخدمة:", selectedService?.id);
    console.log("اسم الخدمة الحالية:", selectedService?.title);
    console.log("اسم العميل كامل:", clientName);
    console.log("رقم الهاتف المتلقي:", phoneNumber);
    console.log("القيمة الحركية للنموذج:", dynamicValue);
    console.log("===========================");

    setShowFormModal(false); // إغلاق نافذة إدخال البيانات
    setShowLoadingModal(true); // إظهار نافذة المعالجة والـ Spinner

    // محاكاة معالجة الطلب لمدة 4 ثوانٍ
    setTimeout(() => {
      setShowLoadingModal(false); // إغلاق نافذة الـ Spinner
      setShowSuccessModal(true);  // إظهار رسالة النجاح والـ Modal النهائية

      // 2. تأكيد وتفريغ المدخلات وإعادة التعيين بالكامل لوضع البداية
      setClientName('');
      setPhoneNumber('');
      setDynamicValue('');
      setValidated(false);
    }, 4000); 
  };

  // دالة تسجيل الدخول عبر النافذة المنبثقة
  const handleModalLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      // إذا نجح تسجيل الدخول:
      setIsLoggingIn(false);
      setShowAuthModal(false); // إغلاق نافذة تسجيل الدخول
      processFinancialSubmission(); // استكمال معالجة الخدمة المالية تلقائياً
    } catch (err) {
      setIsLoggingIn(false);
      setAuthError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    }
  };

  return (
    <>
      {/* سكشن الهيدر الرئيسي للخدمات المالية */}
      <section>
        <div style={{ backgroundColor: "#006650" }} className="text-white py-5 mb-5 text-center">
          <Container className="py-3">
            <CashCoin size={45} className="text-warning mb-3" />
            <h1 className="fw-bold display-6 mb-3 text-warning">
              خدماتنا المالية والمصرفية
            </h1>
            <p className="text-light mx-auto fs-5 lh-lg mb-0" style={{ maxWidth: "800px", opacity: 0.95 }}>
              في بريد السودان، نتخطى حدود الرسائل والطرود لنقدم لك منظومة مالية متكاملة وقريبة منك. نسعى لتسهيل معاملاتك اليومية بدءاً من تحويل الأموال وتأمين مدخراتك، ووصولاً إلى سداد الفواتير وصرف الاستحقاقات بكفاءة، أمان، وموثوقية رقمية عالية.
            </p>
          </Container>
        </div>
      </section>

      {/* قائمة شبكة الخدمات المالية */}
      <Container className="mb-5 pb-5" style={{ direction: 'rtl', fontFamily: 'sans-serif' }}>
        <Row className="g-4 justify-content-center">
          {services.map((service) => (
            <Col key={service.id} md={6} xl={6} className="d-flex">
              <Card 
                className="w-100 border-1 rounded-4 overflow-hidden d-flex flex-column"
                style={{ 
                  borderColor: 'rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
                  backgroundColor: '#ffffff'
                }}
              >
                <div className="p-4 d-flex align-items-start justify-content-between text-end" style={{ backgroundColor: service.bgColor }}>
                  <div className="d-flex align-items-center gap-3">
                    <div 
                      className="p-3 rounded-4 d-flex align-items-center justify-content-center"
                      style={{ backgroundColor: service.iconBgColor, color: service.iconColor }}
                    >
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="fw-bold text-dark mb-1 fs-5">{service.title}</h4>
                      <span className="text-muted small">قطاع الخدمات المالية الرقمية</span>
                    </div>
                  </div>
                  {service.badgeText && (
                    <Badge bg="" className="px-3 py-2 rounded-pill fw-semibold" style={{ backgroundColor: service.iconBgColor, color: service.iconColor }}>
                      {service.badgeText}
                    </Badge>
                  )}
                </div>

                <Card.Body className="p-4 d-flex flex-column text-end justify-content-between">
                  <div>
                    <p className="text-secondary lh-lg mb-4 fs-6" style={{ minHeight: '80px' }}>
                      {service.description}
                    </p>
                    
                    <div className="mb-4">
                      <h6 className="fw-bold text-dark mb-2 small text-uppercase tracking-wide">مميزات وضمانات الخدمة:</h6>
                      <ul className="list-unstyled p-0 m-0">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="d-flex align-items-center gap-2 text-muted small mb-2">
                            <CheckCircleFill size={14} style={{ color: '#006650' }} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="d-grid mt-auto">
                    <Button 
                      variant="outline-dark"
                      onClick={() => handleServiceClick(service)}
                      className="py-2 rounded-3 fw-bold border-1 d-flex align-items-center justify-content-center gap-2"
                      style={{ 
                        borderColor: 'rgba(0, 102, 80, 0.2)', 
                        color: '#006650',
                        backgroundColor: 'transparent'
                      }}
                    >
                      {service.buttonText}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* النافذة المنبثقة الأولى: نموذج تعبئة بيانات الطلب المالي */}
      <Modal 
        show={showFormModal} 
        onHide={() => setShowFormModal(false)} 
        centered 
        contentClassName="border-0 text-end"
        style={{ direction: 'rtl', fontFamily: 'sans-serif' }}
      >
        {selectedService && (
          <div style={{ boxShadow: '0 12px 40px rgba(0, 0, 0, 0.05)', borderRadius: '20px' }} className="overflow-hidden">
            <Modal.Header style={{ backgroundColor: selectedService.bgColor, borderBottom: '1px solid rgba(0,0,0,0.03)' }} className="p-4 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <div className="p-2 rounded-3" style={{ backgroundColor: selectedService.iconBgColor, color: selectedService.iconColor }}>
                  {selectedService.icon}
                </div>
                <Modal.Title className="fw-bold fs-5 text-dark">{selectedService.title}</Modal.Title>
              </div>
            </Modal.Header>
            
            <Modal.Body className="p-4 bg-white">
              <Form noValidate validated={validated} onSubmit={handleFormSubmit} ref={formRef}>
                
                <Form.Group className="mb-3" controlId="formClientName">
                  <Form.Label className="fw-semibold text-secondary small">الاسم بالكامل</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="أدخل اسمك ثلاثي كما هو في الهوية"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="py-2 text-end border-light-subtle"
                  />
                  <Form.Control.Feedback type="invalid">يرجى كتابة الاسم.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhoneNumber">
                  <Form.Label className="fw-semibold text-secondary small">رقم الهاتف (لتلقي رسالة الطلب وبطاقة المعاملة)</Form.Label>
                  <Form.Control
                    required
                    type="tel"
                    placeholder="09XXXXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="py-2 text-end border-light-subtle"
                  />
                  <Form.Control.Feedback type="invalid">يرجى إدخال رقم هاتف صحيح لإرسال الرسالة عليه.</Form.Control.Feedback>
                </Form.Group>

                {selectedService.id === 'money-transfer' && (
                  <Form.Group className="mb-4" controlId="formTransferAmount">
                    <Form.Label className="fw-semibold text-secondary small">المبلغ المراد تحويله (بالجنيه السوداني)</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="أدخل قيمة الحوالة المالية"
                      value={dynamicValue}
                      onChange={(e) => setDynamicValue(e.target.value)}
                      className="py-2 text-end border-light-subtle"
                    />
                    <Form.Control.Feedback type="invalid">يرجى إدخال مبلغ الحوالة المالي.</Form.Control.Feedback>
                  </Form.Group>
                )}

                {selectedService.id === 'electricity' && (
                  <Form.Group className="mb-4" controlId="formMeterNumber">
                    <Form.Label className="fw-semibold text-secondary small">رقم عداد الكهرباء</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="أدخل رقم العداد المكون من 11 أو 13 رقم"
                      value={dynamicValue}
                      onChange={(e) => setDynamicValue(e.target.value)}
                      className="py-2 text-end border-light-subtle"
                    />
                    <Form.Control.Feedback type="invalid">يرجى كتابة رقم العداد بشكل صحيح لشحن الطاقة.</Form.Control.Feedback>
                  </Form.Group>
                )}

                {selectedService.id === 'savings' && (
                  <Form.Group className="mb-4" controlId="formSavingsNumber">
                    <Form.Label className="fw-semibold text-secondary small">رقم حساب التوفير البريدي (إن وجد)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="اكتب رقم الحساب أو اتركه فارغاً لفتح حساب جديد"
                      value={dynamicValue}
                      onChange={(e) => setDynamicValue(e.target.value)}
                      className="py-2 text-end border-light-subtle"
                    />
                  </Form.Group>
                )}

                {selectedService.id === 'pensions' && (
                  <Form.Group className="mb-4" controlId="formPensionId">
                    <Form.Label className="fw-semibold text-secondary small">رقم دفتر المعاش / الرقم التأميني</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="أدخل رقم هويتك التأمينية لمطابقة بيانات المعاش"
                      value={dynamicValue}
                      onChange={(e) => setDynamicValue(e.target.value)}
                      className="py-2 text-end border-light-subtle"
                    />
                    <Form.Control.Feedback type="invalid">يرجى كتابة الرقم التأميني لصاحب المعاش.</Form.Control.Feedback>
                  </Form.Group>
                )}

                <div className="d-flex gap-2 justify-content-end pt-2">
                  <Button 
                    onClick={() => setShowFormModal(false)}
                    variant="light"
                    className="px-4 py-2 rounded-3 fw-semibold text-secondary"
                  >
                    إلغاء
                  </Button>
                  <Button 
                    type="submit"
                    className="px-4 py-2 rounded-3 border-0 fw-semibold"
                    style={{ backgroundColor: '#006650', color: '#ffffff' }}
                  >
                    إرسال وتأكيد الطلب
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </div>
        )}
      </Modal>

      {/* نافذة تسجيل الدخول المنبثقة (تظهر تلقائياً عند محاولة إرسال طلب بدون تسجيل دخول) */}
      <Modal 
        show={showAuthModal} 
        onHide={() => setShowAuthModal(false)} 
        centered
        style={{ direction: 'rtl' }}
      >
        <div className="p-4 bg-white rounded-4 shadow-lg">
          <div className="text-center mb-4">
            <h4 className="fw-bold mb-1 text-dark">تسجيل الدخول مطلوب</h4>
            <p className="text-muted small mb-0">يرجى إدخال بيانات حسابك للاستمرار وإتمام المعاملة المالية</p>
          </div>

          <Form onSubmit={handleModalLogin}>
            {authError && <div className="alert alert-danger p-2 small mb-3">{authError}</div>}
            
            <Form.Group className="mb-3 text-end" controlId="modalEmail">
              <Form.Label className="small fw-bold text-secondary">البريد الإلكتروني</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="أدخل البريد الإلكتروني" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required 
                className="py-2"
              />
            </Form.Group>

            <Form.Group className="mb-4 text-end" controlId="modalPassword">
              <Form.Label className="small fw-bold text-secondary">كلمة المرور</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="••••••••" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required 
                className="py-2"
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button 
                type="submit" 
                className="py-2.5 fw-bold text-white border-0 shadow-sm"
                style={{ backgroundColor: '#006650' }}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? <Spinner animation="border" size="sm" /> : 'تسجيل الدخول ومتابعة الطلب'}
              </Button>
              <Button 
                variant="outline-secondary" 
                onClick={() => setShowAuthModal(false)}
                className="py-2 border-0 text-muted"
              >
                إلغاء
              </Button>
            </div>
          </Form>
        </div>
      </Modal>

      {/* النافذة المنبثقة الثانية: Spinner جاري معالجة طلبك */}
      <Modal 
        show={showLoadingModal} 
        backdrop="static" 
        keyboard={false} 
        centered
        contentClassName="border-0 bg-transparent text-center"
      >
        <div className="p-4 mx-auto bg-white rounded-4 shadow-lg text-center d-flex flex-column align-items-center justify-content-center" style={{ maxWidth: '280px', direction: 'rtl' }}>
          <Spinner 
            animation="border" 
            role="status" 
            style={{ width: '3.5rem', height: '3.5rem', color: '#006650' }}
            className="mb-3"
          />
          <h5 className="fw-bold text-dark mb-1">جاري معالجة طلبك</h5>
          <p className="text-muted small mb-0">يرجى الانتظار، يتم الآن تسجيل العملية...</p>
        </div>
      </Modal>

      {/* النافذة المنبثقة الثالثة: رسالة النجاح والتأكيد النهائية */}
      <Modal 
        show={showSuccessModal} 
        onHide={() => setShowSuccessModal(false)} 
        centered 
        contentClassName="border-0 text-end"
        style={{ direction: 'rtl', fontFamily: 'sans-serif' }}
      >
        <div style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)', borderRadius: '16px' }}>
          <Modal.Body className="text-center p-5 bg-white rounded-4">
            <div className="mb-4">
              <EnvelopeCheckFill size={65} style={{ color: '#006650' }} />
            </div>
            <h4 className="fw-bold mb-3 text-dark">تمت العملية بنجاح</h4>
            <p className="text-secondary fs-6 lh-base mb-4 px-2">
              سوف تصلك رسالة على رقم هاتفك بها تفاصيل طلبك.
            </p>
            <Button 
              onClick={() => setShowSuccessModal(false)}
              className="w-50 py-2 border-0 fw-semibold rounded-3 shadow-sm"
              style={{ backgroundColor: '#006650', color: '#ffffff' }}
            >
              حسناً، إغلاق
            </Button>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default FinancialServicesPage;