import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router'


const rootElement = document.getElementById('root')
// Ensure rootElement is not null before proceeding
if (rootElement) {
createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)} else {
  console.error("Root element not found");
}
