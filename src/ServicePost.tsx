import { Col, Container, Row, Card, Button } from "react-bootstrap";
import Suda3 from './Suda3.jpg';
import Suda4 from './Suda4.jpg';
import Suda5 from './Suda5.jpg';
import Suda6 from './Suda6.jpg';
import { Globe2, ShieldCheck, GeoAlt, ArrowLeft } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';


const ServicPost = () => {
    // 1. مصفوفة البيانات الديناميكية التي تجمع كافة الخدمات
    const servicesData = [
        {
            title: "خدمة الطرود البريدية",
            badge: "ـ شحن ذكي بلا حدود",
            description: "(الوصية) أياً كان رغبتك في إرسال المحتويات المتنوعة والمختلفة فإن الطرود البريدية عبر بريد السودان (سودابوست) تلبي متطلباتك ، الطرود وسيلة فعالة في إيصال وتبادل المواد والأغراض والإحتياجات الأسرية داخل السودان وخارجه .",
            image: Suda3,
            alt: "خدمات سودابوست المتطورة - الطرود البريدية"
        },
        {
            title: "خدمة البريد السريع",
            badge: "ـ شحن ذكي بلا حدود",
            description: "يعد عنوان خدمة البريد السريع مرادفًا لقمة السرعة والموثوقية في عالم الشحن والخدمات اللوجستية الحديثة، حيث تضمن هذه الخدمة تسليم المستندات والطرود العاجلة والحيوية في أقصر إطار زمني ممكن.",
            image: Suda4,
            alt: "خدمات سودابوست المتطورة - البريد السريع"
        },
        {
            title: "خدمة البريد العادي",
            badge: "ـ شحن ذكي بلا حدود",
            description: "يُمثل عنوان خدمة البريد العادي الركيزة الأساسية والتقليدية لشحن الرسائل والطرود التي لا ترتبط بعامل الوقت الحرج، حيث تُعد الخيار الأول والأكثر ذكاءً للأفراد والشركات عند الرغبة في إرسال الشحنات غير العاجلة بتكلفة مالية منخفضة واقتصادية للغاية.",
            image: Suda5,
            alt: "خدمات سودابوست المتطورة - البريد العادي"
        },
        {
            title: "خدمة الصناديق البريدية الخصوصية",
            badge: "ـ شحن ذكي بلا حدود",
            description: "تُشكل خدمة الصناديق البريدية الخصوصية (P.O. Box) الحل الأمثل والأكثر أماناً للأفراد والشركات الراغبين في حماية خصوصية مراسلاتهم وضمان استلامها بمنتهى السرية والاحترافية",
            image: Suda6,
            alt: "خدمات سودابوست المتطورة - الصناديق الخصوصية"
        }
    ];

    return (
        <div>
            {/* قسم البانر الترحيبي المصغر (Hero Header) */}
            <section>
                <div style={{ backgroundColor: "#006650" }} className="text-white py-5 mb-5 text-center">
                    <Container className="py-3">
                        <h1 className="fw-bold display-6 mb-3 text-warning">
                            مشروع خدمات الطرود البريدية لبريد السودان
                        </h1>
                        <p className="text-light mx-auto fs-5 lh-lg" style={{ maxWidth: "850px", opacity: 0.9 }}>
                            يُشكل مشروع خدمات الطرود البريدية لبريد السودان <strong className="text-warning"> (سودابوست)</strong> قفزة نوعية في تلبية تطلعات الأفراد وقطاعات الأعمال بتقديم حلول بريدية ذكية ومتكاملة وشديدة الموثوقية. يرتكز المشروع على شبكة لوجستية ممتدة تربط كافة ولايات ومدن السودان محلياً، وتفتح نافذة متطورة للربط العالمي مع مختلف دول العالم وفقاً لأعلى المعايير الدولية. نحن نمزج بين عراقة الخدمة والتحول الرقمي الحديث؛ حيث نتيح لعملائنا تجربة شحن مرنة تشمل تتبع الطرود اللحظي، وتأمين سلامة الشحنات بمختلف أحجامها، وضمان سرعة التسليم، ليكون بريد السودان الشريك الاستثماري والخدمي الأول لتعزيز حركة التجارة الإلكترونية وبناء جسور التواصل بكفاءة واقتدار وبأقل التكاليف التشغيلية.
                        </p>
                    </Container>
                </div>
            </section>

            {/* توليد السكاشن برمجياً وديناميكياً بناءً على المصفوفة */}
            {servicesData.map((service, index) => {
                // الحسابات الذكية لمعرفة السطر زوجي أم فردي لقلب التصميم بصرياً
                const isEven = index % 2 === 0;

                return (
                    <section key={index} className="py-5 bg-white" style={{ fontFamily: "sans-serif", overflowX: "hidden" }}>
                        <Container className="py-4">
                            <Row className="align-items-center g-5 mx-0">

                                {/* عمود النص: يتغير ترتيبه بناءً على الفردي والزوجي */}
                                <Col 
                                    lg={6} 
                                    className={`px-0 px-lg-4 order-2 ${isEven ? "order-lg-1" : "order-lg-2"}`}
                                >
                                    <div className={`text-end ${isEven ? "pe-lg-3" : "ps-lg-3"}`}>
                                        <div 
                                            className="p-4 p-md-5 rounded-4 shadow-sm text-end" 
                                            style={{ 
                                                backgroundColor: "rgba(0, 102, 80, 0.03)", 
                                                borderRight: "5px solid #006650", 
                                                border: "1px solid rgba(0, 102, 80, 0.08)" 
                                            }}
                                        >
                                            <h6 className="text-uppercase fw-bold mb-2 tracking-wide" style={{ color: "#006650" }}>
                                                {service.badge}
                                            </h6>
                                            <h2 className="fw-black text-dark display-6 mb-4 lh-base">
                                                {service.title}
                                            </h2>
                                            <p className="text-secondary fs-5 MathJax_Preview lh-lg mb-0">
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* شبكة الميزات الاستاتيكية المشتركة */}
                                        <Row className="g-3 my-4 mx-0">
                                            <Col xs={12} sm={6} className="px-0">
                                                <div className="d-flex align-items-center">
                                                    <div className="p-3 rounded-3 ms-3" style={{ backgroundColor: "rgba(0, 102, 80, 0.08)", color: "#006650" }}>
                                                        <GeoAlt size={22} />
                                                    </div>
                                                    <div>
                                                        <h6 className="fw-bold mb-0 text-dark">تغطية جغرافية كاملة</h6>
                                                        <span className="text-muted small">لكافة ولايات ومناطق السودان</span>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col xs={12} sm={6} className="px-0 mt-3 mt-sm-0">
                                                <div className="d-flex align-items-center">
                                                    <div className="p-3 rounded-3 ms-3" style={{ backgroundColor: "rgba(245, 158, 11, 0.08)", color: "#f59e0b" }}>
                                                        <Globe2 size={22} />
                                                    </div>
                                                    <div>
                                                        <h6 className="fw-bold mb-0 text-dark">الربط الدولي السريع</h6>
                                                        <span className="text-muted small">شراكات حول العالم</span>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                        {/* أزرار اتخاذ إجراء */}
<div className="d-flex flex-wrap gap-3 pt-2">
  <Button 
    {...({ as: Link, to: "/HowPost" } as any)}
    className="btn px-4 py-3 border-0 shadow-sm d-flex align-items-center justify-content-center gap-2 fw-semibold text-decoration-none"
    style={{ backgroundColor: "#006650", color: "#ffffff" }}
  >
    أشحن الآن <ArrowLeft />
  </Button>

                                            
                                            <Button 
                                                href="/" 
                                                variant="outline-secondary" 
                                                className="px-4 py-3 bg-light-subtle text-dark border-1 fw-semibold"
                                            >
                                                أقرب مكتب بريد
                                            </Button>
                                        </div>
                                    </div>
                                </Col>

                                {/* عمود الصورة والبطاقة العائمة */}
                                <Col 
                                    lg={6} 
                                    className={`p-0 overflow-hidden order-1 ${isEven ? "order-lg-2 mt-5 mt-lg-0" : "order-lg-1"}`}
                                >
                                    <div className="position-relative d-flex justify-content-center align-items-center" style={{ minHeight: "450px" }}>
                                        
                                        {/* خط الإطار المتقطع: يتبدل يميناً ويساراً تلقائياً */}
                                        <div 
                                            className="position-absolute rounded-4 d-none d-sm-block shadow-sm" 
                                            style={{ 
                                                width: "85%", 
                                                height: "90%", 
                                                border: "2px dashed #006650", 
                                                top: "10px", 
                                                zIndex: 1,
                                                opacity: 0.3,
                                                left: isEven ? "10px" : "auto",
                                                right: isEven ? "auto" : "10px"
                                            }}
                                        ></div>

                                        {/* الصورة المعروضة */}
                                        <div className="w-100 p-2 position-relative" style={{ zIndex: 2 }}>
                                            <img 
                                                src={service.image} 
                                                alt={service.alt} 
                                                className="w-100 rounded-4 shadow-lg object-fit-cover" 
                                                style={{ height: "420px", borderBottom: "8px solid #006650" }}
                                            />
                                        </div>

                                        {/* البطاقة العائمة: تندفع لليسار أو اليمين لتفادي حجب الصورة */}
                                        <Card 
                                            className="position-absolute border-0 shadow p-3 bg-white rounded-3 d-none d-md-flex text-end"
                                            style={{ 
                                                bottom: "40px", 
                                                width: "220px", 
                                                zIndex: 3,
                                                left: isEven ? "-20px" : "auto",
                                                right: isEven ? "auto" : "-20px"
                                            }}
                                        >
                                            <div className="d-flex align-items-center justify-content-between mb-2">
                                                <div className="p-2 rounded-3 text-white" style={{ backgroundColor: "#006650" }}>
                                                    <ShieldCheck size={20} />
                                                </div>
                                                <span className="fw-bold text-dark fs-5">آمنة 100%</span>
                                            </div>
                                            <p className="text-muted small mb-0">تأمين شامل وضمان تام لسلامة كافة محتويات الطرود.</p>
                                        </Card>
                                    </div>
                                </Col>

                            </Row>
                        </Container>
                    </section>
                );
            })}
        </div>
    );
};

export default ServicPost;