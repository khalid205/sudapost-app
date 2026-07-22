import React, { useState } from 'react';
import { 
  CashCoin, 
  Calculator, 
  ShieldCheck, 
  FileEarmarkText, 
  ArrowRightSquare, 
  Gift, 
  SlashCircle, 
  ClockHistory, 
  BriefcaseFill, 
  Headset,
  Cpu,
  ExclamationTriangle,
  CheckCircleFill
} from 'react-bootstrap-icons';
import { Container, Modal, Button, Form, Spinner } from 'react-bootstrap';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // تأكد من صحة مسار ملف الـ firebase لديك

// تعريف أنواع البيانات لفئات الجمارك
interface CustomCategory {
  key: string;
  name: string;
  rate: number; 
}

const CustomsServices: React.FC = () => {
  const categories: CustomCategory[] = [
    { key: 'electronics', name: 'أجهزة إلكترونية وهواتف ذكية', rate: 0.20 },
    { key: 'clothes', name: 'ملابس، منسوجات وأقمشة', rate: 0.10 },
    { key: 'personal_effects', name: 'أمتعة شخصية وهدايا مرسلة', rate: 0.05 },
    { key: 'cosmetics', name: 'مستحضرات تجميل وعناية', rate: 0.25 },
    { key: 'spare_parts', name: 'قطع غيار ومعدات صغيرة', rate: 0.15 },
  ];

  // حالات حاسبة الجمارك
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [itemValue, setItemValue] = useState<number | ''>(''); 
  const [estimatedDuty, setEstimatedDuty] = useState<number | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string>('docs');

  // حالات التحكم بالنافذة المنبثقة والتحميل للبنر التفاعلي السفلي
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', phone: '', cargoType: '' });

  // حالات نظام المصادقة (Firebase Auth) للتحقق عند طلب الاستشارة
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const toggleAccordion = (section: string): void => {
    setActiveAccordion(prev => (prev === section ? '' : section));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCategory(e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    if (val === '') {
      setItemValue('');
    } else {
      const numVal = Number(val);
      if (!isNaN(numVal)) {
        setItemValue(numVal);
      }
    }
  };

  const handleCalculate = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const category = categories.find(cat => cat.key === selectedCategory);
    const value = itemValue === '' ? 0 : itemValue;

    if (category) {
      const duty = value * category.rate;
      setEstimatedDuty(duty);
    } else {
      setEstimatedDuty(null);
    }
  };

  // التحكم في فتح وإغلاق نافذة الاستشارة
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setSubmitted(false);
      setIsLoading(false);
      setFormData({ name: '', phone: '', cargoType: '' });
    }, 300);
  };

  // معالجة إرسال طلب الاستشارة الجمركية مع التحقق من الـ Auth
  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. التحقق مما إذا كان المستخدم مسجلاً الدخول في Firebase
    const currentUser = auth.currentUser;
    if (!currentUser) {
      // إغلاق نافذة الاستشارة وفتح نافذة تسجيل الدخول المنبثقة
      setShowModal(false);
      setShowAuthModal(true);
      return;
    }

    // 2. إذا كان مسجلاً، تابع إرسال الطلب مباشرة
    processConsultationSubmission();
  };

  // دالة الإرسال الفعلية للبيانات
  const processConsultationSubmission = () => {
    setIsLoading(true);

    // محاكاة إرسال البيانات للخادم لمدة ثانية ونصف
    setTimeout(() => {
      console.log("طلب استشارة جمركية تجارية جديد:", formData);
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  // دالة تسجيل الدخول عبر النافذة المنبثقة
  const handleModalLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setIsLoggingIn(false);
      setShowAuthModal(false); // إغلاق نافذة تسجيل الدخول
      setShowModal(true);     // إعادة فتح نافذة الاستشارة
      processConsultationSubmission(); // استكمال إرسال الطلب تلقائياً
    } catch (err) {
      setIsLoggingIn(false);
      setAuthError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    }
  };

  return (
    <div dir="rtl" lang="ar" style={{ fontFamily: 'system-ui, sans-serif' }}>
      
      {/* الهيدر الرئيسي */}
      <section>
        <div style={{ backgroundColor: "#006650" }} className="text-white py-5 mb-5 text-center">
          <Container className="py-3">
            <CashCoin size={45} className="text-warning mb-3" />
            <span className="badge bg-success bg-opacity-25 border border-success border-opacity-50 px-3 py-2 rounded-pill mb-3 text-uppercase fw-semibold tracking-wider d-block mx-auto" style={{ color: '#63e6be', width: 'fit-content' }}>
              سودابوست للحلول اللوجستية
            </span>
            <h1 className="fw-extrabold display-5 mb-3 fw-bold text-warning">الدليل والخدمات الجمركية المتكاملة</h1>
            <p className="text-light mx-auto fs-5 lh-lg mb-0" style={{ maxWidth: "800px", opacity: 0.95 }}>
              احسب رسومك التقديرية، وتعرف على القوانين واللوائح المنظمة للشحن إلى السودان لضمان عبور شحنتك بسرعة وأمان دون تأخير.
            </p>
          </Container>
        </div>
      </section>

      <Container>
        <div className="row g-4 match-height">
          
          {/* الكرت الأيمن: الحاسبة الذكية */}
          <div className="col-lg-6">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center mb-4">
                    <div className="p-3 bg-success bg-opacity-10 rounded-3 text-success me-0 ms-3 d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                      <Calculator size={28} />
                    </div>
                    <div>
                      <h4 className="fw-bold text-dark m-0">الحاسبة الجمركية الذكية</h4>
                      <small className="text-muted">تقدير فوري للرسوم بناءً على نوع وقيمة المواد</small>
                    </div>
                  </div>

                  <form onSubmit={handleCalculate} className="mt-2">
                    <div className="mb-4">
                      <label htmlFor="categorySelect" className="form-label fw-bold text-secondary small">تصنيف محتويات الشحنة</label>
                      <select
                        id="categorySelect"
                        className="form-select form-select-lg border-2 rounded-3 text-end fs-6 py-3"
                        style={{ borderColor: '#e9ecef', backgroundColor: '#f8f9fa' }}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        required
                      >
                        <option value="">-- اختر نوع البضاعة المشحونة --</option>
                        {categories.map(cat => (
                          <option key={cat.key} value={cat.key}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="itemValue" className="form-label fw-bold text-secondary small">القيمة الشرائية الإجمالية ($ USD)</label>
                      <div className="input-group">
                        <input
                          type="number"
                          id="itemValue"
                          className="form-control form-control-lg border-2 border-end-2 text-end py-3"
                          style={{ borderColor: '#e9ecef', backgroundColor: '#f8f9fa', borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }}
                          placeholder="0.00"
                          value={itemValue}
                          onChange={handleValueChange}
                          min="0"
                          step="0.01"
                          required
                        />
                        <span className="input-group-text bg-light border-2 text-muted px-4 fw-bold" style={{ borderColor: '#e9ecef', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>$</span>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-success btn-lg w-100 py-3 fw-bold rounded-3 shadow-sm border-0 d-flex align-items-center justify-content-center gap-2"
                            style={{ background: '#144d32' }}>
                      <Cpu size={20} />
                      تحليل وحساب الرسوم التقريبية
                    </button>
                  </form>
                </div>

                {/* النتيجة بتصميم الـ Card المودرن */}
                {estimatedDuty !== null && (
                  <div className="mt-4 p-4 rounded-4 border-0 text-center position-relative overflow-hidden" 
                       style={{ background: '#f0fdf4', border: '1px dashed #bbf7d0' }}
                  >
                    <span className="text-uppercase fw-bold text-success small tracking-wide d-block mb-1">الجمارك المقدرة</span>
                    <div className="display-5 fw-extrabold text-success mb-2">${estimatedDuty.toFixed(2)}</div>
                    <p className="text-muted small m-0 lh-base d-flex align-items-center justify-content-center gap-2">
                      <ExclamationTriangle size={18} className="text-warning" />
                      هذه القيمة استرشادية، التقييم النهائي يتم عبر سلطات الجمارك السودانية بميناء الدخول.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* الكرت الأيسر: الدليل الشامل بتصميم Accordion مطور */}
          <div className="col-lg-6">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white">
              <div className="card-body">
                <div className="d-flex align-items-center mb-4">
                  <div className="p-3 bg-dark bg-opacity-10 rounded-3 text-dark me-0 ms-3 d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h4 className="fw-bold text-dark m-0">الدليل والسياسات الرسمية</h4>
                    <small className="text-muted">المتطلبات القانونية لضمان سلامة وسرعة التخليص</small>
                  </div>
                </div>

                <div className="d-flex flex-column gap-3 mt-2">
                  
                  {/* بند المستندات */}
                  <div className="border rounded-3 overflow-hidden" style={{ borderColor: activeAccordion === 'docs' ? '#144d32' : '#e9ecef' }}>
                    <button 
                      type="button"
                      className="w-100 border-0 p-3 text-end fw-bold d-flex justify-content-between align-items-center"
                      style={{ background: activeAccordion === 'docs' ? '#f0fdf4' : '#fff', color: activeAccordion === 'docs' ? '#144d32' : '#212529' }}
                      onClick={() => toggleAccordion('docs')}
                    >
                      <span className="d-flex align-items-center gap-2">
                        <FileEarmarkText size={18} className="text-success" />
                        1. الأوراق والمستندات المطلوبة
                      </span>
                      <small style={{ transform: activeAccordion === 'docs' ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }}>▼</small>
                    </button>
                    {activeAccordion === 'docs' && (
                      <div className="p-3 bg-white text-muted border-top lh-lg fs-6">
                        <ul className="mb-0 ps-3">
                          <li>الفاتورة التجارية الأصلية والمفصلة للمحتويات والأسعار.</li>
                          <li>بوليصة شحن <strong className="text-dark">سودابوست</strong> الإلكترونية المتضمنة رقم التتبع.</li>
                          <li>إثبات هوية رسمي (رقم وطني، بطاقة قومية أو جواز سفر ساري) للمستلم بالسودان.</li>
                          <li>شهادة المنشأ (مطلوبة في بعض حالات الاستيراد التجاري).</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* بند خطوات التخليص الجمركي */}
                  <div className="border rounded-3 overflow-hidden" style={{ borderColor: activeAccordion === 'steps' ? '#144d32' : '#e9ecef' }}>
                    <button 
                      type="button"
                      className="w-100 border-0 p-3 text-end fw-bold d-flex justify-content-between align-items-center"
                      style={{ background: activeAccordion === 'steps' ? '#f0fdf4' : '#fff', color: activeAccordion === 'steps' ? '#144d32' : '#212529' }}
                      onClick={() => toggleAccordion('steps')}
                    >
                      <span className="d-flex align-items-center gap-2">
                        <ArrowRightSquare size={18} className="text-success" />
                        2. مراحل وخطوات التخليص الجمركي
                      </span>
                      <small style={{ transform: activeAccordion === 'steps' ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }}>▼</small>
                    </button>
                    {activeAccordion === 'steps' && (
                      <div className="p-3 bg-white text-muted border-top lh-lg fs-6">
                        <ol className="mb-0 ps-3">
                          <li><strong className="text-dark">تسجيل المانيفست:</strong> يتم تسجيل بيانات الشحنة فور وصولها للمنفذ.</li>
                          <li><strong className="text-dark">الفحص والتحجيم:</strong> معاينة الطرود فعلياً لمطابقتها مع المستندات.</li>
                          <li><strong className="text-dark">تقييم القيمة:</strong> تحديد القيمة الجمركية للسلع وفرض الرسوم المعتمدة.</li>
                          <li><strong className="text-dark">السداد والفسح:</strong> دفع الرسوم عبر القنوات البنكية المعتمدة ثم إصدار إذن الخروج.</li>
                        </ol>
                      </div>
                    )}
                  </div>

                  {/* بند المواد المعفاة من الجمارك */}
                  <div className="border rounded-3 overflow-hidden" style={{ borderColor: activeAccordion === 'exemptions' ? '#144d32' : '#e9ecef' }}>
                    <button 
                      type="button"
                      className="w-100 border-0 p-3 text-end fw-bold d-flex justify-content-between align-items-center"
                      style={{ background: activeAccordion === 'exemptions' ? '#f0fdf4' : '#fff', color: activeAccordion === 'exemptions' ? '#144d32' : '#212529' }}
                      onClick={() => toggleAccordion('exemptions')}
                    >
                      <span className="d-flex align-items-center gap-2">
                        <Gift size={18} className="text-success" />
                        3. السلع والأعفاءات الجمركية (إن وجدت)
                      </span>
                      <small style={{ transform: activeAccordion === 'exemptions' ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }}>▼</small>
                    </button>
                    {activeAccordion === 'exemptions' && (
                      <div className="p-3 bg-white text-muted border-top lh-lg fs-6">
                        <p className="mb-2">تخضع بعض المواد للإعفاء الجمركي الكامل أو الجزئي وفقاً لقانون الجمارك السوداني وتشمل:</p>
                        <ul className="mb-0 ps-3">
                          <li>الأمتعة الشخصية المستعملة الخاصة بالقادمين بغرض الإقامة الدائمة.</li>
                          <li>المطبوعات، الكتب، والمجلات الثقافية والتعليمية.</li>
                          <li>المعدات الطبية والأدوية المنقذة للحياة (بموجب موافقة المجلس القومي للأدوية والسموم).</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* بند المحظورات */}
                  <div className="border rounded-3 overflow-hidden" style={{ borderColor: activeAccordion === 'prohibited' ? '#dc3545' : '#e9ecef' }}>
                    <button 
                      type="button"
                      className="w-100 border-0 p-3 text-end fw-bold d-flex justify-content-between align-items-center"
                      style={{ background: activeAccordion === 'prohibited' ? '#fff5f5' : '#fff', color: activeAccordion === 'prohibited' ? '#dc3545' : '#212529' }}
                      onClick={() => toggleAccordion('prohibited')}
                    >
                      <span className="d-flex align-items-center gap-2">
                        <SlashCircle size={18} className="text-danger" />
                        4. شحنات محظورة وممنوعة قانوناً
                      </span>
                      <small style={{ transform: activeAccordion === 'prohibited' ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }}>▼</small>
                    </button>
                    {activeAccordion === 'prohibited' && (
                      <div className="p-3 bg-white text-muted border-top lh-lg fs-6">
                        <p className="text-danger fw-bold small mb-2">يحظر شحن أو استيراد المواد التالية طبقاً لقانون الجمارك العام:</p>
                        <ul className="mb-0 ps-3">
                          <li>المواد الدوائية والمكملات الطبية غير المصرحة من وزارة الصحة.</li>
                          <li>البخاخات والمواد سريعة الاشتعال والعطور بكافة أنواعها (في الشحن الجوي).</li>
                          <li>أجهزة اللاسلكي، الطائرات المسيرة "الدرون" (دون موافقة مسبقة من جهاز تنظيم الاتصالات).</li>
                          <li>المواد والأغذية الفاسدة أو منتهية الصلاحية.</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* بند المدة الزمنية */}
                  <div className="border rounded-3 overflow-hidden" style={{ borderColor: activeAccordion === 'time' ? '#144d32' : '#e9ecef' }}>
                    <button 
                      type="button"
                      className="w-100 border-0 p-3 text-end fw-bold d-flex justify-content-between align-items-center"
                      style={{ background: activeAccordion === 'time' ? '#f0fdf4' : '#fff', color: activeAccordion === 'time' ? '#144d32' : '#212529' }}
                      onClick={() => toggleAccordion('time')}
                    >
                      <span className="d-flex align-items-center gap-2">
                        <ClockHistory size={18} className="text-primary" />
                        5. النطاق الزمني المتوقع للتخليص
                      </span>
                      <small style={{ transform: activeAccordion === 'time' ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }}>▼</small>
                    </button>
                    {activeAccordion === 'time' && (
                      <div className="p-3 bg-white text-muted border-top lh-lg fs-6">
                        تستغرق الإجراءات الجمركية المعتادة في المنافذ السودانية فترة تتراوح بين <strong>3 إلى 5 أيام عمل</strong> كحد أقصى، شرط اكتمال وصحة كافة المستندات المطلوبة والمقدمة من قبل العميل.
                      </div>
                    )}
                  </div>

                </div> 
              </div>
            </div>
          </div>
        </div>

        {/* بنر تواصل سفلي ممتد وتفاعلي بالكامل */}
        <div className="mt-5 p-4 rounded-4 border-0 shadow-sm d-flex justify-content-between align-items-center flex-wrap gap-4 custom-banner" 
             style={{ background: 'linear-gradient(90deg, #fffdf5 0%, #fffbf0 100%)', border: '1px solid #fef3c7', transition: 'all 0.3s ease' }}>
          <div className="d-flex align-items-center gap-3">
            <div className="p-3 bg-warning bg-opacity-25 rounded-circle text-warning d-none d-sm-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
              <BriefcaseFill size={22} className="text-dark" />
            </div>
            <div>
              <h5 className="fw-bold text-dark mb-1">هل تشحن كميات تجارية أو بضائع خاصة؟</h5>
              <p className="text-muted m-0 small">نوفر لك مستشاري تخليص جمركي مخصصين لمراجعة ملفاتك وتجنب أي تأخيرات في الميناء.</p>
            </div>
          </div>
          
          <button 
            type="button" 
            onClick={handleOpenModal}
            className="btn btn-dark btn-lg px-4 py-2 fw-bold border-0 rounded-3 fs-6 d-flex align-items-center gap-2 hover-consult-btn" 
            style={{ background: '#212529', transition: 'all 0.2s ease' }}
          >
            <Headset size={18} />
            استشارة جمركية خاصة
          </button>
        </div>
      </Container>

      {/* النافذة المنبثقة للاستشارة الجمركية */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        centered 
        backdrop="static"
        keyboard={!isLoading}
        className="custom-premium-modal"
        style={{ direction: 'rtl', textAlign: 'right' }}
      >
        <Modal.Body className="p-0 overflow-hidden rounded-4 border-0 shadow-lg">
          
          <div className="p-4 text-white position-relative" style={{ background: 'linear-gradient(135deg, #006650 0%, #144d32 100%)' }}>
            <button 
              type="button" 
              className="btn-close btn-close-white position-absolute top-0 start-0 m-3" 
              onClick={handleCloseModal}
              disabled={isLoading}
              style={{ fontSize: '0.85rem' }}
            />
            <div className="d-flex align-items-center gap-3 mt-2">
              <div className="bg-white bg-opacity-20 p-2.5 rounded-3 text-warning d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                <Headset size={24} className="text-warning" />
              </div>
              <div>
                <h4 className="fw-bold m-0 fs-5 text-warning">طلب استشارة جمركية متقدمة</h4>
                <p className="m-0 text-light small opacity-75 mt-0.5">للشحنات التجارية، اللوجستية والحاويات الخاصة</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white">
            {!submitted ? (
              <Form onSubmit={handleConsultationSubmit}>
                <p className="text-muted small mb-4 lh-base">
                  برجاء تزويدنا ببيانات التواصل الأساسية ليتولى أحد مستشارينا دراسة ملفك الجمركي والتواصل معك هاتفياً في أسرع وقت.
                </p>
                
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary mb-1.5">الاسم الكامل / اسم المنشأة أو الشركة</Form.Label>
                  <Form.Control 
                    type="text" 
                    required 
                    disabled={isLoading}
                    className="py-2.5 border-2 rounded-3 text-end px-3 bg-light bg-opacity-50"
                    placeholder="مثال: شركة النقل والحلول المتقدمة"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary mb-1.5">رقم الجوال النشط (مع رمز الدولة)</Form.Label>
                  <Form.Control 
                    type="tel" 
                    required 
                    disabled={isLoading}
                    className="py-2.5 border-2 rounded-3 text-end px-3 bg-light bg-opacity-50"
                    placeholder="05xxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="small fw-bold text-secondary mb-1.5">طبيعة ونوع البضائع المستهدفة</Form.Label>
                  <Form.Control 
                    type="text" 
                    disabled={isLoading}
                    className="py-2.5 border-2 rounded-3 text-end px-3 bg-light bg-opacity-50"
                    placeholder="مثال: معدات ثقيلة، مواد عازلة، أجهزة طبية"
                    value={formData.cargoType}
                    onChange={(e) => setFormData({...formData, cargoType: e.target.value})}
                  />
                </Form.Group>

                <div className="d-flex gap-2 justify-content-start border-top pt-3">
                  <Button 
                    type="submit" 
                    variant="success" 
                    className="fw-bold rounded-3 px-4 py-2.5 d-flex align-items-center justify-content-center gap-2" 
                    style={{ backgroundColor: '#006650', border: 'none', minWidth: '140px' }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                        <span>جاري الإرسال..</span>
                      </>
                    ) : (
                      <span>تأكيد الإرسال</span>
                    )}
                  </Button>
                  <Button 
                    variant="light" 
                    onClick={handleCloseModal} 
                    className="fw-bold rounded-3 px-3 py-2.5 border-0 text-muted"
                    disabled={isLoading}
                  >
                    إلغاء
                  </Button>
                </div>
              </Form>
            ) : (
              <div className="text-center py-4 px-2">
                <div className="success-icon-wrapper mb-3 mx-auto d-flex align-items-center justify-content-center rounded-circle" 
                     style={{ width: '80px', height: '80px', backgroundColor: '#f0fdf4', color: '#15803d' }}>
                  <CheckCircleFill size={46} className="scale-up-animation" />
                </div>
                <h5 className="fw-bold text-dark mb-2 fs-5">تلقينا طلبك باهتمام!</h5>
                <p className="text-muted small px-3 lh-lg m-0">
                  لقد تم توجيه ملف الاستشارة بنجاح إلى قسم التخليص والجمارك بسودابوست، ترقب اتصالاً هاتفياً قريباً جداً لتزويدك بالحلول المخصصة.
                </p>
                <Button variant="dark" onClick={handleCloseModal} className="mt-4 px-4 py-2 fw-bold rounded-3 border-0" style={{ backgroundColor: '#212529' }}>
                  إغلاق النافذة
                </Button>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>

      {/* نافذة تسجيل الدخول المنبثقة (تظهر تلقائياً إذا حاول المستخدم إرسال استشارة وهو غير مسجل دخول) */}
      <Modal 
        show={showAuthModal} 
        onHide={() => setShowAuthModal(false)} 
        centered
        style={{ direction: 'rtl' }}
      >
        <div className="p-4 bg-white rounded-4 shadow-lg text-end">
          <div className="text-center mb-4">
            <h4 className="fw-bold mb-1 text-dark">تسجيل الدخول مطلوب</h4>
            <p className="text-muted small mb-0">يرجى تسجيل الدخول لحسابك لمتابعة إرسال طلب الاستشارة الجمركية</p>
          </div>

          <Form onSubmit={handleModalLogin}>
            {authError && <div className="alert alert-danger p-2 small mb-3 text-center">{authError}</div>}
            
            <Form.Group className="mb-3" controlId="customModalEmail">
              <Form.Label className="small fw-bold text-secondary">البريد الإلكتروني</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="أدخل بريدك الإلكتروني" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required 
                className="py-2 text-end"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="customModalPassword">
              <Form.Label className="small fw-bold text-secondary">كلمة المرور</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="••••••••" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required 
                className="py-2 text-end"
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

      {/* حركات وتأثيرات الـ CSS الإضافية */}
      <style>{`
        .hover-consult-btn:hover {
          background: #343a40 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .custom-banner:hover {
          border-color: #fcd34d !important;
        }
        .custom-premium-modal .modal-content {
          border: none !important;
          border-radius: 1rem !important;
          overflow: hidden;
        }
        .custom-premium-modal .form-control:focus {
          border-color: #006650 !important;
          box-shadow: 0 0 0 0.25rem rgba(0, 102, 80, 0.15) !important;
          background-color: #fff !important;
        }
        @keyframes scaleIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .scale-up-animation {
          animation: scaleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

    </div>
  );
};

export default CustomsServices;