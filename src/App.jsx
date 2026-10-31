import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import GuestDashboard from './pages/GuestDashboard'
import AdminDashboard from './pages/AdminDashboard'
import StaffDashboard from './pages/StaffDashboard'

const dashboards = { guest: GuestDashboard, admin: AdminDashboard, staff: StaffDashboard }

export default function App() {
  const [page, setPage] = useState('home')
  const [user, setUser] = useState(null)

  const go = (p) => { setPage(p); window.scrollTo(0, 0) }
  const scrollTo = (id) => {
    go('home')
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50)
  }
  const Dash = user && dashboards[user.role]

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 font-sans">
      <Navbar user={user} go={go} scrollTo={scrollTo} logout={() => { setUser(null); go('home') }} />
      <main className="flex-1">
        {page === 'login' && <Login onLogin={(u) => { setUser(u); go('dashboard') }} />}
        {page === 'dashboard' && Dash && <Dash />}
        {(page === 'home' || (page === 'dashboard' && !Dash)) && <Home scrollTo={scrollTo} />}
      </main>
      <Footer />
    </div>
  )
}
