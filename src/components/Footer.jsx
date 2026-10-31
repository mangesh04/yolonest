import { brand } from '../data/site'

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 md:flex-row md:justify-between">
        <div>
          <p className="text-xl font-extrabold">YOLO <span className="text-gold">nest</span></p>
          <p className="text-sm text-white/70">{brand.tagline}</p>
        </div>
        <div className="text-sm text-white/80">
          <p>{brand.address}</p>
          <a href={`tel:${brand.phone}`} className="font-semibold text-gold">{brand.phone}</a>
        </div>
      </div>
    </footer>
  )
}
