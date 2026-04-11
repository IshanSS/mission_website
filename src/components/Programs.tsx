import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Img2 from '../assets/second_image.jpeg'
import Img3 from '../assets/third_image.jpeg'
import Img4 from '../assets/fourth_image.jpeg'
import computerClass from '../assets/computer_class.jpeg'
import germanClass from '../assets/german_class.jpeg'
import programmingClass from '../assets/programming_class.jpeg'
import ieltsClass from '../assets/ielts_class.jpeg'
import careerCounseling from '../assets/career_counsiling.jpeg'

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
    summary:
      'Basic Course, Advance Basic Course, Office Management Course, Graphic Designing Course, Job Oriented Course, Video Editing Course and more.',
    duration: 'Flexible Schedule',
    fee: 'Contact us',
    image: computerClass,
    details:
      'Comprehensive hands-on classes covering MS Office Suite, basic troubleshooting, Internet skills, and essential digital literacy. Perfect for students, professionals, and anyone seeking foundational computer skills for personal or professional growth.',
    category: 'Computer & IT',
    level: 'Beginner - Intermediate',
    features: ['MS Office Training', 'Internet Skills', 'Basic Troubleshooting', 'Digital Literacy'],
  },
  {
    id: 'p2',
    title: 'Academic Tuition',
    summary:
      'School Level, +2 Level, Bachelors Level, Masters Level tuition and Home Tution classes (All Level, All Faculties, All Subjects).',
    duration: 'Flexible Schedule',
    fee: 'Contact us',
    image: Img2,
    details:
      'Personalized one-to-one and small-group tuition in Mathematics, Science, Management, and other core subjects. Tailored to school curricula with focused exam preparation and concept reinforcement.',
    category: 'Academic',
    level: 'All Levels',
    features: ['Personalized Attention', 'Exam Preparation', 'Curriculum Alignment', 'Progress Tracking'],
  },
  {
    id: 'p3',
    title: 'English Language',
    summary:
      'Spoken and written English courses for communication and academic needs (Reading, Writing, Listening and Speaking) and interview preparation classes.',
    duration: '2–6 Months',
    fee: 'Contact us',
    image: Img3,
    details:
      'Comprehensive English language courses covering grammar fundamentals, conversational practice, pronunciation refinement, writing skills development, and professional presentation techniques.',
    category: 'Language',
    level: 'Beginner - Intermediate-Advanced',
    popular: true,
    features: ['Grammar & Vocabulary', 'Conversation Practice', 'Writing Skills', 'Pronunciation'],
  },
  {
    id: 'p4',
    title: 'Japanese Language',
    summary: 'Beginner to intermediate Japanese for study and work purposes (N5-N3 Level).',
    duration: '3–6 Months',
    fee: 'Contact us',
    image: Img4,
    details:
      'Structured Japanese language program covering hiragana/katakana reading, essential grammar, practical vocabulary, and conversational skills. Ideal for study abroad, work opportunities, or cultural interest.',
    category: 'Language',
    level: 'Beginner - Advanced',
    features: ['Hiragana/Katakana', 'Basic Grammar', 'Vocabulary Building', 'Conversation Practice'],
  },
  {
    id: 'p5',
    title: 'Bridge Courses',
    summary: 'Preparatory courses for Science, Management, and Nursing programs.',
    duration: '3 Months',
    fee: 'Contact us',
    image: Img2,
    details:
      'Intensive preparatory courses designed to smooth the transition from school to collegiate programs. Focused revision and foundational modules to strengthen core concepts and ensure exam readiness.',
    category: 'Academic',
    level: 'Intermediate',
    popular: true,
    features: ['Foundation Building', 'Concept Reinforcement', 'Exam Readiness', 'Smooth Transition'],
  },
  {
    id: 'p6',
    title: 'German Language',
    summary: 'German language classes for beginners and travelers (Reading, Writing, Listening and Speaking).',
    duration: '3–9 Months',
    fee: 'Contact us',
    image: germanClass,
    details:
      'Practical German language training from A1 to B1 levels, covering essential grammar, everyday conversation, and cultural insights. Perfect for study abroad, work opportunities, or travel preparation.',
    category: 'Language',
    level: 'Beginner - Intermediate',
    features: ['A1-B1 Levels', 'Practical Grammar', 'Cultural Insights', 'Travel Preparation'],
  },
  {
    id: 'p7',
    title: 'Programming Classes',
    summary: 'Core programming courses covering C, C++, Java, JavaScript, Flutter and Python languages.',
    duration: '3 Months',
    fee: 'Contact us',
    image: programmingClass,
    details:
      'Comprehensive programming education in C, C++, and Java with hands-on projects, data structures introduction, and object-oriented programming principles. Build a solid foundation for software development careers.',
    category: 'Computer & IT',
    level: 'Beginner - Advanced',
    popular: true,
    features: ['C/C++/Java', 'Hands-on Projects', 'Data Structures', 'OOP Principles'],
  },
  {
    id: 'p8',
    title: 'IELTS & PTE Prep',
    summary: 'Exam-focused preparation for IELTS and PTE with practice tests.',
    duration: '6–10 Weeks',
    fee: 'Contact us',
    image: ieltsClass,
    details:
      'Targeted test preparation focusing on all four modules: listening, reading, writing, and speaking. Regular mock tests with detailed feedback and proven strategies to achieve your desired scores.',
    category: 'Test Preparation',
    level: 'Intermediate - Advanced',
    features: ['All Modules Covered', 'Mock Tests', 'Score Strategies', 'Personal Feedback'],
  },
  {
    id: 'p9',
    title: 'CMAT Coaching',
    summary: 'Entrance exam coaching for CMAT aspirants.',
    duration: '6-8 Weeks',
    fee: 'Contact us',
    image: Img3,
    details:
      'Comprehensive CMAT preparation covering quantitative ability, logical reasoning, language comprehension, and general awareness. Includes study materials, test series, and expert guidance.',
    category: 'Test Preparation',
    level: 'Intermediate - Advanced',
    features: ['All Sections Covered', 'Study Materials', 'Test Series', 'Expert Guidance'],
  },
  {
    id: 'p10',
    title: 'Career Counseling',
    summary: 'Guidance for career choices, study abroad, and visa services.',
    duration: 'Consultation Basis',
    fee: 'Contact us',
    image: careerCounseling,
    details:
      'Personalized career counseling and comprehensive support for international education pathways. Expert guidance on course selection, university applications, visa processes, and documentation requirements.',
    category: 'Counseling',
    level: 'All Levels',
    features: ['Career Assessment', 'University Selection', 'Visa Guidance', 'Document Support'],
  },
]

const CATEGORIES = ['All', 'Computer & IT', 'Language', 'Academic', 'Test Preparation', 'Counseling']

type ProgramsProps = {
  showHeader?: boolean
}

const chipBase =
  'inline-flex items-center gap-2 rounded-full border-2 px-5 py-3 text-sm font-medium transition max-[520px]:px-4 max-[520px]:py-2.5 max-[520px]:text-[0.85rem]'
const actionBtn =
  'inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-4 py-2.5 text-sm font-bold transition focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-brand/25 focus-visible:outline-offset-2'

export default function Programs({ showHeader = true }: ProgramsProps) {
  const [active, setActive] = useState<Program | null>(null)
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (active) {
      root.classList.add('no-scroll')
      document.body.classList.add('no-scroll')
      setTimeout(() => modalRef.current?.focus(), 0)
    } else {
      root.classList.remove('no-scroll')
      document.body.classList.remove('no-scroll')
    }
    return () => {
      root.classList.remove('no-scroll')
      document.body.classList.remove('no-scroll')
    }
  }, [active])

  const filteredPrograms = SAMPLE_PROGRAMS.filter((program) => {
    const matchesCategory = filter === 'All' || program.category === filter
    const matchesSearch =
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section
      id="programs"
      className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 py-[clamp(2.5rem,6vw,5rem)] px-[clamp(0.75rem,3vw,1.25rem)]"
    >
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-[min(400px,55vw)] bg-gradient-to-br from-brand to-brand-gold [clip-path:polygon(0_0,100%_0,100%_70%,0_100%)]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto max-w-[1400px]">
        <div className="relative mb-10 text-center min-[768px]:mb-16">
          <div className="relative z-[2]">
            {showHeader && (
              <>
                <h2 className="mb-3 bg-gradient-to-br from-white to-sky-50 bg-clip-text px-1 text-[clamp(1.75rem,5vw,3.25rem)] font-extrabold leading-tight text-transparent">
                  Our Programs & Courses
                </h2>
                <p className="mx-auto mb-8 max-w-2xl px-2 text-[clamp(0.95rem,2.4vw,1.2rem)] font-medium leading-relaxed text-white/90">
                  Transform your future with our comprehensive, industry-relevant courses designed for success
                </p>
              </>
            )}
            <div className="mt-8 flex justify-center gap-4" aria-hidden>
              <span className="h-3 w-3 rounded-full bg-white/60" />
              <span className="h-3 w-3 rounded-full bg-white/80" />
              <span className="h-3 w-3 rounded-full bg-white/60" />
            </div>
          </div>
        </div>

        <div className="mb-10 rounded-3xl border border-white/20 bg-white/95 p-[clamp(1rem,4vw,2rem)] shadow-xl shadow-slate-900/10 backdrop-blur-xl min-[768px]:mb-12">
          <div className="relative mx-auto mb-6 max-w-md">
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border-2 border-slate-200 bg-white/80 py-4 pl-12 pr-4 text-base text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand/10"
            />
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`${chipBase} ${
                    filter === category
                      ? 'border-transparent bg-gradient-to-r from-brand to-brand-gold text-white shadow-md shadow-brand/25'
                      : 'border-slate-200 bg-white/60 text-slate-500 hover:border-brand hover:text-brand'
                  }`}
                  onClick={() => setFilter(category)}
                >
                  {category}
                  {filter === category && (
                    <span className="flex items-center" aria-hidden>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 min-[640px]:grid-cols-2 min-[1200px]:grid-cols-3 min-[1400px]:gap-8">
          {filteredPrograms.map((program, index) => (
            <div
              key={program.id}
              className="opacity-0 [animation:slide-up-card_0.6s_ease_forwards]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/30 bg-white/95 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/10">
                {program.popular && (
                  <div className="absolute right-4 top-4 z-[2] rounded-full bg-gradient-to-r from-brand-gold to-brand px-3 py-1.5 text-xs font-bold text-white shadow-md">
                    <span>🔥 Most Popular</span>
                  </div>
                )}
                <div className="relative h-[200px] overflow-hidden">
                  <LazyImageSmall src={program.image} alt={program.title} />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent p-4">
                    <span className="rounded-xl bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand backdrop-blur-md">
                      {program.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4">
                    <h3 className="mb-2 text-xl font-bold text-slate-800">{program.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-500">{program.summary}</p>
                  </div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {program.features.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="rounded-xl bg-orange-100/80 px-3 py-1 text-xs font-semibold text-brand"
                      >
                        {feature}
                      </span>
                    ))}
                    {program.features.length > 2 && (
                      <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                        +{program.features.length - 2} more
                      </span>
                    )}
                  </div>
                  <div className="mb-6 flex flex-wrap gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <span aria-hidden>⏱</span>
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span aria-hidden>🎯</span>
                      <span>{program.level}</span>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <span className="text-lg font-bold text-brand">{program.fee}</span>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-gold px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brand/25 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-brand/30"
                      onClick={() => setActive(program)}
                    >
                      <span>Learn More</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="rounded-3xl border border-white/30 bg-white/90 p-12 text-center shadow-lg backdrop-blur-xl">
            <div className="mb-4 text-5xl" aria-hidden>
              🔍
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-800">No programs found</h3>
            <p className="mb-8 text-slate-500">Try adjusting your search or filters</p>
            <button
              type="button"
              className="rounded-xl bg-gradient-to-r from-brand to-brand-gold px-8 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5"
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

      {active &&
        createPortal(
          <div
            className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/45 p-3 max-[720px]:items-stretch max-[720px]:p-2"
            role="dialog"
            aria-modal="true"
            aria-labelledby="program-modal-title"
            aria-describedby="modal-body"
          >
            <button
              type="button"
              className="absolute inset-0 z-[1] block h-full w-full cursor-pointer border-0 bg-black/50 p-0 backdrop-blur-sm"
              aria-label="Close program details"
              onClick={() => setActive(null)}
            />
            <div
              className="relative z-[2] flex max-h-[calc(100vh-2rem)] w-full max-w-[1100px] flex-col overflow-hidden rounded-2xl shadow-2xl max-[720px]:max-h-screen max-[720px]:max-w-full max-[720px]:rounded-xl"
              onClick={(e) => e.stopPropagation()}
              role="document"
            >
              <div
                className="relative flex max-h-full flex-col overflow-hidden rounded-[inherit] bg-white/98 shadow-2xl backdrop-blur-xl [animation:modal-pop_0.35s_cubic-bezier(0.4,0,0.2,1)] max-[720px]:h-screen max-[720px]:rounded-xl"
                ref={modalRef}
                tabIndex={-1}
                aria-live="polite"
              >
                <button
                  type="button"
                  className="focus-ring absolute right-3 top-3 z-[5] inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-900/10 bg-white/95 text-slate-700 shadow-md min-[1200px]:right-[18px] min-[1200px]:top-[18px] min-[1200px]:h-12 min-[1200px]:w-12"
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

                <div className="grid grid-cols-1 min-[1024px]:grid-cols-[360px_1fr] min-[1200px]:grid-cols-[420px_1fr]">
                  <div className="relative min-h-[200px] overflow-hidden min-[1024px]:min-h-[220px]">
                    <LazyImageSmall src={active.image} alt="" />
                    {active.popular && (
                      <div className="absolute left-4 top-4 z-[2] rounded-full bg-gradient-to-r from-brand-gold to-brand px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                        <span>🔥 Most Popular</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center gap-2 px-6 py-5 min-[1200px]:px-9 min-[1200px]:py-8">
                    <span className="inline-flex w-fit rounded-full bg-brand/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-brand">
                      {active.category}
                    </span>
                    <h2 id="program-modal-title" className="text-xl font-extrabold text-slate-900 min-[1200px]:text-[1.65rem]">
                      {active.title}
                    </h2>
                    <p className="text-[0.95rem] leading-relaxed text-slate-500">{active.summary}</p>
                  </div>
                </div>

                <div
                  id="modal-body"
                  className="max-h-[calc(100vh-320px)] overflow-y-auto overscroll-contain px-5 py-5 min-[1024px]:max-h-[calc(100vh-280px)] min-[1200px]:max-h-[min(60vh,calc(100vh-420px))] min-[1200px]:px-9 min-[1200px]:py-7 max-[720px]:max-h-[calc(100vh-280px)] max-[720px]:px-4 max-[720px]:py-4"
                >
                  <div className="mb-5 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
                    {[
                      { icon: '⏱', label: 'Duration', value: active.duration },
                      { icon: '🎯', label: 'Level', value: active.level },
                      { icon: '💰', label: 'Fee', value: active.fee, accent: true },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex gap-3 rounded-xl border border-slate-900/5 bg-slate-50 px-3 py-3"
                      >
                        <span className="text-lg leading-none" aria-hidden>
                          {row.icon}
                        </span>
                        <div>
                          <div className="mb-0.5 text-[0.7rem] font-bold uppercase tracking-wide text-slate-400">
                            {row.label}
                          </div>
                          <div
                            className={`text-sm font-semibold ${row.accent ? 'text-brand' : 'text-slate-800'}`}
                          >
                            {row.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-2 text-base font-bold text-slate-900">Course Overview</h3>
                    <p className="m-0 text-[0.95rem] leading-relaxed text-slate-600">{active.details}</p>
                  </div>

                  <div className="mb-4">
                    <h3 className="mb-2 text-base font-bold text-slate-900">What You&apos;ll Learn</h3>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,200px),1fr))] gap-2">
                      {active.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 rounded-lg bg-brand/[0.06] px-3 py-2 text-sm text-slate-700"
                        >
                          <span className="mt-0.5 shrink-0 text-brand" aria-hidden>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M20 6L9 17L4 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 border-t border-slate-900/5 pt-4 max-[720px]:flex-col">
                    <a
                      className={`${actionBtn} bg-gradient-to-r from-brand to-brand-gold text-white shadow-lg shadow-brand/20 hover:-translate-y-0.5 max-[720px]:w-full`}
                      href="#contact"
                      onClick={() => setActive(null)}
                    >
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
                    <a
                      className={`${actionBtn} border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200 max-[720px]:w-full`}
                      href="#contact"
                      onClick={() => setActive(null)}
                    >
                      <span>📞 Request Info</span>
                    </a>
                    <button
                      type="button"
                      className={`${actionBtn} border-2 border-slate-900/10 bg-transparent text-slate-600 hover:bg-slate-50 max-[720px]:w-full`}
                      onClick={() => setActive(null)}
                    >
                      Browse More
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
