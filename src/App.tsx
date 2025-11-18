import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Programs from './components/Programs'  
import About from './components/About'
import Contact from './components/Contact'
import Gallery1 from './assets/second_image.jpeg'
import Gallery2 from './assets/third_image.jpeg'
import Gallery3 from './assets/fourth_image.jpeg'
import Gallery4 from './assets/fifth_image.jpeg'
import Gallery5 from './assets/sixth_image.jpeg'
import Gallery7 from './assets/eighth_image.jpeg'
// import Team1 from './assets/first_image.jpeg'
import Team2 from './assets/dipesh_sir.jpeg'
import Team3 from './assets/sajan_sir.jpeg'
import Team4 from './assets/rajkumar_sir.jpeg'
import Team5 from './assets/shiba_ram_sir.jpeg'
import Team6 from './assets/prabin_sir.jpeg'
import { useState, useEffect } from 'react'

function LazyImage(props: { src: string; srcSet?: string; sizes?: string; alt: string; className?: string; loading?: 'lazy' | 'eager' }) {
  const { src, srcSet, sizes, alt, className, loading = 'lazy' } = props
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding="async"
      className={`${className ?? ''} blur-up ${loaded ? 'loaded' : ''}`}
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(true)}
    />
  )
}

function App() {

  // Modal for showing /terms.html and /privacy.html inline
  const [modalOpen, setModalOpen] = useState(false)
  const [modalHtml, setModalHtml] = useState<string | null>(null)
  const [modalTitle, setModalTitle] = useState<string>('')

  useEffect(() => {
    // Intercept clicks for Terms/Privacy and load content into an accessible modal.
    const handleFooterLinkClick = (e: MouseEvent) => {
      // ensure we have an EventTarget that is Element-like
      const target = e.target as Element | null
      const anchor = target?.closest ? (target.closest('a') as HTMLAnchorElement | null) : null
      if (!anchor) return

      const hrefRaw = anchor.getAttribute('href') || anchor.href || ''
      if (!hrefRaw) return

      // ignore hash-only anchors
      if (hrefRaw.startsWith('#')) return

      // ignore links that explicitly open in a new tab or marked to skip remote handling
      if (anchor.target === '_blank' || anchor.getAttribute('target') === '_blank') return
      if (anchor.getAttribute('data-remote') === 'false') return

      // Match links that include 'terms' or 'privacy' in filename or path
      try {
        const url = new URL(hrefRaw, window.location.href)
        const pathname = url.pathname.toLowerCase()
        if (!(/terms|privacy/.test(pathname))) return

        // Prevent default navigation immediately (capture phase ensures we run before bubble handlers)
        e.preventDefault()
        // stop other handlers from running and stop default anchor action
        e.stopImmediatePropagation?.()
        e.stopPropagation?.()

        const absHref = url.href
        const fallbackTitle = anchor.textContent?.trim() || (pathname.includes('privacy') ? 'Privacy Policy' : 'Terms of Service')

        fetch(absHref, { credentials: 'same-origin' })
          .then((res) => {
            if (!res.ok) throw new Error('Network error')
            return res.text()
          })
          .then((html) => {
            const parser = new DOMParser()
            const doc = parser.parseFromString(html, 'text/html')
            // Prefer a main/wrap container if present, otherwise fallback to body innerHTML
            const preferred =
              doc.querySelector('.wrap') ||
              doc.querySelector('main') ||
              doc.querySelector('#content') ||
              doc.querySelector('body')
            const bodyHtml = preferred ? (preferred as Element).innerHTML : html
            const titleFromDoc = (doc.querySelector('title')?.textContent?.trim())
              || (doc.querySelector('h1')?.textContent?.trim())
              || fallbackTitle

            // wrap content to avoid collisions with app CSS and allow modal scrolling
            setModalHtml(`<div class="external-modal__inner-content">${bodyHtml}</div>`)
            setModalTitle(titleFromDoc)
            setModalOpen(true)
            // accessibility: prevent background scroll and focus close control after paint (no scroll)
            document.body.classList.add('no-scroll')
            setTimeout(() => {
              const closeBtn = document.querySelector('.external-modal__close') as HTMLButtonElement | null
              if (closeBtn) {
                try { closeBtn.focus({ preventScroll: true }) } catch { closeBtn.focus() }
              }
            }, 60)
          })
          .catch(() => {
            // fallback: navigate away if fetch fails
            window.location.href = absHref
          })
      } catch {
        // if URL parsing fails, do nothing
      }
    }

    // Use capture: true so we intercept the click before default navigation or other handlers
    document.addEventListener('click', handleFooterLinkClick, true)
    return () => document.removeEventListener('click', handleFooterLinkClick, true)
  }, [])

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) setModalOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen])

  // keep body scroll state and cleanup modal HTML when closed
  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
      // clear HTML to free memory
      setModalHtml(null)
      setModalTitle('')
    }
  }, [modalOpen])

  // ensure body scroll state is cleaned up and focus is restored when modal closes
  useEffect(() => {
    if (!modalOpen) {
      document.body.classList.remove('no-scroll')
      // ensure focus returns to footer link (best effort) without scrolling
      setTimeout(() => {
        const footerLink = document.querySelector('footer a[href$="privacy.html"], footer a[href$="terms.html"]') as HTMLAnchorElement | null
        if (footerLink) {
          try { footerLink.focus({ preventScroll: true }) } catch { footerLink.focus() }
        }
      }, 80)
    }
  }, [modalOpen])

  return (
    <>
      {/* accessible skip link */}
      <a className="skip-link" href="#content">Skip to content</a>
      <Header />

      {/* main content */}
      <main id="content" className="site-main">
        <Hero />

        {/* Gallery */}
        <section id="gallery" className="gallery" aria-label="Campus photos">
          <div className="gallery-inner">
            <h2 className="gallery-title">Gallery</h2>
            <p className="gallery-sub">A few snapshots from our facilites and student activities.</p>
            <div className="gallery-grid">
              <figure className="gallery-item">
                <LazyImage src={Gallery1} alt="Students collaborating" />
              </figure>
              <figure className="gallery-item">
                <LazyImage src={Gallery2} alt="Campus building" />
              </figure>
              <figure className="gallery-item">
                <LazyImage src={Gallery3} alt="Lecture in progress" />
              </figure>
              <figure className="gallery-item">
                <LazyImage src={Gallery4} alt="Graduation ceremony" />
              </figure>
              <figure className="gallery-item">
                <LazyImage src={Gallery5} alt="Library area" />
              </figure>
              {/* <figure className="gallery-item">
                <LazyImage src={Gallery6} alt="Student lounge" />
              </figure> */}
              <figure className="gallery-item">
                <LazyImage src={Gallery7} alt="Outdoor campus area" />
              </figure>
            </div>
          </div>
        </section>

        {/* Programs section */}
        <Programs />

        {/* About section */}
        <About />

        {/* Team / Instructors */}
        <section id="team" className="team-section" aria-labelledby="team-title">
          <div className="team-inner">
            <h2 id="team-title">Meet Our Instructors</h2>
            <p className="team-sub">Experienced trainers and counsellors committed to your success.</p>
            <div className="team-grid">
              <article className="instructor-card">
                <div className="instructor-media">
                  <LazyImage src={Team5} alt="Instructor A" />
                </div>
                <div className="instructor-body">
                  <h3 className="instructor-name">Shiba Ram Ghimire</h3>
                  <p className="instructor-role">Managing Director</p>
                  <p className="instructor-bio">10+ years experience in management and leadership.</p>
                  <div className="instructor-actions">
                    <a className="action-button outline" href="mailto:missioncomputer8@gmail.com">Contact</a>
                    <a className="action-button secondary" href="#contact">Book Session</a>
                  </div>
                </div>
              </article>
              <article className="instructor-card">
                <div className="instructor-media">
                  <LazyImage src={Team2} alt="Instructor B" />
                </div>
                <div className="instructor-body">
                  <h3 className="instructor-name">Dipesh Timalsina</h3>
                  <p className="instructor-role">Computer Instructor</p>
                  <p className="instructor-bio">Computer instructor with special expertise in software applications and hardware troubleshooting.</p>
                  <div className="instructor-actions">
                    <a className="action-button outline" href="mailto:missioncomputer8@gmail.com">Contact</a>
                    <a className="action-button secondary" href="#contact">Book Session</a>
                  </div>
                </div>
              </article>
              <article className="instructor-card">
                <div className="instructor-media">
                  <LazyImage src={Team3} alt="Instructor C" />
                </div>
                <div className="instructor-body">
                  <h3 className="instructor-name">Sajan Khulal</h3>
                  <p className="instructor-role">German Instructor</p>
                  <p className="instructor-bio">German Instructor with expertise in language teaching and cultural exchange.</p>
                  <div className="instructor-actions">
                    <a className="action-button outline" href="mailto:missioncomputer8@gmail.com">Contact</a>
                    <a className="action-button secondary" href="#contact">Book Session</a>
                  </div>
                </div>
              </article>
              <article className="instructor-card">
                <div className="instructor-media">
                  <LazyImage src={Team6} alt="Instructor D" />
                </div>
                <div className="instructor-body">
                  <h3 className="instructor-name">Prabin Lama</h3>
                  <p className="instructor-role">IELTS Instructor</p>
                  <p className="instructor-bio">IELTS specialist with extensive experience in exam preparation and coaching.</p>
                  <div className="instructor-actions">
                    <a className="action-button outline" href="mailto:missioncomputer8@gmail.com">Contact</a>
                    <a className="action-button secondary" href="#contact">Book Session</a>
                  </div>
                </div>
              </article>
              <article className="instructor-card">
                <div className="instructor-media">
                  <LazyImage src={Team3} alt="Instructor E" />
                </div>
                <div className="instructor-body">
                  <h3 className="instructor-name">Srijana Shrestha</h3>
                  <p className="instructor-role">Japanese Language Instructor</p>
                  <p className="instructor-bio">Japan</p>
                  <div className="instructor-actions">
                    <a className="action-button outline" href="mailto:missioncomputer8@gmail.com">Contact</a>
                    <a className="action-button secondary" href="#contact">Book Session</a>
                  </div>
                </div>
              </article>
              <article className="instructor-card">
                <div className="instructor-media">
                  <LazyImage src={Team4} alt="Instructor F" />
                </div>
                <div className="instructor-body">
                  <h3 className="instructor-name">Raj Kumar Ghimire (Rajan)</h3>
                  <p className="instructor-role">Academic Tutor</p>
                  <p className="instructor-bio">Dedicated to helping students excel in their academic pursuits.</p>
                  <div className="instructor-actions">
                    <a className="action-button outline" href="mailto:missioncomputer8@gmail.com">Contact</a>
                    <a className="action-button secondary" href="#contact">Book Session</a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Contact & Apply */}
        <Contact />

      </main>

     <Footer />

    {/* Inline modal to show static Terms/Privacy pages when footer links are clicked */}
    {modalOpen && (
      <div
        className="external-modal"
        role="dialog"
        aria-modal="true"
        aria-label={modalTitle || 'Document'}
        onClick={(e) => {
          if (e.target === e.currentTarget) setModalOpen(false)
        }}
      >
        <div className="external-modal__inner" role="document">
          <button
            className="external-modal__close"
            aria-label="Close"
            onClick={() => setModalOpen(false)}
          >
            ×
          </button>
          <header className="external-modal__header">
            <h2>{modalTitle}</h2>
          </header>
          <div
            className="external-modal__content"
            // content comes from trusted static pages in /public
            dangerouslySetInnerHTML={{ __html: modalHtml || '<p>Loading…</p>' }}
          />
        </div>
      </div>
    )}
    </>
  )
}

export default App
