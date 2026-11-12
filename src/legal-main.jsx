import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tailwind.css'
import './undersoft.css'
import './legacy-under.css'
import './desktop-fluid.css'
import './mobile.css'
import './legal.css'
import LegalPage from './components/LegalPage.jsx'
import { DOCS } from './legal/content'
import { I18nProvider } from './i18n/I18nContext.jsx'
import CookieConsent from './components/CookieConsent.jsx'

// Cada pagina legal (ex.: /termos-de-servico/index.html) indica o documento em <div id="root" data-doc="...">
const root = document.getElementById('root')
const doc = DOCS[root.dataset.doc]

createRoot(root).render(
  <StrictMode>
    <I18nProvider>
      <LegalPage doc={doc} />
      <CookieConsent />
    </I18nProvider>
  </StrictMode>,
)
