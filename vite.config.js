import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração para GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/', // Subdiretório do repositório no GitHub Pages
});