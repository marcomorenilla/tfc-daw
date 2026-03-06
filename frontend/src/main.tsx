import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AdminPage } from './AdminPage'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminPage />
  </StrictMode>,
)
