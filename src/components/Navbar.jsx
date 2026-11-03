const links = [['Amenities', 'amenities'], ['Stays', 'stays'], ['Location', 'location'], ['Contact', 'contact']]

export default function Navbar({ user, go, scrollTo, logout }) {
  return (
    <header className="sticky top-0 z-40 bg-navy text-white shadow-xl">

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <button onClick={() => go('home')} className="text-xl font-extrabold">
          YOLO <span className="text-gold">nest</span>
        </button>
        <nav className="hidden gap-6 text-sm md:flex">
          {links.map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} className="hover:text-gold">{label}</button>
          ))}
        </nav>
        <div className="flex gap-2 text-sm">
          {user ? (
            <>
              <button onClick={() => go('dashboard')} className="rounded-full bg-gold px-4 py-1.5 font-semibold text-navy">Dashboard</button>
              <button onClick={logout} className="rounded-full border border-white/40 px-4 py-1.5">Log out</button>
            </>
          ) : (
            <button onClick={() => go('login')} className="rounded-full bg-gold px-4 py-1.5 font-semibold text-navy">Log in</button>
          )}
        </div>
      </div>
    </header>
  )
}
