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
import React, { useState, useEffect, useRef } from 'react'

/* --- ErrorBoundary: catches render errors and shows a small fallback UI --- */
class ErrorBoundary extends React.Component<any, { hasError: boolean; message?: string }> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(err: Error) {
    return { hasError: true, message: err?.message || 'Something went wrong' }
  }
  // componentDidCatch(error: Error, info: any) {
  //   // lightweight reporting hook (expand to remote logger if desired)
  //   // console.error('ErrorBoundary caught', error, info)
  // }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" role="alert" style={{ padding: 24, textAlign: 'center' }}>
          <h2>Sorry — an unexpected error occurred</h2>
          <p style={{ color: '#6b7280' }}>{this.state.message}</p>
          <div style={{ marginTop: 12 }}>
            <button onClick={() => window.location.reload()} className="cta-button">Reload page</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

/* small helper: fetch with timeout and abort support */
async function fetchWithTimeout(input: RequestInfo, init?: RequestInit, timeout = 8000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetch(input, { ...init, signal: controller.signal })
    clearTimeout(id)
    return res
  } catch (err) {
    clearTimeout(id)
    throw err
  }
}

function LazyImage(props: { src: string; srcSet?: string; sizes?: string; alt: string; className?: string; loading?: 'lazy' | 'eager' }) {
  const { src, srcSet, sizes, alt, className, loading = 'lazy' } = props
  const [loaded, setLoaded] = useState(false)
  const [srcState, setSrcState] = useState(src)

  return (
    <img
      src={srcState}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding="async"
      className={`${className ?? ''} blur-up ${loaded ? 'loaded' : ''}`}
      onLoad={() => setLoaded(true)}
      onError={() => {
        // fallback to a 1x1 transparent GIF to keep layout stable
        setSrcState('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=')
        setLoaded(true)
      }}
    />
  )
}

function App() {
  // Modal for showing /terms.html and /privacy.html inline
  const [modalOpen, setModalOpen] = useState(false)
  const [modalHtml, setModalHtml] = useState<string | null>(null)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalHref, setModalHref] = useState<string | null>(null)

  // keep reference to last focused element to restore after modals
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  // ensure main is marked aria-hidden when external modal is open for screen readers
  useEffect(() => {
    const mainEl = document.querySelector('main')
    if (modalOpen) mainEl?.setAttribute('aria-hidden', 'true')
    else mainEl?.removeAttribute('aria-hidden')
  }, [modalOpen])

  // Focus trap for modal (simple, works for single modal at a time)
  useEffect(() => {
    if (!modalOpen) return
    const modal = document.querySelector('.external-modal') as HTMLElement | null
    if (!modal) return

    // collect focusable elements inside modal
    const focusable = Array.from(
      modal.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => el.offsetParent !== null)

    const first = focusable[0] ?? null
    const last = focusable[focusable.length - 1] ?? null
    // ensure focus lands inside modal (without scrolling)
    if (first) {
      try { first.focus({ preventScroll: true }) } catch { first.focus() }
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (focusable.length === 0) {
          e.preventDefault()
          return
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [modalOpen])

  // Ensure body scroll lock is consistent with modalOpen state
  useEffect(() => {
    if (modalOpen) document.body.classList.add('no-scroll')
    else document.body.classList.remove('no-scroll')
    return () => document.body.classList.remove('no-scroll')
  }, [modalOpen])
  
  // Close modal on Escape
  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [modalOpen])

  // Replace footer link click fetch usage with timeout-protected fetch
  useEffect(() => {
    const handleFooterLinkClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      const anchor = target?.closest ? (target.closest('a') as HTMLAnchorElement | null) : null
      if (!anchor) return

      const hrefRaw = anchor.getAttribute('href') || anchor.href || ''
      if (!hrefRaw) return
      if (hrefRaw.startsWith('#')) return
      if (anchor.target === '_blank' || anchor.getAttribute('target') === '_blank') return
      if (anchor.getAttribute('data-remote') === 'false') return

      try {
        const url = new URL(hrefRaw, window.location.href)
        const pathname = url.pathname.toLowerCase()
        if (!(/terms|privacy/.test(pathname))) return

        e.preventDefault()
        e.stopImmediatePropagation?.()
        e.stopPropagation?.()

        // remember focus
        lastFocusedRef.current = document.activeElement as HTMLElement | null

        const absHref = url.href
        const fallbackTitle = anchor.textContent?.trim() || (pathname.includes('privacy') ? 'Privacy Policy' : 'Terms of Service')

        fetchWithTimeout(absHref, { credentials: 'same-origin' }, 9000)
          .then((res) => {
            if (!res.ok) throw new Error('Network error')
            return res.text()
          })
          .then((html) => {
            const parser = new DOMParser()
            const doc = parser.parseFromString(html, 'text/html')

            // remove potentially harmful/external resources
            doc.querySelectorAll('script, iframe, link[rel="stylesheet"]').forEach(n => n.remove())

            const preferred =
              doc.querySelector('#content') ||
              doc.querySelector('main') ||
              doc.querySelector('.wrap') ||
              doc.body

            const bodyHtml = preferred ? (preferred as Element).innerHTML : html
            const titleFromDoc = (doc.querySelector('title')?.textContent?.trim())
              || (doc.querySelector('h1')?.textContent?.trim())
              || fallbackTitle

            setModalHtml(`<div class="external-modal__inner-content">${bodyHtml}</div>`)
            setModalTitle(titleFromDoc)
            setModalHref(absHref)
            setModalOpen(true)
            document.body.classList.add('no-scroll')

            setTimeout(() => {
              const closeBtn = document.querySelector('.external-modal__close') as HTMLButtonElement | null
              if (closeBtn) {
                try { closeBtn.focus({ preventScroll: true }) } catch { closeBtn.focus() }
              }
            }, 60)
          })
          .catch(() => {
            // fallback: allow normal navigation
            window.location.href = absHref
          })
      } catch {
        // if URL parsing fails, allow default
      }
    }

    document.addEventListener('click', handleFooterLinkClick, true)
    return () => document.removeEventListener('click', handleFooterLinkClick, true)
  }, [])

  // restore focus after modal closes (already done); keep it robust
  useEffect(() => {
    if (!modalOpen) {
      setTimeout(() => {
        try {
          if (lastFocusedRef.current) {
            lastFocusedRef.current.focus({ preventScroll: true } as FocusOptions)
          } else {
            const footerLink = document.querySelector('footer a[href*="privacy"], footer a[href*="terms"]') as HTMLAnchorElement | null
            if (footerLink) footerLink.focus({ preventScroll: true } as FocusOptions)
          }
        } catch {
          // ignore focus restore errors
        }
      }, 80)
    }
  }, [modalOpen])

  return (
    <>
      {/* accessible skip link */}
      <a className="skip-link" href="#content">Skip to content</a>
      <ErrorBoundary>
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
      </ErrorBoundary>

      {/* Inline modal to show static Terms/Privacy pages when footer links are clicked */}
      {modalOpen && (
        <div
          className="external-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="external-modal-title"
          aria-describedby="external-modal-content"
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false) }}
        >
          <div className="external-modal__inner" role="document" tabIndex={-1}>
            <button
              className="external-modal__close"
              aria-label="Close"
              onClick={() => setModalOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden focusable="false"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <header className="external-modal__header">
              <h2 id="external-modal-title">{modalTitle}</h2>
            </header>

            {/* If fetched HTML exists, render it. Otherwise render a polished fallback summary */}
            {modalHtml ? (
              <div
                id="external-modal-content"
                className="external-modal__content"
                dangerouslySetInnerHTML={{ __html: modalHtml }}
              />
            ) : (
              <div id="external-modal-content" className="external-modal__content">
                <div className="external-modal__fallback">
                  <p className="external-modal__lead">About {modalTitle || 'this document'}</p>
                  <p>
                    Mission World is committed to delivering practical, career‑ready
                    programs that combine hands‑on training, mentorship and real world
                    outcomes. Below is a short summary to help you get started.
                  </p>

                  <ul className="external-modal__feature-list" aria-hidden>
                    <li><strong>Practical curriculum</strong> — industry-aligned, project based learning.</li>
                    <li><strong>Experienced instructors</strong> — practitioners & certified trainers.</li>
                    <li><strong>Placement support</strong> — resume & interview prep plus employer network.</li>
                  </ul>

                  <div className="external-modal__example-card">
                    <h3>Quick facts</h3>
                    <div className="external-modal__facts">
                      <div><strong>Duration</strong><br/>3–6 months</div>
                      <div><strong>Format</strong><br/>Hybrid (online & on-site)</div>
                      <div><strong>Level</strong><br/>Beginner → Advanced</div>
                    </div>
                  </div>

                  <p className="external-modal__note">
                    For full details you can open the original page in a new tab.
                  </p>
                </div>
              </div>
            )}
            <footer className="external-modal__footer">
              <div className="external-modal__footer-left">
                <small className="external-modal__source" aria-hidden>{modalHref ?? ''}</small>
              </div>
              <div className="external-modal__footer-actions">
                {modalHref && (
                  <a className="action-button secondary" href={modalHref} target="_blank" rel="noopener noreferrer">Open original</a>
                )}
                <button className="action-button primary" onClick={() => { /* placeholder: could open apply form */ window.alert('Apply action') }}>Apply Now</button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  )
}

export default App
