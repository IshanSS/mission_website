import HeroImg from '../assets/cover_image.jpeg'

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[60vh] w-screen max-w-[100vw] items-center justify-center overflow-hidden bg-slate-900 bg-cover bg-center py-12 text-white min-[921px]:min-h-[70vh] min-[921px]:py-16"
      style={{
        backgroundImage: `linear-gradient(180deg,rgba(0,0,0,0.4),rgba(0,0,0,0.65)),url(${HeroImg})`,
      }}
      aria-labelledby="hero-title"
    >
      <div className="relative z-[1] mx-auto max-w-[1100px] px-5 text-center">
        <p className="mb-2 inline-block rounded-full bg-black/70 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-widest text-green-500">
          Welcome to Mission World Education
        </p>
        <h1
          id="hero-title"
          className="my-2 text-[clamp(1.65rem,4.5vw,2.75rem)] font-extrabold leading-tight text-white drop-shadow-md"
        >
          Your Gateway to the Future
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-[clamp(0.95rem,2vw,1.1rem)] leading-relaxed text-white/90">
          At Mission World Education, we empower students through expert guidance, high-quality programs,
          and a supportive learning community designed to help them reach their potential.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="focus-ring rounded-2xl bg-gradient-to-r from-brand to-brand-gold px-7 py-3.5 text-base font-bold text-white shadow-xl shadow-brand/20 transition hover:-translate-y-0.5 hover:saturate-105"
          >
            Get Started
          </button>
          <a
            className="focus-ring relative pb-0.5 font-semibold text-white no-underline after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom after:scale-x-0 after:bg-brand after:transition after:content-[''] hover:after:scale-x-100"
            href="#programs"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  )
}
