import { useState } from 'react'
import { MapPin, DoorOpen, Snowflake, ShieldCheck } from 'lucide-react'
import Img from './Img'
import RoomViewer from './RoomViewer'
import { rooms } from '../data/site'

const DEFAULT_LOCATION = 'Near Hirai Sitai Mandir, Hinjewadi Phase 1'

export default function Stays() {
  const [room, setRoom] = useState(null)

  // show rooms marked featured; if none are marked, show all
  const featured = rooms.some((r) => r.featured) ? rooms.filter((r) => r.featured) : rooms

  return (
    <section id="stays" className="mx-auto max-w-6xl px-4 py-14">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-amber-800">
            Featured Listings
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy md:text-4xl">
            Handpicked Properties Just for You
          </h2>
          <p className="mt-1 text-navy/70">
            Premium homes, prime Hinjewadi Phase 1 locations, verified listings.
          </p>
        </div>
        <a
          href="#stays"
          className="self-start rounded-md border border-navy/30 px-4 py-2 text-sm text-navy/80 transition hover:bg-navy hover:text-white md:self-auto"
        >
          View All Stays →
        </a>
      </div>

      {/* Cards */}
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((r) => (
          <div
            key={r.id}
            className="flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
          >
            {/* Image + badges */}
            <div className="relative">
              <Img
                src={`/images/rooms/${r.id}.webp`}
                alt={r.title || `Room ${r.no}`}
                className="h-60 w-full object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-navy px-3 py-1 text-sm font-semibold text-white">
                {r.wing || 'Wing A'}
              </span>
              <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-sm font-bold text-navy">
                {r.price}
                <span className="text-xs font-normal">/mo</span>
              </span>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-bold leading-snug text-navy">
                {r.title || `${r.type} (Room ${r.no})`}
              </h3>

              <p className="mt-2 flex items-center gap-2 text-sm text-navy/60">
                <MapPin size={16} className="shrink-0 text-amber-500" />
                {r.location || DEFAULT_LOCATION}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-dashed border-gray-200 py-3 text-sm text-navy/80">
                <span className="flex items-center gap-1.5">
                  <DoorOpen size={16} className="text-blue-500" />
                  {r.type}
                </span>
                <span className="flex items-center gap-1.5">
                  <Snowflake size={16} className="text-cyan-500" />
                  AC
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  Furnished
                </span>
              </div>

              <button
                onClick={() => setRoom(r)}
                className="mt-auto w-full rounded-xl bg-navy py-3.5 font-semibold text-white transition hover:opacity-90"
                style={{ marginTop: '1.5rem' }}
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {room && <RoomViewer room={room} onClose={() => setRoom(null)} />}
    </section>
  )
}