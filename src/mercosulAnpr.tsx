import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MercosulAnprPage from './MercosulAnprPage'
import './styles.css'
import './mercosul-anpr.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MercosulAnprPage />
  </StrictMode>,
)
