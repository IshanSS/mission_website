import { useState } from 'react'

export default function Contact() {
  const FORM_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_YOUR_ID'

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', applyFor: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    return form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && form.message.trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      setStatus('error')
      return
    }
    setLoading(true)
    setStatus('idle')

    const isPlaceholder = FORM_ENDPOINT.includes('REPLACE_WITH_YOUR_ID') || FORM_ENDPOINT.trim().length === 0

    try {
      if (isPlaceholder) {
        const subject = encodeURIComponent(`Application from ${form.name}`)
        const bodyLines = [
          `Name: ${form.name}`,
          `Email: ${form.email}`,
          `Phone: ${form.phone}`,
          `Apply For: ${form.applyFor}`,
          '',
          `Message:`,
          form.message,
        ]
        const body = encodeURIComponent(bodyLines.join('\n'))
        window.location.href = `mailto:info@mission.edu?subject=${subject}&body=${body}`
        setStatus('success')
      } else {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: form.message,
            applyFor: form.applyFor,
            _subject: `New application from ${form.name}`,
            homepage: '',
          }),
        })
        if (res.ok) {
          setStatus('success')
          setForm({ name: '', email: '', phone: '', message: '', applyFor: '' })
        } else {
          setStatus('error')
        }
      }
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'mt-1.5 rounded-lg border border-slate-900/10 bg-white px-3 py-2.5 text-[0.95rem] text-slate-900 shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15'

  return (
    <section id="contact" className="px-4 py-9" aria-labelledby="contact-title">
      <div className="mx-auto max-w-[900px] text-left">
        <h2 id="contact-title" className="mb-2 text-2xl font-bold text-slate-900 min-[768px]:text-[1.6rem]">
          Contact & Apply
        </h2>
        <p className="mb-4 text-slate-500">
          Fill the form to ask questions or to apply — we will get back to you shortly.
        </p>

        <form className="mt-4 grid grid-cols-1 gap-3 min-[720px]:grid-cols-2" onSubmit={handleSubmit} noValidate>
          <input type="text" name="homepage" className="hidden" tabIndex={-1} autoComplete="off" />

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-slate-700">Full name*</span>
            <input name="name" value={form.name} onChange={handleChange} required className={inputClass} />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-slate-700">Email*</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-slate-700">Phone</span>
            <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-slate-700">Apply for (program)</span>
            <input
              name="applyFor"
              value={form.applyFor}
              onChange={handleChange}
              placeholder="e.g. IELTS, Programming Classes"
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1 min-[720px]:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Message*</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              required
              className={`${inputClass} resize-y`}
            />
          </label>

          <div className="mt-2 flex flex-col gap-3 min-[720px]:col-span-2 min-[720px]:flex-row min-[720px]:flex-wrap min-[720px]:items-center">
            <button
              type="submit"
              disabled={loading}
              className="focus-ring inline-flex w-full min-[720px]:w-auto items-center justify-center rounded-xl bg-gradient-to-r from-brand to-brand-gold px-5 py-3.5 text-[0.98rem] font-bold text-white shadow-lg shadow-brand/15 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 min-[720px]:min-w-[160px]"
            >
              {loading ? 'Sending…' : 'Send Application'}
            </button>
            <button
              type="button"
              className="focus-ring w-full rounded-xl border border-slate-900/10 bg-transparent px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50 min-[720px]:w-auto"
              onClick={() => {
                setForm({ name: '', email: '', phone: '', message: '', applyFor: '' })
                setStatus('idle')
              }}
            >
              Reset
            </button>
          </div>

          {status === 'success' && (
            <p className="col-span-full mt-2 text-green-700">Thank you — your application has been submitted.</p>
          )}
          {status === 'error' && (
            <p className="col-span-full mt-2 text-red-700">There was an error. Please check your input or try again later.</p>
          )}
        </form>
      </div>
    </section>
  )
}
