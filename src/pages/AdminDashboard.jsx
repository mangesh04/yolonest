import { useState } from 'react'
import GuestTable from '../components/GuestTable'
import { guests as seed, expenses, bedsLayout } from '../data/mock'

export default function AdminDashboard() {
  const [guests, setGuests] = useState(seed)
  const [f, setF] = useState({ name: '', room: '', bed: '' })
  const sum = (list) => list.reduce((s, x) => s + (x.rent ?? x.amount), 0)
  const beds = Object.values(bedsLayout).flat().length

  const stats = [
    ['Beds occupied', `${guests.length} / ${beds}`],
    ['Rent collected', `₹${sum(guests.filter((g) => g.status === 'Paid'))}`],
    ['Rent pending', `₹${sum(guests.filter((g) => g.status === 'Due'))}`],
    ['Expenses', `₹${sum(expenses)}`],
  ]

  const add = (e) => {
    e.preventDefault()
    if (!f.name) return
    setGuests([...guests, { id: Date.now(), ...f, phone: '-', rent: 7500, status: 'Due', docs: false }])
    setF({ name: '', room: '', bed: '' })
  }
  const input = 'rounded-lg border border-navy/20 px-3 py-2 text-sm'

  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-10 text-navy">
      <h1 className="text-2xl font-bold">Admin dashboard</h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map(([l, v]) => (
          <div key={l} className="rounded-2xl bg-white p-4 shadow"><p className="text-xs text-navy/60">{l}</p><p className="text-xl font-bold">{v}</p></div>
        ))}
      </div>

      <div>
        <h2 className="mb-2 font-semibold">Guests</h2>
        <GuestTable guests={guests} onDelete={(id) => setGuests(guests.filter((g) => g.id !== id))} onPaid={(id) => setGuests(guests.map((g) => (g.id === id ? { ...g, status: 'Paid' } : g)))} />
        <form onSubmit={add} className="mt-3 flex flex-wrap gap-2">
          <input className={input} placeholder="Guest name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <input className={`${input} w-24`} placeholder="Room" value={f.room} onChange={(e) => setF({ ...f, room: e.target.value })} />
          <input className={`${input} w-20`} placeholder="Bed" value={f.bed} onChange={(e) => setF({ ...f, bed: e.target.value })} />
          <button className="rounded-full bg-gold px-4 py-2 text-sm font-semibold">Add guest</button>
        </form>
      </div>

      <div>
        <h2 className="mb-2 font-semibold">Bed occupancy</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {Object.entries(bedsLayout).map(([room, list]) => (
            <div key={room} className="rounded-2xl bg-white p-4 shadow">
              <p className="mb-2 font-semibold">Room {room}</p>
              {list.map((b) => {
                const g = guests.find((x) => x.room === room && x.bed === b)
                return <p key={b} className={`text-sm ${g ? '' : 'text-green-700'}`}>Bed {b}: {g ? g.name : 'Vacant'}</p>
              })}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-2 font-semibold">Expenses</h2>
        <div className="rounded-2xl bg-white p-4 shadow text-sm">
          {expenses.map((e) => <p key={e.id} className="flex justify-between py-1"><span>{e.item}</span><span>₹{e.amount}</span></p>)}
        </div>
      </div>
    </section>
  )
}
