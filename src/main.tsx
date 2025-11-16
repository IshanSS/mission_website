import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import MissionFavicon from './assets/Mission_logo.svg'

// Set a default document title and basic meta tags for SEO / mobile
if (typeof document !== 'undefined') {
  if (!document.title) document.title = 'Mission World'
  if (!document.querySelector('meta[name="description"]')) {
    const meta = document.createElement('meta')
    meta.name = 'description'
    meta.content = 'Mission World Education — high-quality programs, community learning and career guidance.'
    document.head.appendChild(meta)
  }
  if (!document.querySelector('meta[name="viewport"]')) {
    const mv = document.createElement('meta')
    mv.name = 'viewport'
    mv.content = 'width=device-width, initial-scale=1'
    document.head.appendChild(mv)
  }

  // Add or update site favicon and apple-touch-icon to use the app logo
  try {
    const setLink = (rel: string, href: string, type?: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.rel = rel
        if (type) el.type = type
        document.head.appendChild(el)
      }
      el.href = href
    }

    // primary favicon (SVG works in modern browsers)
    setLink('icon', MissionFavicon, 'image/svg+xml')
    // provide a touch icon for iOS/Android
    setLink('apple-touch-icon', MissionFavicon)
  } catch (e) {
    // silent fail if environment doesn't support asset import or DOM manipulation
    console.warn('Could not set favicon:', e)
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
