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
import Team2 from './assets/dipesh_sir.jpeg'
import Team3 from './assets/sajan_sir.jpeg'
import Team4 from './assets/rajkumar_sir.jpeg'
import Team5 from './assets/shiba_ram_sir.jpeg'
import Team6 from './assets/prabin_sir.jpeg'
import React, { useState, useEffect, useRef } from 'react'

type ErrorBoundaryProps = { children: React.ReactNode }
type ErrorBoundaryState = { hasError: boolean; message?: string }

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(err: Error) {
    return { hasError: true, message: err?.message || 'Something went wrong' }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center" role="alert">
          <h2 className="text-xl font-bold text-slate-900">Sorry — an unexpected error occurred</h2>
          <p className="mt-2 text-slate-500">{this.state.message}</p>
          <div className="mt-4">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="focus-ring rounded-xl bg-gradient-to-r from-brand to-brand-gold px-5 py-3 font-bold text-white shadow-lg"
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

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

function LazyImage(props: {
  src: string
  srcSet?: string
  sizes?: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}) {
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
      className={`${className ?? ''} blur-up h-full w-full object-cover ${loaded ? 'loaded' : ''}`}
      onLoad={() => setLoaded(true)}
      onError={() => {
        setSrcState('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=')
        setLoaded(true)
      }}
    />
  )
}

const instructorBtnOutline =
  'focus-ring inline-flex items-center justify-center rounded-full border-2 border-slate-900/10 bg-transparent px-3 py-2 text-sm font-bold text-slate-700 no-underline transition hover:bg-slate-50'
const instructorBtnSecondary =
  'focus-ring inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-slate-100 px-3 py-2 text-sm font-bold text-slate-900 no-underline transition hover:bg-slate-200'

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalHtml, setModalHtml] = useState<string | null>(null)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalHref, setModalHref] = useState<string | null>(null)

  const lastFocusedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const mainEl = document.querySelector('main')
    if (modalOpen) mainEl?.setAttribute('aria-hidden', 'true')
    else mainEl?.removeAttribute('aria-hidden')
  }, [modalOpen])

  useEffect(() => {
    if (!modalOpen) return
    const modal = document.getElementById('external-document-modal')
    if (!modal) return

    const focusable = Array.from(
      modal.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => el.offsetParent !== null)

    const first = focusable[0] ?? null
    const last = focusable[focusable.length - 1] ?? null
    if (first) {
      try {
        first.focus({ preventScroll: true })
      } catch {
        first.focus()
      }
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

  useEffect(() => {
    const root = document.documentElement
    if (modalOpen) {
      root.classList.add('no-scroll')
      document.body.classList.add('no-scroll')
    } else {
      root.classList.remove('no-scroll')
      document.body.classList.remove('no-scroll')
    }
    return () => {
      root.classList.remove('no-scroll')
      document.body.classList.remove('no-scroll')
    }
  }, [modalOpen])

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [modalOpen])

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
        if (!/terms|privacy/.test(pathname)) return

        e.preventDefault()
        e.stopImmediatePropagation?.()
        e.stopPropagation?.()

        lastFocusedRef.current = document.activeElement as HTMLElement | null

        const absHref = url.href
        const fallbackTitle =
          anchor.textContent?.trim() || (pathname.includes('privacy') ? 'Privacy Policy' : 'Terms of Service')

        fetchWithTimeout(absHref, { credentials: 'same-origin' }, 9000)
          .then((res) => {
            if (!res.ok) throw new Error('Network error')
            return res.text()
          })
          .then((html) => {
            const parser = new DOMParser()
            const doc = parser.parseFromString(html, 'text/html')

            doc.querySelectorAll('script, iframe, link[rel="stylesheet"]').forEach((n) => n.remove())

            const preferred =
              doc.querySelector('#content') ||
              doc.querySelector('main') ||
              doc.querySelector('.wrap') ||
              doc.body

            const bodyHtml = preferred ? (preferred as Element).innerHTML : html
            const titleFromDoc =
              doc.querySelector('title')?.textContent?.trim() ||
              doc.querySelector('h1')?.textContent?.trim() ||
              fallbackTitle

            setModalHtml(`<div class="external-modal__inner-content">${bodyHtml}</div>`)
            setModalTitle(titleFromDoc)
            setModalHref(absHref)
            setModalOpen(true)

            setTimeout(() => {
              const closeBtn = document.querySelector('.external-modal__close') as HTMLButtonElement | null
              if (closeBtn) {
                try {
                  closeBtn.focus({ preventScroll: true })
                } catch {
                  closeBtn.focus()
                }
              }
            }, 60)
          })
          .catch(() => {
            window.location.href = absHref
          })
      } catch {
        /* allow default */
      }
    }

    document.addEventListener('click', handleFooterLinkClick, true)
    return () => document.removeEventListener('click', handleFooterLinkClick, true)
  }, [])

  useEffect(() => {
    if (!modalOpen) {
      setTimeout(() => {
        try {
          if (lastFocusedRef.current) {
            lastFocusedRef.current.focus({ preventScroll: true } as FocusOptions)
          } else {
            const footerLink = document.querySelector(
              'footer a[href*="privacy"], footer a[href*="terms"]'
            ) as HTMLAnchorElement | null
            if (footerLink) footerLink.focus({ preventScroll: true } as FocusOptions)
          }
        } catch {
          /* ignore */
        }
      }, 80)
    }
  }, [modalOpen])

  const team = [
    {
      img: Team5,
      name: 'Shiba Ram Ghimire',
      role: 'Managing Director',
      bio: '10+ years experience in management and leadership.',
    },
    {
      img: Team2,
      name: 'Dipesh Timalsina',
      role: 'Computer Instructor',
      bio: 'Computer instructor with special expertise in software applications and hardware troubleshooting.',
    },
    {
      img: Team3,
      name: 'Sajan Khulal',
      role: 'German Instructor',
      bio: 'German Instructor with expertise in language teaching and cultural exchange.',
    },
    {
      img: Team6,
      name: 'Prabin Lama',
      role: 'IELTS Instructor',
      bio: 'IELTS specialist with extensive experience in exam preparation and coaching.',
    },
    {
      img: Team3,
      name: 'Srijana Shrestha',
      role: 'Japanese Language Instructor',
      bio: 'Japanese language instruction with a focus on JLPT levels and conversational skills for study and work abroad.',
    },
    {
      img: Team4,
      name: 'Raj Kumar Ghimire (Rajan)',
      role: 'Academic Tutor',
      bio: 'Dedicated to helping students excel in their academic pursuits.',
    },
  ]

  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <ErrorBoundary>
        <Header />

        <main
          id="content"
          className="flex-auto pt-[calc(var(--header-height,4.5rem)+8px)] transition-[padding] duration-200"
        >
          <Hero />

          <section id="gallery" className="w-full px-4 py-4 min-[768px]:px-6" aria-label="Campus photos">
            <div className="mx-auto max-w-[1400px] text-left">
              <h2 className="mb-1 text-xl font-bold text-slate-900">Gallery</h2>
              <p className="mb-4 text-slate-500">A few snapshots from our facilites and student activities.</p>
              <div className="grid grid-cols-2 gap-4 min-[640px]:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] min-[920px]:gap-5 min-[920px]:[grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] max-[420px]:grid-cols-1">
                {[Gallery1, Gallery2, Gallery3, Gallery4, Gallery5, Gallery7].map((src, i) => (
                  <figure
                    key={i}
                    className="group overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5"
                  >
                    <LazyImage
                      src={src}
                      alt="Campus gallery"
                      className="h-[180px] w-full object-cover transition duration-300 group-hover:scale-105 min-[640px]:h-[240px] min-[920px]:h-[280px] max-[420px]:h-[220px]"
                    />
                  </figure>
                ))}
              </div>
            </div>
          </section>

          <Programs />
          <About />

          <section
            id="team"
            className="bg-gradient-to-b from-white to-slate-50 px-4 py-12 sm:px-6 lg:py-16"
            aria-labelledby="team-title"
          >
            <div className="mx-auto max-w-[1200px] text-left">
              <h2 id="team-title" className="mb-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                Meet Our Instructors
              </h2>
              <p className="mb-8 max-w-2xl text-slate-500 sm:text-lg">
                Experienced trainers and counsellors committed to your success.
              </p>
              <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:items-stretch">
                {team.map((m) => (
                  <li key={m.name} className="flex h-full min-h-0">
                    <article className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-900/[0.06] ring-1 ring-slate-900/[0.04] transition-shadow duration-200 hover:shadow-lg">
                      <div className="relative aspect-[5/4] w-full shrink-0 overflow-hidden bg-slate-100 sm:aspect-[4/3]">
                        <LazyImage
                          src={m.img}
                          alt={m.name}
                          className="absolute inset-0 h-full w-full object-cover object-top"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                        <div className="shrink-0">
                          <h3 className="m-0 text-lg font-bold leading-snug text-slate-900">{m.name}</h3>
                          <p className="mt-1.5 m-0 text-sm font-semibold text-brand">{m.role}</p>
                        </div>
                        <p
                          className="m-0 min-h-[4.5rem] flex-1 text-sm leading-relaxed text-slate-600 line-clamp-4 sm:min-h-[5rem] sm:line-clamp-5"
                          title={m.bio}
                        >
                          {m.bio}
                        </p>
                        <div className="mt-auto flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                          <a className={instructorBtnOutline} href="mailto:missioncomputer8@gmail.com">
                            Contact
                          </a>
                          <a className={instructorBtnSecondary} href="#contact">
                            Book Session
                          </a>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <Contact />
        </main>

        <Footer />
      </ErrorBoundary>

      {modalOpen && (
        <div
          id="external-document-modal"
          className="fixed inset-0 z-[17000] flex items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(8,10,14,0.45)_0%,rgba(8,10,14,0.6)_60%)] p-4 backdrop-blur-md min-[980px]:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="external-modal-title"
          aria-describedby="external-modal-content"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false)
          }}
        >
          <div
            className="relative grid max-h-[calc(100vh-2rem)] w-full max-w-[1280px] grid-cols-1 overflow-hidden rounded-2xl border border-slate-900/5 bg-gradient-to-b from-white to-slate-50 shadow-2xl min-[980px]:grid-cols-[420px_1fr] min-[980px]:gap-7 [animation:modal-pop_0.36s_cubic-bezier(0.2,0.9,0.2,1)]"
            role="document"
            tabIndex={-1}
          >
            <div
              className="hidden min-[980px]:block min-[980px]:bg-gradient-to-b min-[980px]:from-brand/12 min-[980px]:to-brand/5"
              aria-hidden
            />
            <button
              type="button"
              className="focus-ring absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-slate-900/5 bg-gradient-to-b from-white to-slate-100 shadow-lg min-[980px]:right-[18px] min-[980px]:top-[18px] min-[980px]:h-[52px] min-[980px]:w-[52px]"
              aria-label="Close"
              onClick={() => setModalOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden focusable="false">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <header className="col-span-1 px-5 pb-2 pt-6 min-[980px]:col-start-2 min-[980px]:px-9 min-[980px]:pt-9">
              <h2 id="external-modal-title" className="m-0 text-xl font-extrabold tracking-tight text-slate-900 min-[980px]:text-[1.9rem]">
                {modalTitle}
              </h2>
            </header>

            {modalHtml ? (
              <div
                id="external-modal-content"
                className="col-span-1 max-h-[50vh] overflow-y-auto px-5 pb-5 text-[1.03rem] leading-relaxed text-slate-700 min-[980px]:col-start-2 min-[980px]:max-h-[min(60vh,calc(100vh-220px))] min-[980px]:max-w-none min-[980px]:px-9 [&_img]:my-4 [&_img]:block [&_img]:h-auto [&_img]:max-w-full"
                dangerouslySetInnerHTML={{ __html: modalHtml }}
              />
            ) : (
              <div
                id="external-modal-content"
                className="col-span-1 max-h-[50vh] overflow-y-auto px-5 pb-5 text-slate-700 min-[980px]:col-start-2 min-[980px]:max-h-[min(60vh,calc(100vh-220px))] min-[980px]:px-9"
              >
                <div className="mx-auto max-w-[70ch] py-1">
                  <p className="mb-2 text-[1.05rem] font-bold text-slate-900">
                    About {modalTitle || 'this document'}
                  </p>
                  <p className="leading-relaxed">
                    Mission World is committed to delivering practical, career‑ready programs that combine hands‑on
                    training, mentorship and real world outcomes. Below is a short summary to help you get started.
                  </p>
                  <ul className="my-3 list-disc space-y-2 pl-5 text-slate-600" aria-hidden>
                    <li>
                      <strong>Practical curriculum</strong> — industry-aligned, project based learning.
                    </li>
                    <li>
                      <strong>Experienced instructors</strong> — practitioners & certified trainers.
                    </li>
                    <li>
                      <strong>Placement support</strong> — resume & interview prep plus employer network.
                    </li>
                  </ul>
                  <div className="my-4 rounded-xl border border-brand/10 bg-gradient-to-b from-brand/[0.04] to-brand/[0.02] p-4">
                    <h3 className="m-0 text-base font-bold text-slate-900">Quick facts</h3>
                    <div className="mt-3 grid grid-cols-3 gap-3 text-sm text-slate-700">
                      <div>
                        <strong>Duration</strong>
                        <br />
                        3–6 months
                      </div>
                      <div>
                        <strong>Format</strong>
                        <br />
                        Hybrid (online & on-site)
                      </div>
                      <div>
                        <strong>Level</strong>
                        <br />
                        Beginner → Advanced
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-slate-500">For full details you can open the original page in a new tab.</p>
                </div>
              </div>
            )}
            <footer className="col-span-1 flex flex-col-reverse gap-3 border-t border-slate-900/5 bg-gradient-to-t from-white to-transparent px-5 py-4 min-[980px]:col-start-2 min-[980px]:flex-row min-[980px]:items-center min-[980px]:justify-between min-[980px]:px-9">
              <small className="break-all text-xs text-slate-500 opacity-95" aria-hidden>
                {modalHref ?? ''}
              </small>
              <div className="flex flex-col gap-2 min-[980px]:flex-row min-[980px]:items-center">
                {modalHref && (
                  <a
                    className="focus-ring inline-flex w-full items-center justify-center rounded-full border border-slate-900/10 px-4 py-2.5 text-center text-sm font-bold text-slate-900 no-underline transition hover:bg-slate-50 min-[980px]:w-auto"
                    href={modalHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open original
                  </a>
                )}
                <button
                  type="button"
                  className="focus-ring inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-brand to-brand-gold px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-brand/15 min-[980px]:w-auto"
                  onClick={() => window.alert('Apply action')}
                >
                  Apply Now
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  )
}

export default App
