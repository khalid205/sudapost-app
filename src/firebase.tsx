import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ضع هنا بيانات مشروعك الخاصة التي تعطيها لك منصة فايبربيس
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// تشغيل الفايربيس
const app = initializeApp(firebaseConfig);

// تصدير قاعدة البيانات لاستخدامها في المكونات
export const db = getFirestore(app);