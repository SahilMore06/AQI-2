import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppNothing from './AppNothing.tsx'

// Switch between apps:
// - Use App for the original AQI design
// - Use AppNothing for the Nothing Phone 3 scrollytelling design
const USE_NOTHING_DESIGN = true

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {USE_NOTHING_DESIGN ? <AppNothing /> : <App />}
  </StrictMode>,
)
