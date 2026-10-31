import { brand } from '../data/site'

export default function MapSection() {
  return (
    <section id="location" className="bg-navy py-14 text-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-bold">Find us</h2>
          <p className="mt-3 text-white/80">{brand.address}</p>
        </div>
        <iframe
          title="YOLO Nest location"
          className="h-72 w-full rounded-2xl md:col-span-2"
          loading="lazy"
          src={`https://www.google.com/maps?q=${encodeURIComponent(brand.mapQuery)}&output=embed`}
        />
      </div>
    </section>
  )
}
