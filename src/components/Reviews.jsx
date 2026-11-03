import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { reviews } from '../data/content'

export default function Reviews() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setI((n) => (n + 1) % reviews.length), 7000)
    return () => clearTimeout(t)
  }, [i])

  const r = reviews[i]
  return (
    <section id="reviews" className="bg-white py-14">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-center text-2xl font-bold text-navy md:text-3xl">What our residents say</h2>

        <figure className="mt-8 rounded-2xl border border-navy/10 p-6 md:flex md:items-center md:gap-8 md:p-8">
          <div className="flex items-center gap-3 md:w-56 md:shrink-0 md:flex-col md:items-start">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-navy text-xl font-bold text-white">{r.name[0]}</span>
            <div>
              <p className="font-bold text-navy">{r.name}</p>
              <p className="text-sm text-navy/60">{r.role}</p>
              <div className="mt-1 flex text-gold" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((s) => <Star key={s} size={16} fill="currentColor" />)}
              </div>
            </div>
          </div>
          <blockquote key={i} className="mt-4 text-navy/80 md:mt-0">“{r.text}”</blockquote>
        </figure>

        <div className="mt-4 flex justify-center gap-2">
          {reviews.map((_, n) => (
            <button key={n} onClick={() => setI(n)} aria-label={`Show review ${n + 1}`} className={`h-2 rounded-full transition-all ${n === i ? 'w-6 bg-gold' : 'w-2 bg-navy/20'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
