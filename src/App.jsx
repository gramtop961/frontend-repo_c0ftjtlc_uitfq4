import { useState } from 'react'

function App() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '' })
  const [status, setStatus] = useState({ loading: false, success: null, error: null })

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: null, error: null })
    try {
      const res = await fetch(`${backend}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to send message')
      const data = await res.json()
      if (data.success) {
        setStatus({ loading: false, success: 'Thanks! We will be in touch shortly.', error: null })
        setForm({ name: '', email: '', company: '', service: '', budget: '', message: '' })
      } else {
        throw new Error('Something went wrong')
      }
    } catch (err) {
      setStatus({ loading: false, success: null, error: err.message })
    }
  }

  const services = [
    { title: 'Brand Strategy', desc: 'Positioning, messaging, and visual identity that set you apart.' },
    { title: 'Web Design', desc: 'High-converting, responsive websites crafted for your audience.' },
    { title: 'Product Design', desc: 'End-to-end UX/UI for delightful digital products and apps.' },
    { title: 'Growth Marketing', desc: 'Performance campaigns, SEO, and analytics to fuel growth.' },
  ]

  const projects = [
    { title: 'SaaS Dashboard', tag: 'Product', img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Lifestyle Brand', tag: 'Branding', img: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Ecommerce Store', tag: 'Web', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop' },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-20 backdrop-blur bg-white/70 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="font-extrabold text-xl">Flames Agency</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-blue-600">Services</a>
            <a href="#work" className="hover:text-blue-600">Work</a>
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#contact" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-24 bg-gradient-to-b from-blue-50/60 to-transparent">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              We craft digital experiences that drive growth
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl">
              A full-service creative and product studio helping ambitious teams launch brands, build products, and scale results.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#contact" className="px-5 py-3 rounded bg-blue-600 text-white hover:bg-blue-700">Start a project</a>
              <a href="#work" className="px-5 py-3 rounded border border-gray-300 hover:border-gray-400">See our work</a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTdHVkaW98ZW58MHwwfHx8MTc2MjkyMTc1OXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Studio" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="py-10 border-y border-gray-100 bg-white/50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-6 gap-6 items-center opacity-70">
          {['Acme','Vertex','North','Apex','Pulse','Nimbus'].map((l) => (
            <div key={l} className="text-center font-semibold text-gray-500">{l}</div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold">What we do</h2>
          <p className="text-gray-600 mt-2 max-w-2xl">Strategy, design, and growth services tailored to your stage.</p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.title} className="p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow bg-white">
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Selected work</h2>
              <p className="text-gray-600 mt-2">A snapshot of recent projects.</p>
            </div>
            <a href="#contact" className="hidden md:inline-block px-4 py-2 rounded border border-gray-300 hover:border-gray-400">Work with us</a>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.title} className="group rounded-2xl overflow-hidden border border-gray-200 bg-white">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4">
                  <div className="text-xs uppercase tracking-wide text-blue-600">{p.tag}</div>
                  <div className="font-semibold mt-1">{p.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">A partner from strategy to scale</h2>
            <p className="text-gray-600 mt-4">We’re a senior team of strategists, designers, and builders. We move fast, communicate clearly, and obsess over results.</p>
            <ul className="mt-6 space-y-2 text-gray-700 list-disc list-inside">
              <li>Cross-functional team with startup and enterprise experience</li>
              <li>Outcome-driven processes and transparent collaboration</li>
              <li>Flexible engagement models that fit your roadmap</li>
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1600&auto=format&fit=crop" alt="Team" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold">Tell us about your project</h2>
          <p className="text-gray-600 mt-2 max-w-2xl">Share a few details and we’ll get back within one business day.</p>

          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="p-6 rounded-xl border border-gray-200 bg-white">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="jane@company.com" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Company</label>
                  <input name="company" value={form.company} onChange={handleChange} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Acme Inc." />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Service</label>
                  <select name="service" value={form.service} onChange={handleChange} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
                    <option value="">Select</option>
                    <option>Brand Strategy</option>
                    <option>Web Design</option>
                    <option>Product Design</option>
                    <option>Growth Marketing</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-600">Budget</label>
                  <select name="budget" value={form.budget} onChange={handleChange} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
                    <option value="">Select</option>
                    <option>Under $5k</option>
                    <option>$5k – $15k</option>
                    <option>$15k – $50k</option>
                    <option>$50k+</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-600">Project details</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Goals, timeline, links…" />
                </div>
              </div>

              {status.success && (
                <p className="mt-4 text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">{status.success}</p>
              )}
              {status.error && (
                <p className="mt-4 text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">{status.error}</p>
              )}

              <button disabled={status.loading} type="submit" className="mt-6 w-full md:w-auto px-5 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
                {status.loading ? 'Sending…' : 'Send message'}
              </button>
              <p className="mt-3 text-xs text-gray-500">Backend: {backend}</p>
            </form>

            <div className="p-6 rounded-xl border border-gray-200 bg-white">
              <h3 className="font-semibold text-lg">Why teams choose us</h3>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>Deep expertise across brand, product, and growth</li>
                <li>Senior, hands-on team that ships quickly</li>
                <li>Clear communication and measurable outcomes</li>
              </ul>
              <div className="mt-6 rounded-lg bg-blue-50 text-blue-900 p-4 border border-blue-100">
                <p className="text-sm">Prefer email? Reach us at hello@flames.agency</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Flames Agency. All rights reserved.</p>
          <div className="text-sm text-gray-600">Built with love and great coffee.</div>
        </div>
      </footer>
    </div>
  )
}

export default App
