import { useState } from 'react'

export default function Contact() {
  const FORM_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_YOUR_ID' // <- replace

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', applyFor: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle'|'success'|'error'>('idle')

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

    // If endpoint still has placeholder, use mailto fallback so users can still apply
    const isPlaceholder = FORM_ENDPOINT.includes('REPLACE_WITH_YOUR_ID') || FORM_ENDPOINT.trim().length === 0

    try {
      if (isPlaceholder) {
        // mailto fallback
        const subject = encodeURIComponent(`Application from ${form.name}`)
        const bodyLines = [
          `Name: ${form.name}`,
          `Email: ${form.email}`,
          `Phone: ${form.phone}`,
          `Apply For: ${form.applyFor}`,
          '',
          `Message:`,
          form.message
        ]
        const body = encodeURIComponent(bodyLines.join('\n'))
        // open user's email client
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
            // honeypot field - if filled, treat as spam
            homepage: ''
          })
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

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact-inner">
        <h2 id="contact-title">Contact & Apply</h2>
        <p className="contact-sub">Fill the form to ask questions or to apply — we will get back to you shortly.</p>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {/* honeypot */}
          <input type="text" name="homepage" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          <label>
            <span className="label">Full name*</span>
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>

          <label>
            <span className="label">Email*</span>
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>

          <label>
            <span className="label">Phone</span>
            <input name="phone" value={form.phone} onChange={handleChange} />
          </label>

          <label>
            <span className="label">Apply for (program)</span>
            <input name="applyFor" value={form.applyFor} onChange={handleChange} placeholder="e.g. IELTS, Programming Classes" />
          </label>

          <label>
            <span className="label">Message*</span>
            <textarea name="message" value={form.message} onChange={handleChange} rows={5} required />
          </label>

          <div className="contact-actions">
            <button type="submit" className="cta-button" disabled={loading}>
              {loading ? 'Sending…' : 'Send Application'}
            </button>
            <button type="reset" className="reset-button" onClick={() => { setForm({ name: '', email: '', phone: '', message: '', applyFor: '' }); setStatus('idle') }}>
              Reset
            </button>
          </div>

          {status === 'success' && <p className="form-success">Thank you — your application has been submitted.</p>}
          {status === 'error' && <p className="form-error">There was an error. Please check your input or try again later.</p>}
        </form>
      </div>
    </section>
  )
}
// Add address