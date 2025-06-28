import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Nav from './components/navbar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='max-h-screen bg-white'>
    <Nav />
    <App />
    </div>
  </StrictMode>,
)
