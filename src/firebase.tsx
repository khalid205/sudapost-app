// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 1. استيراد خدمة المصادقة

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZVIDzmUh1RKqOTEGJWhN02lqJHjCCQ4I",
  authDomain: "sudapost-dc024.firebaseapp.com",
  projectId: "sudapost-dc024",
  storageBucket: "sudapost-dc024.firebasestorage.app",
  messagingSenderId: "628052532573",
  appId: "1:628052532573:web:9877fd5b425c102a9d1cb4",
  measurementId: "G-HM3TWF2XN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// 2. تفعيل وتصدير خدمة المصادقة لكي يتم استخدامها في شاشات تسجيل الدخول
export const auth = getAuth(app);