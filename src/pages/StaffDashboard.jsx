import { useState } from 'react'
import GuestTable from '../components/GuestTable'
import { guests as seed } from '../data/mock'

// Limited access: staff can collect rent and view guests. No expenses, no deleting.
export default function StaffDashboard() {
  const [guests, setGuests] = useState(seed)
  return (
    <section className="mx-auto max-w-6xl space-y-4 px-4 py-10 text-navy">
      <h1 className="text-2xl font-bold">Staff dashboard</h1>
      <p className="text-sm text-navy/60">Collect rent and check guest details. Admin tools are hidden.</p>
      <GuestTable guests={guests} onPaid={(id) => setGuests(guests.map((g) => (g.id === id ? { ...g, status: 'Paid' } : g)))} />
    </section>
  )
}
