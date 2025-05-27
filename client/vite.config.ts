import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig( {
  plugins: [ react(), tsconfigPaths() ],
  resolve: {
    alias: {
      '@': resolve( __dirname, './src' ),
      'app': resolve( __dirname, './src/app' ),
      'entities': resolve( __dirname, './src/entities' ),
      'features': resolve( __dirname, './src/features' ),
      'widgets': resolve( __dirname, './src/widgets' ),
      'pages': resolve( __dirname, './src/pages' ),
      'shared': resolve( __dirname, './src/shared' ),
    }
  }
} )