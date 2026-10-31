import { useState } from 'react'
import { guests } from '../data/mock'

export default function GuestDashboard() {
  const me = guests[0]
  const [docs, setDocs] = useState(me.docs)
  return (
    <section className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-navy">
      <h1 className="text-2xl font-bold">Hi, {me.name}</h1>
      <div className="rounded-2xl bg-white p-5 shadow">
        <h2 className="font-semibold">Your stay</h2>
        <p className="text-sm">Room {me.room}, bed {me.bed} · Rent ₹{me.rent} / month · Phone {me.phone}</p>
      </div>
      {!docs && (
        <div className="rounded-2xl border border-gold bg-gold/10 p-5">
          <h2 className="font-semibold">ID proof is missing</h2>
          <input type="file" className="mt-2 text-sm" onChange={() => setDocs(true)} />
        </div>
      )}
      <div className="rounded-2xl bg-white p-5 shadow">
        <h2 className="font-semibold">Rent</h2>
        <p className="text-sm">This month: <b>{me.status}</b></p>
        <button onClick={() => alert('Razorpay / Cashfree checkout opens here.')} className="mt-3 rounded-full bg-gold px-5 py-2 font-semibold text-navy">Pay ₹{me.rent}</button>
      </div>
    </section>
  )
}
