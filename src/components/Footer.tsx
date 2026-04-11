import Mission_logo from '../assets/mission_logo.svg'

export default function Footer() {
  return (
    <footer
      className="relative mt-16 border-t border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-800 pt-14 text-slate-200"
      role="contentinfo"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" aria-hidden />
      <div className="mx-auto max-w-[1200px] px-4 pb-0 min-[768px]:px-6 min-[1024px]:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 min-[1024px]:grid-cols-2 min-[1024px]:gap-10 min-[1280px]:grid-cols-[2fr_1.2fr_1.5fr_1.8fr]">
          <div className="min-[1024px]:col-span-2 min-[1280px]:col-span-1">
            <div className="flex flex-col gap-4">
              <img
                src={Mission_logo}
                alt="Mission World Education"
                className="h-12 w-auto brightness-0 invert"
              />
              <div>
                <h3 className="mb-3 text-2xl font-bold text-white">Mission World Education</h3>
                <p className="m-0 max-w-md text-[0.95rem] leading-relaxed text-slate-400">
                  Empowering global learners through quality education and innovative programs.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="inline-block rounded-full bg-gradient-to-r from-brand to-brand-gold px-4 py-2 text-xs font-semibold tracking-wide text-white">
                Accredited Institution
              </span>
            </div>
          </div>

          <div>
            <h4 className="relative mb-5 text-lg font-bold text-white after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-8 after:rounded after:bg-gradient-to-r after:from-brand after:to-brand-gold">
              Quick Links
            </h4>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {['Admissions Process', 'Academic Programs', 'Scholarships', 'Campus Events', 'Student Portal'].map((t) => (
                <li key={t}>
                  <a href="#" className="relative pl-0 text-[0.95rem] text-slate-300 no-underline transition hover:translate-x-1 hover:text-white">
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="relative mb-5 text-lg font-bold text-white after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-8 after:rounded after:bg-gradient-to-r after:from-brand after:to-brand-gold">
              Contact Information
            </h4>
            <address className="flex flex-col gap-5 not-italic">
              <div className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-lg" aria-hidden>
                  📍
                </span>
                <div className="text-[0.95rem] text-slate-300">
                  Tindobato/Naladobato
                  <br />
                  Banepa, Kavre, Nepal
                </div>
              </div>
              <div className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-lg" aria-hidden>
                  📞
                </span>
                <div className="text-[0.95rem]">
                  <a href="tel:+9779851021384" className="text-slate-300 no-underline hover:text-white">
                    +977 9851021384
                  </a>
                  <br />
                  <a href="tel:+9779705426949" className="text-slate-300 no-underline hover:text-white">
                    +977 9705426949
                  </a>
                  <br />
                  <a href="tel:+977011662440" className="text-slate-300 no-underline hover:text-white">
                    011 662440
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-lg" aria-hidden>
                  ✉️
                </span>
                <div className="text-[0.95rem]">
                  <a
                    href="mailto:missioneducation505@gmail.com"
                    className="text-slate-300 no-underline hover:text-white"
                  >
                    missioneducation505@gmail.com
                  </a>
                </div>
              </div>
            </address>
          </div>

          <div>
            <h4 className="relative mb-5 text-lg font-bold text-white after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-8 after:rounded after:bg-gradient-to-r after:from-brand after:to-brand-gold">
              Stay Connected
            </h4>
            <div className="border-t border-slate-700 pt-6">
              <h5 className="mb-4 text-[0.95rem] font-semibold text-slate-300">Follow Us</h5>
              <div className="grid grid-cols-2 gap-3 min-[480px]:grid-cols-1">
                <a
                  className="flex items-center gap-2 rounded-md p-2 text-[0.9rem] text-slate-300 no-underline transition hover:bg-white/5 hover:text-white"
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.09 5.66 21.24 10.44 22v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.76-1.61 1.54v1.86h2.74l-.44 2.9h-2.3V22C18.34 21.24 22 17.09 22 12.07z" />
                  </svg>
                  <span>Facebook</span>
                </a>
                <a
                  className="flex items-center gap-2 rounded-md p-2 text-[0.9rem] text-slate-300 no-underline transition hover:bg-white/5 hover:text-white"
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="my-12 overflow-hidden rounded-xl border border-slate-700 shadow-2xl shadow-black/30">
          <iframe
            title="Mission World Education Location"
            className="block h-[250px] w-full border-0 min-[480px]:h-[300px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.777665286048!2d85.5188836!3d27.6314018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb0f32bf6d4795%3A0x9bcd198370f4bd!2sMission%20Computer%20%26%20Educational%20Institute!5e0!3m2!1sen!2snp!4v1762702759392!5m2!1sen!2snp"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="border-t border-slate-700 py-6">
          <div className="flex flex-col flex-wrap items-center justify-between gap-4 text-center min-[768px]:flex-row min-[768px]:text-left">
            <p className="m-0 text-[0.9rem] text-slate-400">
              © {new Date().getFullYear()} Mission World Education. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 min-[768px]:justify-end">
              <a href="#" className="text-[0.9rem] text-slate-400 no-underline hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-[0.9rem] text-slate-400 no-underline hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-[0.9rem] text-slate-400 no-underline hover:text-white">
                Accessibility
              </a>
              <a href="#" className="text-[0.9rem] text-slate-400 no-underline hover:text-white">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
