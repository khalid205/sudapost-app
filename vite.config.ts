import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // هذا هو السطر المسؤول عن إصلاح خطأ 404 للملفات
  base: '/sudapost-app/', 
})