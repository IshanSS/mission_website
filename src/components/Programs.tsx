import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
// import Img1 from '../assets/first_image.jpeg'
import Img2 from '../assets/second_image.jpeg'
import Img3 from '../assets/third_image.jpeg'
import Img4 from '../assets/fourth_image.jpeg'
import computerClass from'../assets/computer_class.jpeg'
import germanClass from '../assets/german_class.jpeg'
import programmingClass from '../assets/programming_class.jpeg'
import ieltsClass from '../assets/ielts_class.jpeg'
import careerCounseling from '../assets/career_counsiling.jpeg'

// Minimal local LazyImage used in Programs (keeps file independent)
function LazyImageSmall({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`blur-up ${loaded ? 'loaded' : ''}`}
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(true)}
    />
  )
}

type Program = {
  id: string
  title: string
  summary: string
  duration: string
  fee: string
  image: string
  details: string
  category: string
  level: string
  popular?: boolean
  features: string[]
}

const SAMPLE_PROGRAMS: Program[] = [
  {
    id: 'p1',
    title: 'Computer Courses',
    summary: 'Basic Course, Advance Basic Course, Office Management Course, Graphic Designing Course, Job Oriented Course, Video Editing Course and more.',
    duration: 'Flexible Schedule',
    fee: 'Contact us',
    image: computerClass,
    details: 'Comprehensive hands-on classes covering MS Office Suite, basic troubleshooting, Internet skills, and essential digital literacy. Perfect for students, professionals, and anyone seeking foundational computer skills for personal or professional growth.',
    category: 'Computer & IT',
    level: 'Beginner - Intermediate',
    features: ['MS Office Training', 'Internet Skills', 'Basic Troubleshooting', 'Digital Literacy']
  },
  {
    id: 'p2',
    title: 'Academic Tuition',
    summary: 'School Level, +2 Level, Bachelors Level, Masters Level tuition and Home Tution classes (All Level, All Faculties, All Subjects).',
    duration: 'Flexible Schedule',
    fee: 'Contact us',
    image: Img2,
    details: 'Personalized one-to-one and small-group tuition in Mathematics, Science, Management, and other core subjects. Tailored to school curricula with focused exam preparation and concept reinforcement.',
    category: 'Academic',
    level: 'All Levels',
    features: ['Personalized Attention', 'Exam Preparation', 'Curriculum Alignment', 'Progress Tracking']
  },
  {
    id: 'p3',
    title: 'English Language',
    summary: 'Spoken and written English courses for communication and academic needs (Reading, Writing, Listening and Speaking) and interview preparation classes.',
    duration: '2–6 Months',
    fee: 'Contact us',
    image: Img3,
    details: 'Comprehensive English language courses covering grammar fundamentals, conversational practice, pronunciation refinement, writing skills development, and professional presentation techniques.',
    category: 'Language',
    level: 'Beginner - Intermediate-Advanced',
    popular: true,
    features: ['Grammar & Vocabulary', 'Conversation Practice', 'Writing Skills', 'Pronunciation']
  },
  {
    id: 'p4',
    title: 'Japanese Language',
    summary: 'Beginner to intermediate Japanese for study and work purposes (N5-N3 Level).',
    duration: '3–6 Months',
    fee: 'Contact us',
    image: Img4,
    details: 'Structured Japanese language program covering hiragana/katakana reading, essential grammar, practical vocabulary, and conversational skills. Ideal for study abroad, work opportunities, or cultural interest.',
    category: 'Language',
    level: 'Beginner - Advanced',
    features: ['Hiragana/Katakana', 'Basic Grammar', 'Vocabulary Building', 'Conversation Practice']
  },
  {
    id: 'p5',
    title: 'Bridge Courses',
    summary: 'Preparatory courses for Science, Management, and Nursing programs.',
    duration: '3 Months',
    fee: 'Contact us',
    image: Img2,
    details: 'Intensive preparatory courses designed to smooth the transition from school to collegiate programs. Focused revision and foundational modules to strengthen core concepts and ensure exam readiness.',
    category: 'Academic',
    level: 'Intermediate',
    popular: true,
    features: ['Foundation Building', 'Concept Reinforcement', 'Exam Readiness', 'Smooth Transition']
  },
  {
    id: 'p6',
    title: 'German Language',
    summary: 'German language classes for beginners and travelers (Reading, Writing, Listening and Speaking).',
    duration: '3–9 Months',
    fee: 'Contact us',
    image: germanClass,
    details: 'Practical German language training from A1 to B1 levels, covering essential grammar, everyday conversation, and cultural insights. Perfect for study abroad, work opportunities, or travel preparation.',
    category: 'Language',
    level: 'Beginner - Intermediate',
    features: ['A1-B1 Levels', 'Practical Grammar', 'Cultural Insights', 'Travel Preparation']
  },
  {
    id: 'p7',
    title: 'Programming Classes',
    summary: 'Core programming courses covering C, C++, Java, JavaScript, Flutter and Python languages.',
    duration: '3 Months',
    fee: 'Contact us',
    image: programmingClass,
    details: 'Comprehensive programming education in C, C++, and Java with hands-on projects, data structures introduction, and object-oriented programming principles. Build a solid foundation for software development careers.',
    category: 'Computer & IT',
    level: 'Beginner - Advanced',
    popular: true,
    features: ['C/C++/Java', 'Hands-on Projects', 'Data Structures', 'OOP Principles']
  },
  {
    id: 'p8',
    title: 'IELTS & PTE Prep',
    summary: 'Exam-focused preparation for IELTS and PTE with practice tests.',
    duration: '6–10 Weeks',
    fee: 'Contact us',
    image: ieltsClass,
    details: 'Targeted test preparation focusing on all four modules: listening, reading, writing, and speaking. Regular mock tests with detailed feedback and proven strategies to achieve your desired scores.',
    category: 'Test Preparation',
    level: 'Intermediate - Advanced',
    features: ['All Modules Covered', 'Mock Tests', 'Score Strategies', 'Personal Feedback']
  },
  {
    id: 'p9',
    title: 'CMAT Coaching',
    summary: 'Entrance exam coaching for CMAT aspirants.',
    duration: '6-8 Weeks',
    fee: 'Contact us',
    image: Img3,
    details: 'Comprehensive CMAT preparation covering quantitative ability, logical reasoning, language comprehension, and general awareness. Includes study materials, test series, and expert guidance.',
    category: 'Test Preparation',
    level: 'Intermediate - Advanced',
    features: ['All Sections Covered', 'Study Materials', 'Test Series', 'Expert Guidance']
  },
  {
    id: 'p10',
    title: 'Career Counseling',
    summary: 'Guidance for career choices, study abroad, and visa services.',
    duration: 'Consultation Basis',
    fee: 'Contact us',
    image: careerCounseling,
    details: 'Personalized career counseling and comprehensive support for international education pathways. Expert guidance on course selection, university applications, visa processes, and documentation requirements.',
    category: 'Counseling',
    level: 'All Levels',
    features: ['Career Assessment', 'University Selection', 'Visa Guidance', 'Document Support']
  }
]

const CATEGORIES = ['All', 'Computer & IT', 'Language', 'Academic', 'Test Preparation', 'Counseling']

type ProgramsProps = {
  showHeader?: boolean
}

export default function Programs({ showHeader = true }: ProgramsProps) {
  const [active, setActive] = useState<Program | null>(null)
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal on Escape key and outside click
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Lock body scroll while modal open and focus modal for accessibility
  useEffect(() => {
    if (active) {
      document.body.classList.add('no-scroll')
      // focus modal container for screen readers / keyboard users
      setTimeout(() => modalRef.current?.focus(), 0)
    } else {
      document.body.classList.remove('no-scroll')
    }
    return () => document.body.classList.remove('no-scroll')
  }, [active])

  const filteredPrograms = SAMPLE_PROGRAMS.filter(program => {
    const matchesCategory = filter === 'All' || program.category === filter
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="programs" className="programs-section">
      <div className="programs-container">
        {/* Header */}
        <div className="programs-header">
          <div className="header-content">
            {showHeader && (
              <>
                <h2 className="section-title">Our Programs & Courses</h2>
                <p className="section-subtitle">
                  Transform your future with our comprehensive, industry-relevant courses designed for success
                </p>
              </>
            )}
            <div className="header-decoration">
              <div className="decoration-circle"></div>
              <div className="decoration-circle"></div>
              <div className="decoration-circle"></div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="programs-controls">
          <div className="search-container">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <div className="search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="filters-container">
            <div className="filters-scroll">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  className={`filter-chip ${filter === category ? 'active' : ''}`}
                  onClick={() => setFilter(category)}
                >
                  {category}
                  {filter === category && (
                    <span className="filter-check">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" 
                          strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="programs-grid">
          {filteredPrograms.map((program, index) => (
            <div 
              key={program.id}
              className="program-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-inner">
                {/* Popular Badge */}
                {program.popular && (
                  <div className="popular-tag">
                    <span>🔥 Most Popular</span>
                  </div>
                )}

                {/* Image Section */}
                <div className="card-image">
                  <LazyImageSmall src={program.image} alt={program.title} />
                  <div className="image-overlay">
                    <div className="category-tag">{program.category}</div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="card-title">{program.title}</h3>
                    <p className="card-summary">{program.summary}</p>
                  </div>

                  <div className="card-features">
                    {program.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                    {program.features.length > 2 && (
                      <span className="feature-tag more">
                        +{program.features.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="card-meta">
                    <div className="meta-item">
                      <div className="meta-icon">⏱</div>
                      <span>{program.duration}</span>
                    </div>
                    <div className="meta-item">
                      <div className="meta-icon">🎯</div>
                      <span>{program.level}</span>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="price">{program.fee}</div>
                    <button 
                      className="card-button"
                      onClick={() => setActive(program)}
                    >
                      <span>Learn More</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" 
                          stroke="currentColor" strokeWidth="2" 
                          strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPrograms.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No programs found</h3>
            <p>Try adjusting your search or filters</p>
            <button 
              className="reset-button"
              onClick={() => {
                setFilter('All')
                setSearchTerm('')
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Modal — portaled to document.body so it always appears above the header and scrolls correctly */}
      {active &&
        createPortal(
          <div
            className="program-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="program-modal-title"
            aria-describedby="modal-body"
          >
            <button
              type="button"
              className="modal-backdrop"
              aria-label="Close program details"
              onClick={() => setActive(null)}
            />
            <div
              className="modal-container"
              onClick={(e) => e.stopPropagation()}
              role="document"
            >
              <div
                className="modal-content"
                ref={modalRef}
                tabIndex={-1}
                aria-live="polite"
              >
                <button
                  type="button"
                  className="modal-close"
                  aria-label="Close"
                  onClick={() => setActive(null)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div className="modal-header">
                  <div className="modal-image">
                    <LazyImageSmall src={active.image} alt="" />
                    {active.popular && (
                      <div className="modal-popular-tag">
                        <span>🔥 Most Popular</span>
                      </div>
                    )}
                  </div>
                  <div className="modal-title-section">
                    <div className="modal-category">{active.category}</div>
                    <h2 id="program-modal-title">{active.title}</h2>
                    <p className="modal-summary">{active.summary}</p>
                  </div>
                </div>

                <div id="modal-body" className="modal-body">
                  <div className="modal-highlights">
                    <div className="highlight-item">
                      <div className="highlight-icon" aria-hidden>
                        ⏱
                      </div>
                      <div>
                        <div className="highlight-label">Duration</div>
                        <div className="highlight-value">{active.duration}</div>
                      </div>
                    </div>
                    <div className="highlight-item">
                      <div className="highlight-icon" aria-hidden>
                        🎯
                      </div>
                      <div>
                        <div className="highlight-label">Level</div>
                        <div className="highlight-value">{active.level}</div>
                      </div>
                    </div>
                    <div className="highlight-item">
                      <div className="highlight-icon" aria-hidden>
                        💰
                      </div>
                      <div>
                        <div className="highlight-label">Fee</div>
                        <div className="highlight-value modal-fee">{active.fee}</div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-details">
                    <h3>Course Overview</h3>
                    <p>{active.details}</p>
                  </div>

                  <div className="modal-features">
                    <h3>What You&apos;ll Learn</h3>
                    <div className="features-grid">
                      {active.features.map((feature, index) => (
                        <div key={index} className="feature-item">
                          <div className="feature-check" aria-hidden>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M20 6L9 17L4 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="modal-actions">
                    <a className="action-button primary" href="#contact" onClick={() => setActive(null)}>
                      <span>Apply Now</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                    <a className="action-button secondary" href="#contact" onClick={() => setActive(null)}>
                      <span>📞 Request Info</span>
                    </a>
                    <button type="button" className="action-button outline" onClick={() => setActive(null)}>
                      <span>Browse More</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  )
}