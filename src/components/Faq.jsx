import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '../data/content'

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-14">
      <h2 className="text-center text-2xl font-bold text-navy md:text-3xl">Frequently asked questions</h2>
      <p className="mt-2 text-center text-navy/70">Answers about rent, deposits, rules and what is included.</p>

      <div className="mt-8 space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={f.q} className={`overflow-hidden rounded-xl border bg-white ${isOpen ? 'border-gold' : 'border-navy/10'}`}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-navy ${isOpen ? 'bg-gold/10' : ''}`}
              >
                {f.q}
                <ChevronDown size={20} className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && <p className="px-5 pb-5 pt-3 text-sm leading-relaxed text-navy/75">{f.a}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}
