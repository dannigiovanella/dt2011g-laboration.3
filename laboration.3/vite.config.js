import { defineConfig } from 'vite';
import { resolve } from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        pictures: resolve(__dirname, "sass.html"),
        animation: resolve(__dirname, "animation.html"),
        diagram: resolve(__dirname, "diagram.html"),
        map: resolve(__dirname, "map.html")
      }
    }
  },
  plugins: [
    ViteImageOptimizer({

      webp:{
        quality: 80
      }

    })
  ]

  });