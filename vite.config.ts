import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // تأكد أن المسار يبدأ وينتهي بـ "/" ويتضمن اسم المستودع الخاص بك
  base: '/sudapost-app/', 
})