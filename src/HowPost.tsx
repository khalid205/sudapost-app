import React, { useState, useRef } from 'react';
import { Button, Col, Form, Row, Container, Card, Modal, Spinner } from 'react-bootstrap';
import { CheckCircleFill, ShieldCheck, BoxSeam, PersonUp, PersonDown } from 'react-bootstrap-icons';
import { auth } from './firebase'; // أزلنا getAuth من هنا لعدم الحاجة إليها
import { signInWithEmailAndPassword } from 'firebase/auth';


// تعريف واجهة البيانات للمدخلات لضمان سلامة كود TypeScript
interface ShippingFormDate {
  senderName: string;
  senderPhone: string;
  senderCity: string;
  receiverName: string;
  receiverPhone: string;
  receiverCity: string;
  packageType: string;
  packageWeight: string;
  description: string;
  agreeTerms: boolean;
}

const ShippingForm: React.FC = () => {
  // القيمة الابتدائية لتفريغ الفورم لاحقاً
  const initialFormState: ShippingFormDate = {
    senderName: '',
    senderPhone: '',
    senderCity: '',
    receiverName: '',
    receiverPhone: '',
    receiverCity: '',
    packageType: 'طرود بريدية',
    packageWeight: '',
    description: '',
    agreeTerms: false,
  };

  const [formData, setFormData] = useState<ShippingFormDate>(initialFormState);
  const [validated, setValidated] = useState<boolean>(false);
  const [showLoadingModal, setShowLoadingModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  
  // حالات خاصة بنظام المصادقة (التحقق عند الإرسال فقط)
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  
  // مرجع للفورم للتحكم بإعادة التعيين بصرياً
  const formRef = useRef<HTMLFormElement>(null);
 

  // تحديث البيانات ديناميكياً عند الكتابة في نموذج الشحن
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // معالجة حدث الإرسال والتحقق من تسجيل الدخول أولاً
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();

    // 1. التحقق من صحة المدخلات أولاً
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(false);

    // 2. التحقق مما إذا كان المستخدم مسجلاً الدخول في Firebase
    const currentUser = auth.currentUser;
    if (!currentUser) {
      // إذا لم يكن مسجلاً، نوقف العملية ونظهر نافذة تسجيل الدخول المنبثقة
      setShowAuthModal(true);
      return;
    }

    // 3. إذا كان مسجلاً، نكمل عملية إرسال الشحنة طبيعياً
    processShippingSubmission();
  };

  // دالة إتمام الشحنة بعد التأكد من تسجيل الدخول
  const processShippingSubmission = () => {
    setShowLoadingModal(true); // إظهار نافذة جاري المعالجة والـ Spinner أولاً

    // محاكاة معالجة البيانات والطلب لوجستياً
    setTimeout(() => {
      setShowLoadingModal(false); // إغلاق نافذة المعالجة والـ Spinner
      setFormData(initialFormState); 
      formRef.current?.reset(); 
      setShowSuccessModal(true); // إظهار نافذة النجاح بعد اكتمال المعالجة
    }, 4000); 
  };

  // دالة تسجيل الدخول عبر النافذة المنبثقة
  const handleModalLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      // إذا تم تسجيل الدخول بنجاح:
      setIsLoggingIn(false);
      setShowAuthModal(false); // إغلاق نافذة تسجيل الدخول
      processShippingSubmission(); // متابعة إرسال الشحنة تلقائياً
    } catch (err) {
      setIsLoggingIn(false);
      setAuthError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    }
  };

  return (
    <>
      {/* السكشن الأول */}
      <section>
        <div style={{ backgroundColor: "#006650" }} className="text-white py-5 mb-5 text-center">
          <Container className="py-2">
            <h1 className="fw-bold display-6 mb-3 text-warning">
              البوابة الرقمية لتقديم طلبات الشحن
            </h1>
            <p className="text-light mx-auto fs-5 lh-lg mb-0" style={{ maxWidth: "800px", opacity: 0.95 }}>
              مرحباً بك في نظام الشحن الإلكتروني لبريد السودان <strong className="text-warning">(سودابوست)</strong>. يرجى تزويدنا ببيانات الشحنة وعناوين الاستلام والتسليم بدقة عبر النموذج أدناه، ليقوم فريقنا اللوجستي بمراجعة طلبك وتنسيق عملية استلام الطرد وتوصيله فوراً.
            </p>
          </Container>
        </div>
      </section>

      <Container className="py-5" style={{ direction: 'rtl', fontFamily: 'sans-serif' }}>
        <Row className="justify-content-center">
          <Col lg={9}>
            <Card 
              className="border-1 rounded-4 overflow-hidden"
              style={{ 
                borderColor: 'rgba(0,0,0,0.07)',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.025)' 
              }}
            >
              <div style={{ backgroundColor: '#006650' }} className="text-white p-4 text-center position-relative">
                <BoxSeam size={35} className="mb-2 text-warning" />
                <h3 className="fw-bold mb-1 text-warning">طلب إرسال شحنة جديدة</h3>
                <p className="mb-0 text-light small">يرجى ملء تفاصيل الشحن بدقة لضمان سرعة التوصيل</p>
              </div>
              
              <Card.Body className="p-4 bg-white text-end">
                <Form noValidate validated={validated} onSubmit={handleSubmit} ref={formRef}>
                  
                  {/* ١. حاوية بيانات المرسل مع خلفية خضراء ناعمة جداً */}
                  <div className="p-4 rounded-4 mb-4" style={{ backgroundColor: 'rgba(0, 102, 80, 0.03)', border: '1px solid rgba(0, 102, 80, 0.06)' }}>
                    <h5 className="fw-bold mb-4 d-flex align-items-center gap-2 text-dark">
                      <span className="p-2 rounded-3 d-inline-flex" style={{ backgroundColor: 'rgba(0, 102, 80, 0.1)' }}>
                        <PersonUp size={22} style={{ color: '#006650' }} />
                      </span>
                      <span>١. بيانات المرسل (صاحب الشحنة)</span>
                    </h5>
                    <Row>
                      <Form.Group as={Col} md="4" className="mb-3 mb-md-0" controlId="senderNameVal">
                        <Form.Label className="fw-semibold text-secondary small">اسم المرسل بالكامل</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="senderName"
                          placeholder="مثال: محمد أحمد علي"
                          value={formData.senderName}
                          onChange={handleChange}
                          className="py-2 text-end border-light-subtle bg-white"
                        />
                        <Form.Control.Feedback type="invalid">يرجى كتابة اسم المرسل.</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} md="4" className="mb-3 mb-md-0" controlId="senderPhoneVal">
                        <Form.Label className="fw-semibold text-secondary small">رقم الهاتف</Form.Label>
                        <Form.Control
                          required
                          type="tel"
                          name="senderPhone"
                          placeholder="09XXXXXXXX"
                          value={formData.senderPhone}
                          onChange={handleChange}
                          className="py-2 text-end border-light-subtle bg-white"
                        />
                        <Form.Control.Feedback type="invalid">يرجى إدخال رقم هاتف صحيح للتواصل.</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} md="4" controlId="senderCityVal">
                        <Form.Label className="fw-semibold text-secondary small">مدينة المرسل / الولاية</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="senderCity"
                          placeholder="مثال: الخرطوم، بورتسودان..."
                          value={formData.senderCity}
                          onChange={handleChange}
                          className="py-2 text-end border-light-subtle bg-white"
                        />
                        <Form.Control.Feedback type="invalid">يرجى تحديد مدينة الإرسال.</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                  </div>

                  {/* ٢. حاوية بيانات المستلم مع خلفية زرقاء ناعمة جداً */}
                  <div className="p-4 rounded-4 mb-4" style={{ backgroundColor: 'rgba(13, 110, 253, 0.02)', border: '1px solid rgba(13, 110, 253, 0.06)' }}>
                    <h5 className="fw-bold mb-4 d-flex align-items-center gap-2 text-dark">
                      <span className="p-2 rounded-3 d-inline-flex" style={{ backgroundColor: 'rgba(13, 110, 253, 0.08)' }}>
                        <PersonDown size={22} className="text-primary" />
                      </span>
                      <span>٢. بيانات المستلم (الجهة الموجه إليها الشحنة)</span>
                    </h5>
                    <Row>
                      <Form.Group as={Col} md="4" className="mb-3 mb-md-0" controlId="receiverNameVal">
                        <Form.Label className="fw-semibold text-secondary small">اسم المستلم بالكامل</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="receiverName"
                          placeholder="اسم الشخص المستلم"
                          value={formData.receiverName}
                          onChange={handleChange}
                          className="py-2 text-end border-light-subtle bg-white"
                        />
                        <Form.Control.Feedback type="invalid">يرجى كتابة اسم المستلم.</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} md="4" className="mb-3 mb-md-0" controlId="receiverPhoneVal">
                        <Form.Label className="fw-semibold text-secondary small">رقم هاتف المستلم</Form.Label>
                        <Form.Control
                          required
                          type="tel"
                          name="receiverPhone"
                          placeholder="01XXXXXXXX"
                          value={formData.receiverPhone}
                          onChange={handleChange}
                          className="py-2 text-end border-light-subtle bg-white"
                        />
                        <Form.Control.Feedback type="invalid">يرجى كتابة هاتف المستلم لربطه بالتوصيل.</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} md="4" controlId="receiverCityVal">
                        <Form.Label className="fw-semibold text-secondary small">مدينة المستلم والوجهة النهائية</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="receiverCity"
                          placeholder="المدينة أو مكتب البريد الفرعي"
                          value={formData.receiverCity}
                          onChange={handleChange}
                          className="py-2 text-end border-light-subtle bg-white"
                        />
                        <Form.Control.Feedback type="invalid">يرجى تحديد وجهة التسليم.</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                  </div>

                  {/* ٣. حاوية تفاصيل ومواصفات الطرد مع خلفية برتقالية ناعمة جداً */}
                  <div className="p-4 rounded-4 mb-4" style={{ backgroundColor: 'rgba(253, 126, 20, 0.02)', border: '1px solid rgba(253, 126, 20, 0.06)' }}>
                    <h5 className="fw-bold mb-4 d-flex align-items-center gap-2 text-dark">
                      <span className="p-2 rounded-3 d-inline-flex" style={{ backgroundColor: 'rgba(253, 126, 20, 0.08)' }}>
                        <BoxSeam size={20} style={{ color: '#fd7e14' }} />
                      </span>
                      <span>٣. تفاصيل ومواصفات الطرد</span>
                    </h5>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" className="mb-3 mb-md-0" controlId="packageTypeVal">
                        <Form.Label className="fw-semibold text-secondary small">نوع الخدمة البريدية</Form.Label>
                        <Form.Select 
                          name="packageType"
                          value={formData.packageType}
                          onChange={handleChange}
                          className="py-2 text-end border-light-subtle bg-white"
                        >
                          <option value="طرود بريدية">خدمة الطرود البريدية القياسية</option>
                          <option value="بريد سريع">خدمة البريد السريع المستعجل</option>
                          <option value="بريد عادي">خدمة البريد العادي الاقتصادي</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group as={Col} md="6" controlId="packageWeightVal">
                        <Form.Label className="fw-semibold text-secondary small">الوزن التقريبي (بالكيلوجرام)</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          name="packageWeight"
                          placeholder="مثال: 5"
                          min="0.1"
                          step="0.1"
                          value={formData.packageWeight}
                          onChange={handleChange}
                          className="py-2 text-end border-light-subtle bg-white"
                        />
                        <Form.Control.Feedback type="invalid">يرجى كتابة وزن تقديري مقبول للشحنة.</Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Form.Group controlId="descriptionVal">
                      <Form.Label className="fw-semibold text-secondary small">وصف محتويات الطرد (اختياري)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        placeholder="اكتب هنا إذا كانت المحتويات قابلة للكسر، مستندات هامة، أو ملابس وأغراض أسرية..."
                        value={formData.description}
                        onChange={handleChange}
                        className="py-2 text-end border-light-subtle bg-white"
                      />
                    </Form.Group>
                  </div>

                  {/* شروط وأحكام الاتفاقية */}
                  <Form.Group className="mb-4" controlId="agreeTermsVal">
                    <Form.Check
                      required
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      label="أقر بأن كافة البيانات المذكورة أعلاه صحيحة وعلى مسؤوليتي الشخصية، وأوافق على شروط التأمين والشحن الخاصة بالشركة."
                      feedback="يجب الموافقة على الشروط واللوائح الأمنية قبل تقديم الطلب."
                      feedbackType="invalid"
                      className="small text-muted"
                    />
                  </Form.Group>

                  {/* زر الإرسال */}
                  <div className="d-grid pt-2">
                    <Button 
                      type="submit" 
                      className="py-3 border-0 fw-bold fs-5 shadow-sm d-flex align-items-center justify-content-center gap-2"
                      style={{ backgroundColor: '#006650', color: '#ffffff' }}
                    >
                      تقديم طلب الشحن واعتماد البيانات
                    </Button>
                  </div>

                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* نافذة تسجيل الدخول المنبثقة (تظهر عند محاولة الإرسال بدون تسجيل دخول) */}
        <Modal 
          show={showAuthModal} 
          onHide={() => setShowAuthModal(false)} 
          centered
          style={{ direction: 'rtl' }}
        >
          <div className="p-4 bg-white rounded-4 shadow-lg">
            <div className="text-center mb-4">
              <h4 className="fw-bold mb-1 text-dark">تسجيل الدخول مطلوب</h4>
              <p className="text-muted small mb-0">يرجى إدخال بيانات حسابك للاستمرار وإرسال الشحنة</p>
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

        {/* نافذة الانتظار والـ Spinner المنبثقة (جاري معالجة طلبك) */}
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
            <p className="text-muted small mb-0">يرجى الانتظار، يتم تسجيل البيانات بالشبكة...</p>
          </div>
        </Modal>

        {/* نافذة التأكيد والنجاح المنبثقة */}
        <Modal 
          show={showSuccessModal} 
          onHide={() => setShowSuccessModal(false)} 
          centered 
          contentClassName="border-1 text-end"
          style={{ direction: 'rtl' }}
        >
          <div style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)', borderRadius: '16px' }}>
            <Modal.Body className="text-center p-5 bg-white rounded-4">
              <div className="mb-4">
                <CheckCircleFill size={70} style={{ color: '#006650' }} />
              </div>
              <h4 className="fw-bold mb-3 text-dark">تم الإرسال بنجاح</h4>
              <p className="text-secondary fs-5 lh-base mb-4">
                سوف ينظر في طلبك والتواصل معك لتنسيق استلام الشحنة.
              </p>
              <div className="d-flex justify-content-center align-items-center gap-2 text-muted small mb-4 bg-light p-2 rounded-3">
                <ShieldCheck size={18} style={{ color: '#006650' }} />
                <span>طلبك خاضع لمعايير الحماية والأمان للشبكة اللوجستية</span>
              </div>
              <Button 
                onClick={() => setShowSuccessModal(false)}
                className="w-50 py-2 border-0 fw-semibold text-white"
                style={{ backgroundColor: '#006650' }}
              >
                حسناً، إغلاق
              </Button>
            </Modal.Body>
          </div>
        </Modal>
      </Container>
    </>
  );
};

export default ShippingForm;