import { Col, Container, Row, Card } from "react-bootstrap";
// استيراد الأيقونات لإضافة لمسة بصرية احترافية للخدمات والأهداف
import { Truck, Airplane, Award, Cpu, People, Globe } from "react-bootstrap-icons";
import sudapost1 from './sudapost1.jpg';
import sudapost2 from './sudapost2.jpg';

const Services = () => {
  return (
    // تم إضافة overflow-hidden لمنع ظهور أي مسطرة أفقية نهائياً بسبب التفاف العناصر المستديرة أو المائلة
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "sans-serif", overflowX: "hidden" }}>
      
      {/* 2. قسم البانر الترحيبي المصغر (Hero Header) */}
      <div style={{ backgroundColor: "#006650" }} className="text-white py-5 mb-5 text-center">
        <Container className="py-3">
          <h1 className="fw-bold display-6 mb-3 text-warning">
            مشروع الخدمات اللوجستية والاستراتيجية لبريد السودان
          </h1>
          <p className="text-light mx-auto fs-5 lh-lg" style={{ maxWidth: "850px", opacity: 0.9 }}>
            يعد هذا المشروع أحد أهم المشاريع الاستراتيجية في اتجاه سياسة التوسع التي يتبعها بريد السودان 
            <strong className="text-warning"> (سودابوست)</strong> لتوفير واكتمال احتياجات السوق. نحن نضمن لكم توفير كافة المتطلبات المتعلقة بالترحيل، التخزين، الشحن، المناولة، والتخليص عبر نظام إداري متكامل يسمح بالمتابعة والرقابة لكافة أنواع البضائع وبمختلف الأحجام من وإلى كافة أنحاء السودان براً وبحراً وجواً.
          </p>
        </Container>
      </div>

      <Container className="pb-5">
        
        {/* القسم الأول: كتل النقل والخدمات اللوجستية */}
        {/* تم إضافة gx-0 ومقاسات متجاوبة لمنع تمدد الهوامش السالبة على الشاشات الصغيرة */}
        <Row className="align-items-center g-4 g-lg-5 mb-5 mx-0">
          <Col lg={6} className="order-2 order-lg-1 px-0 px-lg-3">
            <div className="pe-lg-3">
              <div className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-3 fw-semibold">رؤية توسعية</div>
              <h2 className="fw-bold text-dark mb-4">التوسع والريادة اللوجستية</h2>
              <p className="text-secondary lh-lg fs-5 mb-4">
                يعد مشروع الخدمات اللوجستية أحد المشاريع الاستراتيجية في اتجاه سياسة التوسع التي يتبعها بريد السودان، وهو تلبية ذكية لمتطلبات السوق المتجددة لتغطية الطرود الأحجام الكبيرة.
              </p>
              
              {/* شبكة مصغرة لخدمات الشحن بدلاً من النص السردي */}
              <Row className="g-3 mx-0">
                <Col sm={6} className="px-0 px-sm-2">
                  <Card className="border-0 shadow-sm p-3 bg-white rounded-3">
                    <div className="mb-2" style={{ color: "#006650" }}><Truck size={28} /></div>
                    <h6 className="fw-bold text-dark">النقل البري المتكامل</h6>
                    <p className="text-muted small mb-0">رحلات منظمة تربط كافة مدن وولايات السودان.</p>
                  </Card>
                </Col>
                <Col sm={6} className="px-0 px-sm-2 mt-3 mt-sm-0">
                  <Card className="border-0 shadow-sm p-3 bg-white rounded-3">
                    <div className="mb-2" style={{ color: "#006650" }}><Airplane size={28} /></div>
                    <h6 className="fw-bold text-dark">الشحن الجوي والبحري</h6>
                    <p className="text-muted small mb-0">حلول تصل إلى استئجار طائرات وسفن خاصة للبضائع الضخمة.</p>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
          
          {/* تم معالجة حاوية الصورة لتجنب خروج الديف المائل الأصفر خارج حدود الشاشة */}
          <Col lg={6} className="order-1 order-lg-2 p-3 p-lg-0 overflow-hidden">
            <div className="position-relative p-2">
              <div className="position-absolute top-0 start-0 bg-success rounded-3 w-100 h-100" style={{ transform: "rotate(-1.5deg)", zIndex: 1, opacity: 0.85 }}></div>
              <img 
                src={sudapost2} 
                alt="الخدمات اللوجستية" 
                className="img-fluid rounded-3 shadow object-fit-cover w-100 border border-white border-4 position-relative" 
                style={{ height: '380px', zIndex: 2 }} 
              />
            </div>
          </Col>
        </Row>

        {/* فاصل بصري أنيق */}
        <hr className="my-5 opacity-25" />

        {/* القسم الثاني: الأهداف الاستراتيجية برسم بياني على هيئة بطاقات (Grid) */}
        <div className="text-center mb-5 pt-3">
          <div className="badge bg-warning-subtle text-warning-emphasis px-3 py-2 rounded-pill mb-2 fw-semibold">استراتيجية 2026</div>
          <h2 className="fw-bold text-dark">أهدافنا وتطوير البيئة البريدية</h2>
          <p className="text-muted small">نحدث الفارق من أجل تنمية بريدية مستدامة بأكفأ النظم وأقل التكاليف</p>
        </div>

        <Row className="g-4 mb-5 mx-0">
          {/* بطاقة الهدف 1 */}
          <Col md={6} lg={3} className="px-0 px-sm-2">
            <Card className="h-100 border-0 shadow-sm text-center p-3 bg-white">
              <Card.Body>
                <div className="p-3 bg-light rounded-circle d-inline-block mb-3" style={{ color: "#006650" }}><Award size={32} /></div>
                <h5 className="fw-bold fs-6 text-dark mb-2">جودة وتشغيل أكفأ</h5>
                <p className="text-muted small mb-0">رفع الكفاءات التشغيلية عبر تفعيل وتطوير الشبكات الداخلية والخارجية.</p>
              </Card.Body>
            </Card>
          </Col>

          {/* بطاقة الهدف 2 */}
          <Col md={6} lg={3} className="px-0 px-sm-2">
            <Card className="h-100 border-0 shadow-sm text-center p-3 bg-white">
              <Card.Body>
                <div className="p-3 bg-light rounded-circle d-inline-block mb-3" style={{ color: "#006650" }}><Cpu size={32} /></div>
                <h5 className="fw-bold fs-6 text-dark mb-2">التحول الرقمي والتقني</h5>
                <p className="text-muted small mb-0">اعتماد تكنولوجيا الاتصال والإعلام ركيزة أساسية للتنويع الإنتاجي.</p>
              </Card.Body>
            </Card>
          </Col>

          {/* بطاقة الهدف 3 */}
          <Col md={6} lg={3} className="px-0 px-sm-2">
            <Card className="h-100 border-0 shadow-sm text-center p-3 bg-white">
              <Card.Body>
                <div className="p-3 bg-light rounded-circle d-inline-block mb-3" style={{ color: "#006650" }}><People size={32} /></div>
                <h5 className="fw-bold fs-6 text-dark mb-2">استثمار إنسان البريد</h5>
                <p className="text-muted small mb-0">بناء طاقات ومقدرات الكوادر البشرية بخطط طموحة للتدريب الكيفي.</p>
              </Card.Body>
            </Card>
          </Col>

          {/* بطاقة الهدف 4 */}
          <Col md={6} lg={3} className="px-0 px-sm-2">
            <Card className="h-100 border-0 shadow-sm text-center p-3 bg-white">
              <Card.Body>
                <div className="p-3 bg-light rounded-circle d-inline-block mb-3" style={{ color: "#006650" }}><Globe size={32} /></div>
                <h5 className="fw-bold fs-6 text-dark mb-2">التجارة الإلكترونية</h5>
                <p className="text-muted small mb-0">بوابة استراتيجية لبسط خدمات الحكومة الإلكترونية وتيسير الثقافة الرقمية.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* عرض الصورة الثانية بشكل عريض كخاتمة للقسم وعنصر ثقة للمؤسسة */}
        <Row className="mt-4 mx-0">
          <Col lg={12} className="px-0">
            <div className="position-relative rounded-3 overflow-hidden shadow-sm" style={{ height: "320px" }}>
              <img 
                src={sudapost1} 
                alt="بيئة العمل في بريد السودان" 
                className="w-100 h-100 object-fit-cover"
              />
              <div 
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-4 p-md-5" 
                style={{ background: "radial-gradient(circle, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.6) 100%)" }}
              >
                <div className="text-white text-center" style={{ maxWidth: "700px" }}>
                  <h4 className="fw-bold text-warning mb-3 fs-3">رؤيتنا الاستثمارية</h4>
                  <p className="lh-lg text-light fs-6">
                    نقدم المؤسسة البريدية بالصيغة الصناعية والاستثمارية ذات الأبعاد التجارية والربحية التي تخدم مجهودات الدولة وتساهم في رفع جودة تواصل المواطن السوداني محلياً وعالمياً وفقاً للمنظومات المشتركة.
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>

      </Container>
    </div>
  );
};

export default Services;