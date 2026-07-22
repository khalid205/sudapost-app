import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { PersonLock } from 'react-bootstrap-icons'; // أيقونة شخص مع قفل

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  if (!user) {
    return (
      <Modal 
        show={true} 
        centered
        backdrop="static"
        className="modern-auth-modal"
      >
        <style>{`
          .modern-auth-modal .modal-content {
            border: none;
            border-radius: 30px;
            padding: 20px;
            background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          }
          .custom-icon {
            font-size: 3rem;
            color: #006650;
            background: #e6fcf2;
            width: 90px;
            height: 90px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin: 0 auto 20px;
          }
        `}</style>
        
        <Modal.Body className="text-center py-4">
          <div className="custom-icon">
            <PersonLock />
          </div>
          <h4 className="fw-bold mb-2" style={{ color: '#102a43' }}>خطوة إضافية</h4>
          <p className="text-muted mb-4 px-3" style={{ fontSize: '1.05rem' }}>
            عذراً، أنت غير مسجل. قم بالتسجيل أولاً ثم أعد المحاولة للاستفادة من هذه الخدمة.
          </p>
          
          <div className="d-grid gap-3 px-3">
            <Button 
              onClick={() => navigate('/login')}
              className="py-3 fw-bold rounded-pill shadow-sm"
              style={{ backgroundColor: '#006650', border: 'none' }}
            >
              تسجيل الدخول
            </Button>
            <Button 
              variant="outline-secondary"
              onClick={() => navigate('/')}
              className="py-2 fw-semibold rounded-pill"
              style={{ border: 'none' }}
            >
              إلغاء
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;