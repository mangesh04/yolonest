import { brand } from '../data/site'
import { whatsappLink } from './Hero'

export default function VisitCta() {
  return (
    <section className="bg-gold">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-navy md:text-3xl">See the rooms in person</h2>
          <p className="mt-1 text-navy/80">Message us your preferred room type and we will arrange a visit.</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="rounded-full bg-navy px-6 py-2.5 text-center font-semibold text-white">Book a visit on WhatsApp</a>
          <a href={`tel:${brand.phone}`} className="rounded-full border-2 border-navy px-6 py-2.5 text-center font-semibold text-navy">Call {brand.phone}</a>
        </div>
      </div>
    </section>
  )
}
