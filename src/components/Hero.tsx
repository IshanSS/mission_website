import HeroImg from '../assets/cover_image.jpeg'

export default function Hero() {
  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-inner">
        <div className="hero-content">
          <p className="hero-eyebrow">Welcome to Mission World Education</p>
          <h1 id="hero-title" className="hero-title">
            Your Gateway to the Future
          </h1>
          <p className="hero-sub">
            At Mission World Education, we empower students through expert
            guidance, high-quality programs, and a supportive learning community
            designed to help them reach their potential.
          </p>

          <div className="hero-actions">
            <button className="cta-button">Get Started</button>
            <a className="secondary-link" href="#">
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
