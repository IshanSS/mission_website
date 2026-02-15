export default function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="about-inner">
        <div className="about-header">
          <h2 id="about-title">About Mission World Educational Consultancy</h2>
          <p className="about-subtitle">Empowering futures through quality education, global guidance, and modern training</p>
        </div>

        <div className="about-grid">
          <div className="about-content">
            <div className="mission-vision">
              <div className="mission">
                <h3>Our Mission</h3>
                <p>
                  Our mission is to deliver comprehensive and inclusive knowledge in computer technology, language education,
                  and academic development—empowering learners with the confidence and competence needed to excel in the 21st century.
                </p>
              </div>

              <div className="vision">
                <h3>Our Vision</h3>
                <p>
                  To become a leading educational hub in Banepa and beyond, transforming lives through innovative learning solutions,
                  global language training, modern IT education, and expert career guidance—including pathways for abroad studies.
                </p>
              </div>
            </div>

            <div className="about-text">
              <p>
                At Mission World Educational Consultancy, we believe learning is an essential part of personal growth. Guided by this
                philosophy, we offer high-quality and effective training to individuals as well as corporate professionals. Our center is
                located at Naladobato, the heart of Banepa Valley, making quality education accessible to students from all regions.
              </p>

              <p>
                In today’s fast-growing digital world, computer skills have become a necessity. The demand for IT knowledge, computer
                applications, and digital tools is increasing every day. By choosing the computer field, students open the door to a
                strong, secure, and opportunity-filled future.
              </p>

              <p>
                Mission World has built its reputation by producing highly competent students equipped with modern skills, discipline,
                and values. We provide full support to help learners gain confidence, grow academically, and unlock their true potential.
              </p>

              <p>
                Our institute is operated by experienced, dynamic, and qualified professionals specializing in computer classes, tuition
                classes, and language education—including English, Japanese, Korean, and German. We continuously upgrade our teaching
                methods and course structure to match global standards.
              </p>

              <p>
                Beyond education, Mission World also focuses strongly on <strong>abroad studies</strong>. We guide students for admissions,
                documentation, test preparation, and visa counseling for popular study destinations: <strong>USA, Australia, Canada, Japan,
                Germany, Cyprus, and New Zealand</strong>. Our expert counselors ensure students receive accurate information and reliable
                support throughout their international journey.
              </p>

              <div className="about-highlights">
                <h3>Why Choose Mission World?</h3>
                <ul>
                  <li>Experienced and qualified instructors</li>
                  <li>Modern teaching methodologies and updated curriculum</li>
                  <li>Strong focus on IT training and global language education</li>
                  <li>Professional guidance for abroad studies and documentation</li>
                  <li>Comprehensive academic tuition for all levels</li>
                  <li>Proven track record of student success</li>
                </ul>
              </div>

              <p>
                We are dedicated to helping students build dynamic careers, enhance their abilities, and prepare for a successful future.
                Through quality education and personalized support, we shape individuals into confident, skilled, and globally competitive
                professionals.
              </p>

              <p className="about-cta">
                <strong>"Your Mission, Our Vision"</strong>
              </p>
            </div>
          </div>

          <aside className="about-sidebar">
            <div className="about-card">
              <div className="card-icon">📍</div>
              <h3>Location</h3>
              <p>Naladobato, Banepa Valley</p>
            </div>

            <div className="about-card">
              <div className="card-icon">🎯</div>
              <h3>Our Focus Areas</h3>
              <ul>
                <li>Computer & IT Training</li>
                <li>Language Courses (English, Japanese, German, Korean)</li>
                <li>Academic Tuition Classes</li>
                <li>Exam Preparation (IELTS, PTE, CMAT)</li>
                <li>Career Counseling & Visa Guidance</li>
                <li>Abroad Study Consultation (USA, Australia, Canada, Japan, Germany, Cyprus, New Zealand)</li>
              </ul>
            </div>

            <div className="about-card">
              <div className="card-icon">📞</div>
              <h3>Contact Information</h3>
              <p>
                <a href="mailto:info@mission.edu">info@mission.edu</a>
              </p>
              <p>
                <a href="tel:011662440">011 662440</a>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}