import { useState, useEffect, useRef } from "react";
import Mission_logo from "../assets/mission_logo.jpg";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  // ref for the menu toggle so we can return focus on close
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  // Body scroll lock and focus management
  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    
    if (open) {
      // Focus first link when menu opens
      const nav = document.getElementById("main-nav");
      const firstLink = nav?.querySelector<HTMLAnchorElement>("a.nav-link");
      firstLink?.focus();
    } else {
      // when menu closes return focus to the toggle for keyboard users
      menuToggleRef.current?.focus();
    }
    
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  // Close mobile menu when viewport becomes large (prevents stuck open state)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 920 && open) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  // small helper: smooth-scroll to page content
  const scrollToContent = (opts: ScrollIntoViewOptions = { behavior: 'smooth' }) => {
    const el = document.getElementById('content')
    if (el) el.scrollIntoView(opts)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeAndScroll = (e?: React.MouseEvent) => {
    e?.preventDefault()
    setOpen(false)
    scrollToContent({ behavior: 'smooth', block: 'start' } as ScrollIntoViewOptions)
  }

  return (
    <header
      ref={headerRef}
      className={`site-header ${scrolled ? "scrolled" : ""} ${open ? "nav-open" : ""}`}
      role="banner"
    >
      <div className="header-inner">
        {/* Logo */}
        <a 
          href="#content" 
          className="logo-link" 
          aria-label="Mission World Education home" 
          onClick={(e) => closeAndScroll(e)}
        >
          <img 
            src={Mission_logo} 
            alt="Mission World Education Logo" 
            className="logo" 
          />
          <div className="brand">
            <span className="brand-title">Mission World</span>
            <span className="brand-sub">Education & Consultancy</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav 
          id="main-nav" 
          className={`nav ${open ? "open" : ""}`} 
          aria-label="Main navigation"
          aria-hidden={!open}     /* hide from AT when closed on mobile */
        >
          <ul className="nav-list">
            <li>
              <a
                className="nav-link"
                href="#content"
                onClick={(e) => { e.preventDefault(); closeAndScroll(); }}
              >
                Home
              </a>
            </li>
            <li>
              <a className="nav-link" href="#programs" onClick={() => setOpen(false)}>
                Programs
              </a>
            </li>
            <li>
              <a className="nav-link" href="#about" onClick={() => setOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a className="nav-link" href="#gallery" onClick={() => setOpen(false)}>
                Gallery
              </a>
            </li>
            <li>
              <a className="nav-link" href="#contact" onClick={() => setOpen(false)}>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Desktop CTA Button */}
        <div className="header-cta">
          <a href="#contact" className="cta-button" onClick={() => setOpen(false)}>
            Get Started
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
           type="button"
           className="menu-toggle"
           ref={menuToggleRef}
           aria-controls="main-nav"
           aria-expanded={open}
           aria-label={open ? "Close menu" : "Open menu"}
           onClick={() => setOpen(!open)}
         >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              // X icon (close)
              <path 
                d="M6 18L18 6M6 6l12 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            ) : (
              // Hamburger icon (menu)
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