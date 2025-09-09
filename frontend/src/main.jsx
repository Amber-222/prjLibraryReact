import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { authProvider } from './context/authContext.jsx' 
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <authProvider>
      <App />
    </authProvider>
  </StrictMode>,
)
