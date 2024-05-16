import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  //creare proxy settings perché local host in ui sono diversi da quello di server. 
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false, // perchè target non è https quindi usiamo false
      }
    }
  },
  plugins: [react()],
})
