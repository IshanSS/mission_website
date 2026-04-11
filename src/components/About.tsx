export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-[1200px] px-4 py-12 min-[768px]:px-8 min-[768px]:py-16 min-[1024px]:py-20"
      aria-labelledby="about-title"
    >
      <div className="w-full">
        <header className="mb-10 text-center min-[1024px]:mb-16">
          <h2 id="about-title" className="mb-2 text-2xl font-bold text-slate-900 min-[768px]:text-3xl min-[1024px]:text-4xl">
            About Mission World Educational Consultancy
          </h2>
          <p className="mx-auto mt-2 max-w-3xl text-lg font-medium leading-relaxed text-slate-500 min-[768px]:text-xl">
            Empowering futures through quality education, global guidance, and modern training
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10 min-[1024px]:grid-cols-[2fr_1fr] min-[1024px]:gap-16">
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-6 min-[768px]:grid-cols-2">
              <div className="rounded-xl border border-brand/10 bg-white/80 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <h3 className="mb-3 text-lg font-semibold text-brand">Our Mission</h3>
                <p className="m-0 leading-relaxed text-slate-600">
                  Our mission is to deliver comprehensive and inclusive knowledge in computer technology, language
                  education, and academic development—empowering learners with the confidence and competence needed to
                  excel in the 21st century.
                </p>
              </div>
              <div className="rounded-xl border border-brand/10 bg-white/80 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <h3 className="mb-3 text-lg font-semibold text-brand">Our Vision</h3>
                <p className="m-0 leading-relaxed text-slate-600">
                  To become a leading educational hub in Banepa and beyond, transforming lives through innovative
                  learning solutions, global language training, modern IT education, and expert career
                  guidance—including pathways for abroad studies.
                </p>
              </div>
            </div>

            <div className="text-slate-700">
              <p className="mb-6 text-[1.05rem] leading-relaxed">
                At Mission World Educational Consultancy, we believe learning is an essential part of personal growth.
                Guided by this philosophy, we offer high-quality and effective training to individuals as well as
                corporate professionals. Our center is located at Naladobato, the heart of Banepa Valley, making quality
                education accessible to students from all regions.
              </p>
              <p className="mb-6 text-[1.05rem] leading-relaxed">
                In today’s fast-growing digital world, computer skills have become a necessity. The demand for IT
                knowledge, computer applications, and digital tools is increasing every day. By choosing the computer
                field, students open the door to a strong, secure, and opportunity-filled future.
              </p>
              <p className="mb-6 text-[1.05rem] leading-relaxed">
                Mission World has built its reputation by producing highly competent students equipped with modern
                skills, discipline, and values. We provide full support to help learners gain confidence, grow
                academically, and unlock their true potential.
              </p>
              <p className="mb-6 text-[1.05rem] leading-relaxed">
                Our institute is operated by experienced, dynamic, and qualified professionals specializing in computer
                classes, tuition classes, and language education—including English, Japanese, Korean, and German. We
                continuously upgrade our teaching methods and course structure to match global standards.
              </p>
              <p className="mb-6 text-[1.05rem] leading-relaxed">
                Beyond education, Mission World also focuses strongly on <strong className="text-slate-900">abroad studies</strong>. We guide students for
                admissions, documentation, test preparation, and visa counseling for popular study destinations:{" "}
                <strong className="text-slate-900">
                  USA, Australia, Canada, Japan, Germany, Cyprus, and New Zealand
                </strong>
                . Our expert counselors ensure students receive accurate information and reliable support throughout
                their international journey.
              </p>

              <div className="my-6 rounded-xl border-l-4 border-brand bg-brand/[0.05] p-6 transition hover:translate-x-1">
                <h3 className="mt-0 text-xl font-semibold text-slate-900">Why Choose Mission World?</h3>
                <ul className="mb-0 list-disc space-y-2 pl-6 text-slate-600">
                  <li>Experienced and qualified instructors</li>
                  <li>Modern teaching methodologies and updated curriculum</li>
                  <li>Strong focus on IT training and global language education</li>
                  <li>Professional guidance for abroad studies and documentation</li>
                  <li>Comprehensive academic tuition for all levels</li>
                  <li>Proven track record of student success</li>
                </ul>
              </div>

              <p className="mb-6 text-[1.05rem] leading-relaxed">
                We are dedicated to helping students build dynamic careers, enhance their abilities, and prepare for a
                successful future. Through quality education and personalized support, we shape individuals into
                confident, skilled, and globally competitive professionals.
              </p>

              <p className="rounded-xl border border-brand/20 bg-brand/[0.08] p-6 text-center text-lg font-medium italic text-slate-900">
                <strong>&quot;Your Mission, Our Vision&quot;</strong>
              </p>
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-xl border border-brand/10 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-brand-gold" aria-hidden />
              <div className="mb-3 inline-block rounded-lg bg-brand/10 p-2 text-2xl">📍</div>
              <h3 className="mb-3 text-lg font-semibold text-slate-900">Location</h3>
              <p className="m-0 text-slate-600">Naladobato, Banepa Valley</p>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-brand/10 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-brand-gold" aria-hidden />
              <div className="mb-3 inline-block rounded-lg bg-brand/10 p-2 text-2xl">🎯</div>
              <h3 className="mb-3 text-lg font-semibold text-slate-900">Our Focus Areas</h3>
              <ul className="m-0 list-disc space-y-2 pl-5 text-slate-600">
                <li>Computer & IT Training</li>
                <li>Language Courses (English, Japanese, German, Korean)</li>
                <li>Academic Tuition Classes</li>
                <li>Exam Preparation (IELTS, PTE, CMAT)</li>
                <li>Career Counseling & Visa Guidance</li>
                <li>Abroad Study Consultation (USA, Australia, Canada, Japan, Germany, Cyprus, New Zealand)</li>
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-brand/10 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-brand-gold" aria-hidden />
              <div className="mb-3 inline-block rounded-lg bg-brand/10 p-2 text-2xl">📞</div>
              <h3 className="mb-3 text-lg font-semibold text-slate-900">Contact Information</h3>
              <p className="m-0">
                <a href="mailto:info@mission.edu" className="font-medium text-brand no-underline hover:underline">
                  info@mission.edu
                </a>
              </p>
              <p className="mt-2 m-0">
                <a href="tel:011662440" className="font-medium text-brand no-underline hover:underline">
                  011 662440
                </a>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
