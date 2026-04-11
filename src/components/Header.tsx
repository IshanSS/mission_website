import { useState, useEffect, useRef } from "react";
import Mission_logo from "../assets/mission_logo.jpg";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 920px)").matches
      : false
  );

  const headerRef = useRef<HTMLElement | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 920px)");
    const onChange = () => setIsMobileNav(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Set header height
  useEffect(() => {
    const setHeaderHeight = () => {
      if (!headerRef.current) return;
      const h = Math.ceil(headerRef.current.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--header-height", `${h}px`);
    };

    setHeaderHeight();
    window.addEventListener("resize", setHeaderHeight);
    window.addEventListener("orientationchange", setHeaderHeight);

    return () => {
      window.removeEventListener("resize", setHeaderHeight);
      window.removeEventListener("orientationchange", setHeaderHeight);
    };
  }, []);

  // Recalculate height when menu opens
  useEffect(() => {
    if (!headerRef.current) return;
    const measure = () => {
      const h = Math.ceil(headerRef.current!.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--header-height", `${h}px`);

      const nav = document.getElementById("main-nav");
      if (open && nav) {
        // calculate total visible height of nav items (safer than nav height when layout is complex)
        const items = Array.from(nav.querySelectorAll('.nav-list > li')) as HTMLElement[];
        let total = 0;
        if (items.length) {
          for (const it of items) {
            const r = it.getBoundingClientRect();
            // include margins
            const s = window.getComputedStyle(it);
            const mt = parseFloat(s.marginTop || '0') || 0;
            const mb = parseFloat(s.marginBottom || '0') || 0;
            total += Math.ceil(r.height + mt + mb);
          }
        } else {
          total = Math.ceil(nav.getBoundingClientRect().height);
        }

        // cap to available viewport space below header
        const vh = window.innerHeight - (headerRef.current ? Math.ceil(headerRef.current.getBoundingClientRect().height) : 0);
        const panelH = Math.min(total + 16, Math.max(0, vh));
        document.documentElement.style.setProperty("--nav-panel-height", `${panelH}px`);
      } else {
        document.documentElement.style.setProperty("--nav-panel-height", `0px`);
      }
    };

    // measure after layout stabilizes; do rAF and a short timeout to catch CSS transitions
    requestAnimationFrame(() => {
      measure();
      const t = setTimeout(measure, 80);
      return () => clearTimeout(t);
    });
  }, [open]);

  // Scroll lock + focus management (html + body so iOS does not keep scrolling the page behind the panel)
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("no-scroll", open);
    document.body.classList.toggle("no-scroll", open);

    if (open) {
      const nav = document.getElementById("main-nav");
      const firstLink = nav?.querySelector<HTMLAnchorElement>("a.nav-link");
      firstLink?.focus();
    } else {
      menuToggleRef.current?.focus();
    }

    return () => {
      root.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    };
  }, [open]);

  // Close menu on large screens
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 920 && open) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  // Close when clicking outside the nav or toggle on small devices
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: Event) => {
      const nav = document.getElementById('main-nav');
      const toggle = document.querySelector('.menu-toggle');
      const target = e.target as Node | null;
      if (!nav || !toggle || !target) return;
      if (nav.contains(target) || toggle.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('touchstart', onDocClick);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('touchstart', onDocClick);
    };
  }, [open]);

  // Smooth scroll
  const scrollToContent = (
    opts: ScrollIntoViewOptions = { behavior: "smooth" }
  ) => {
    const el = document.getElementById("content");
    if (el) el.scrollIntoView(opts);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeAndScroll = (e?: React.MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault();
    setOpen(false);
    scrollToContent({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      ref={headerRef}
      className={`site-header ${scrolled ? "scrolled" : ""} ${
        open ? "nav-open" : ""
      }`}
      role="banner"
    >
      <div className="header-inner">
        {/* Logo */}
        <a
          href="#content"
          className="logo-link"
          aria-label="Mission World Education home"
          onClick={closeAndScroll}
        >
          <img
            src={Mission_logo}
            alt="Mission World Education Logo"
            className="logo"
          />
          <div className="brand">
            <span className="brand-title">Mission World</span>
            <span className="brand-sub">
              Education & Consultancy
            </span>
          </div>
        </a>

        <nav
          id="main-nav"
          className={`nav ${open ? "open" : ""}`}
          aria-label="Main navigation"
          aria-hidden={isMobileNav ? !open : false}
        >
          <ul className="nav-list">
            <li>
              <a
                className="nav-link"
                href="#content"
                onClick={(e) => {
                  e.preventDefault();
                  closeAndScroll();
                }}
              >
                <span className="nav-icon" aria-hidden>
                  {/* <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 21V12h14v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg> */}
                </span>
                <span className="nav-text">Home</span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="#programs" onClick={() => setOpen(false)}>
                <span className="nav-icon" aria-hidden>
                  {/* <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6h18M3 10h18M7 14h10M7 18h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg> */}
                </span>
                <span className="nav-text">Programs</span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="#about" onClick={() => setOpen(false)}>
                <span className="nav-icon" aria-hidden>
                  {/* <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 20a6 6 0 0 1 12 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg> */}
                </span>
                <span className="nav-text">About</span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="#gallery" onClick={() => setOpen(false)}>
                <span className="nav-icon" aria-hidden>
                  {/* <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 8h.01M21 21l-6-6-4 4-3-3-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg> */}
                </span>
                <span className="nav-text">Gallery</span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="#contact" onClick={() => setOpen(false)}>
                <span className="nav-icon" aria-hidden>
                  {/* <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg> */}
                </span>
                <span className="nav-text">Contact</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="header-cta">
          <a
            href="#contact"
            className="cta-button"
            onClick={() => setOpen(false)}
          >
            Get Started
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="menu-toggle"
          ref={menuToggleRef}
          aria-controls="main-nav"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            {open ? (
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`nav-backdrop ${open ? "visible" : ""}`} 
        onClick={() => setOpen(false)} 
        aria-hidden={!open}
      />
    </header>
  );
}
