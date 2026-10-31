import { useState } from 'react'
import Img from './Img'
import RoomViewer from './RoomViewer'
import { categories, rooms } from '../data/site'

export default function Stays() {
  const [cat, setCat] = useState(null)
  const [room, setRoom] = useState(null)
  const list = rooms.filter((r) => r.category === cat)

  return (
    <section id="stays" className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-2xl font-bold text-navy md:text-3xl">Choose your stay</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`overflow-hidden rounded-2xl border-2 bg-white text-left ${cat === c.id ? 'border-gold' : 'border-transparent shadow'}`}
          >
            <Img src={`/images/categories/${c.id}.jpg`} alt={c.name} className="h-32 w-full" />
            <div className="p-3">
              <p className="font-semibold text-navy">{c.name}</p>
              <p className="text-xs text-navy/60">{c.tag}</p>
            </div>
          </button>
        ))}
      </div>

      {cat ? (
        <div className="mt-10">
          <h3 className="text-xl font-bold text-navy">Available rooms</h3>
          {list.length === 0 && <p className="mt-3 text-navy/60">No rooms listed in this category yet.</p>}
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((r) => (
              <div key={r.id} className="overflow-hidden rounded-2xl bg-white shadow">
                <Img src={`/images/rooms/${r.id}.jpg`} alt={`Room ${r.no}`} className="h-44 w-full" />
                <div className="space-y-1 p-4 text-sm text-navy">
                  <p className="text-base font-semibold">Room {r.no} · Floor {r.floor}</p>
                  <p>{r.type} · {r.beds} beds</p>
                  <p className="font-semibold">{r.price}</p>
                  <button onClick={() => setRoom(r)} className="mt-2 w-full rounded-full bg-navy py-2 font-semibold text-white">View in 360°</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-6 text-navy/60">Select a category to see its rooms.</p>
      )}
      {room && <RoomViewer room={room} onClose={() => setRoom(null)} />}
    </section>
  )
}
