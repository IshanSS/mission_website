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

  useEffect(() => {
    if (!headerRef.current) return;
    const measure = () => {
      const h = Math.ceil(headerRef.current!.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--header-height", `${h}px`);

      const nav = document.getElementById("main-nav");
      if (open && nav) {
        const items = Array.from(nav.querySelectorAll(".nav-list > li")) as HTMLElement[];
        let total = 0;
        if (items.length) {
          for (const it of items) {
            const r = it.getBoundingClientRect();
            const s = window.getComputedStyle(it);
            const mt = parseFloat(s.marginTop || "0") || 0;
            const mb = parseFloat(s.marginBottom || "0") || 0;
            total += Math.ceil(r.height + mt + mb);
          }
        } else {
          total = Math.ceil(nav.getBoundingClientRect().height);
        }

        const vh =
          window.innerHeight -
          (headerRef.current ? Math.ceil(headerRef.current.getBoundingClientRect().height) : 0);
        const panelH = Math.min(total + 16, Math.max(0, vh));
        document.documentElement.style.setProperty("--nav-panel-height", `${panelH}px`);
      } else {
        document.documentElement.style.setProperty("--nav-panel-height", `0px`);
      }
    };

    requestAnimationFrame(() => {
      measure();
      const t = setTimeout(measure, 80);
      return () => clearTimeout(t);
    });
  }, [open]);

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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 920 && open) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: Event) => {
      const nav = document.getElementById("main-nav");
      const toggle = document.getElementById("menu-toggle");
      const target = e.target as Node | null;
      if (!nav || !toggle || !target) return;
      if (nav.contains(target) || toggle.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, [open]);

  const scrollToContent = (opts: ScrollIntoViewOptions = { behavior: "smooth" }) => {
    const el = document.getElementById("content");
    if (el) el.scrollIntoView(opts);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeAndScroll = (e?: React.MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault();
    setOpen(false);
    scrollToContent({ behavior: "smooth", block: "start" });
  };

  const linkBase =
    "inline-flex items-center gap-3 rounded-xl px-4 py-3 text-center font-semibold text-slate-700 transition min-[921px]:inline-block min-[921px]:rounded-full min-[921px]:px-[0.65rem] min-[921px]:py-[0.45rem] min-[921px]:text-[0.95rem] hover:bg-brand/[0.08] hover:text-brand focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-brand/25 focus-visible:outline-offset-2 max-[920px]:w-full max-[920px]:justify-start max-[920px]:text-left";

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-[1200] border-b border-slate-900/5 bg-white/95 backdrop-blur-md transition-[padding,box-shadow] duration-200 ${
        scrolled ? "shadow-md shadow-slate-900/5 py-1" : "py-2"
      } ${open ? "bg-white/98" : ""}`}
      role="banner"
    >
      <div className="relative mx-auto flex min-h-[52px] max-w-[1200px] items-center justify-between gap-3 px-3 min-[921px]:min-h-12 min-[921px]:px-3">
        <a
          href="#content"
          className="focus-ring relative z-[1250] flex items-center gap-2.5 no-underline text-inherit"
          aria-label="Mission World Education home"
          onClick={closeAndScroll}
        >
          <img
            src={Mission_logo}
            alt="Mission World Education Logo"
            className="h-9 w-auto min-[921px]:h-8 max-[520px]:h-8"
          />
          <div className="flex flex-col text-left leading-none">
            <span className="text-[0.95rem] font-extrabold text-slate-900 min-[921px]:text-[1.05rem]">
              Mission World
            </span>
            <span className="mt-0.5 text-[0.75rem] text-slate-500 max-[520px]:hidden">
              Education & Consultancy
            </span>
          </div>
        </a>

        <nav
          id="main-nav"
          className={[
            "flex flex-1 justify-center min-[921px]:relative min-[921px]:flex min-[921px]:flex-row",
            "max-[920px]:fixed max-[920px]:left-0 max-[920px]:right-0 max-[920px]:top-[var(--header-height)] max-[920px]:z-[1403] max-[920px]:max-h-[calc(100vh-var(--header-height))] max-[920px]:touch-pan-y max-[920px]:flex-col max-[920px]:overflow-y-auto max-[920px]:bg-transparent max-[920px]:p-2 max-[920px]:shadow-none",
            open ? "max-[920px]:flex" : "max-[920px]:hidden",
          ].join(" ")}
          aria-label="Main navigation"
          aria-hidden={isMobileNav ? !open : false}
        >
          <ul className="m-0 flex list-none flex-row flex-wrap items-center justify-center gap-2 p-0 min-[921px]:gap-2 max-[920px]:mx-auto max-[920px]:mt-0 max-[920px]:w-full max-[920px]:max-w-lg max-[920px]:flex-col max-[920px]:flex-nowrap max-[920px]:gap-0 max-[920px]:overflow-y-auto max-[920px]:rounded-xl max-[920px]:bg-white max-[920px]:p-2 max-[920px]:shadow-lg max-[920px]:max-h-[calc(100vh-var(--header-height)-16px)]">
            <li className="max-[920px]:w-full max-[920px]:border-b max-[920px]:border-slate-100 max-[920px]:last:border-b-0">
              <a className={`nav-link ${linkBase}`} href="#content" onClick={(e) => { e.preventDefault(); closeAndScroll(); }}>
                <span className="nav-text">Home</span>
              </a>
            </li>
            <li className="max-[920px]:w-full max-[920px]:border-b max-[920px]:border-slate-100 max-[920px]:last:border-b-0">
              <a className={`nav-link ${linkBase}`} href="#programs" onClick={() => setOpen(false)}>
                <span className="nav-text">Programs</span>
              </a>
            </li>
            <li className="max-[920px]:w-full max-[920px]:border-b max-[920px]:border-slate-100 max-[920px]:last:border-b-0">
              <a className={`nav-link ${linkBase}`} href="#about" onClick={() => setOpen(false)}>
                <span className="nav-text">About</span>
              </a>
            </li>
            <li className="max-[920px]:w-full max-[920px]:border-b max-[920px]:border-slate-100 max-[920px]:last:border-b-0">
              <a className={`nav-link ${linkBase}`} href="#gallery" onClick={() => setOpen(false)}>
                <span className="nav-text">Gallery</span>
              </a>
            </li>
            <li className="max-[920px]:w-full max-[920px]:border-b max-[920px]:border-slate-100 max-[920px]:last:border-b-0">
              <a className={`nav-link ${linkBase}`} href="#contact" onClick={() => setOpen(false)}>
                <span className="nav-text">Contact</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="ml-2 hidden min-[921px]:block">
          <a
            href="#contact"
            className="focus-ring inline-block rounded-xl bg-gradient-to-r from-brand to-brand-gold px-4 py-2 text-sm font-bold text-white shadow-md shadow-brand/15 no-underline transition hover:-translate-y-0.5 hover:shadow-lg"
            onClick={() => setOpen(false)}
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          id="menu-toggle"
          className="focus-ring absolute right-3 top-1/2 z-[1405] inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-lg border border-slate-900/10 bg-white/95 p-2 text-slate-700 shadow-md min-[921px]:hidden"
          ref={menuToggleRef}
          aria-controls="main-nav"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

      <div
        className={`fixed inset-x-0 bottom-0 z-[1402] bg-slate-900/45 max-[920px]:top-[var(--header-height)] min-[921px]:hidden ${open ? "block" : "hidden"}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
    </header>
  );
}
