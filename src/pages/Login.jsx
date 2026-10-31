import { useState } from 'react'
import { users } from '../data/mock'

const roles = [['guest', 'Guest'], ['admin', 'Admin'], ['staff', 'Staff']]

export default function Login({ onLogin }) {
  const [role, setRole] = useState('guest')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const u = users.find((x) => x.role === role && x.email === email && x.password === password)
    u ? onLogin(u) : setError('Email or password is wrong for this role.')
  }

  const input = 'w-full rounded-lg border border-navy/20 px-3 py-2'
  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <form onSubmit={submit} className="space-y-4 rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-navy">Log in</h1>
        <div className="flex gap-2">
          {roles.map(([id, label]) => (
            <button type="button" key={id} onClick={() => setRole(id)} className={`flex-1 rounded-full py-1.5 text-sm font-semibold ${role === id ? 'bg-navy text-white' : 'bg-navy/10 text-navy'}`}>{label}</button>
          ))}
        </div>
        <input className={input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className={input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="w-full rounded-full bg-gold py-2 font-semibold text-navy">Log in</button>
        <p className="text-xs text-navy/50">Demo: {role}@yolonest.com / {role}123</p>
      </form>
    </section>
  )
}
