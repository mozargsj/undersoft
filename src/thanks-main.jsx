import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tailwind.css'
import './undersoft.css'
import './legacy-under.css'
import './desktop-fluid.css'
import './mobile.css'
import './legal.css'
import './thanks.css'
import ThanksPage from './components/ThanksPage.jsx'
import { I18nProvider } from './i18n/I18nContext.jsx'
import CookieConsent from './components/CookieConsent.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider>
      <ThanksPage />
      <CookieConsent />
    </I18nProvider>
  </StrictMode>,
)
