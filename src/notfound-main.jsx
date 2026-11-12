import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tailwind.css'
import './undersoft.css'
import './legacy-under.css'
import './desktop-fluid.css'
import './mobile.css'
import './legal.css'
import './notfound.css'
import NotFoundPage from './components/NotFoundPage.jsx'
import { I18nProvider } from './i18n/I18nContext.jsx'
import CookieConsent from './components/CookieConsent.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider>
      <NotFoundPage />
      <CookieConsent />
    </I18nProvider>
  </StrictMode>,
)
