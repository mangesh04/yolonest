import { useState } from 'react'
import { amenities } from '../data/site'

// Cards expand on hover (desktop) or tap (phone).
export default function Amenities() {
  const [open, setOpen] = useState(null)
  return (
    <section id="amenities" className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-2xl font-bold text-navy md:text-3xl">What you get at YOLO Nest</h2>
      <div className="mt-6 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {amenities.map((a, i) => (
          <button
            key={a.title}
            onClick={() => setOpen(open === i ? null : i)}
            onMouseEnter={() => setOpen(i)}
            onMouseLeave={() => setOpen(null)}
            className="rounded-2xl border border-navy/10 bg-white p-5 text-left transition hover:border-gold"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{a.icon}</span>
              <span className="font-semibold text-navy">{a.title}</span>
            </div>
            <p className={`overflow-hidden text-sm text-navy/70 transition-all duration-300 ${open === i ? 'mt-3 max-h-24' : 'max-h-0'}`}>{a.text}</p>
          </button>
        ))}
      </div>
    </section>
  )
}
