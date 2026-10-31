import { useState } from 'react'
import Img from './Img'
import NearbyMap from './NearbyMap'
import { brand } from '../data/site'

// Replace the image paths and text with your real amenities.
const amenities = [
  { title: 'Gym', info: 'Fully equipped gym open all day for residents.', src: '/images/hero/gym.webp' },

  { title: 'Gaming Zone', info: 'Console and board games to unwind after work.', src: '/images/hero/gaming.webp' },

  { title: 'Pickleball Court', info: 'Play with housemates on our own court.', src: '/images/hero/pickleball.webp' },

  { title: 'Café Area', info: 'A cosy space to work, chat or grab a coffee.', src: '/images/hero/cafe.webp' },
]

export default function Hero({ scrollTo }) {
  const [active, setActive] = useState(null) // null = all equal

  return (
    <section id="home" className="flex flex-1 flex-col justify-center bg-navy text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-6 md:py-8 lg:grid-cols-3">
        {/* Left: heading + expanding amenity panels */}
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-2">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
              Lavish stay, without any restrictions
            </h1>
            <p className="mt-1 font-medium text-gold">{brand.tagline}</p>
            <button
              onClick={() => scrollTo('stays')}
              className="mt-4 w-full rounded-full bg-gold px-5 py-2.5 font-semibold text-navy sm:w-auto"
            >
              See available stays
            </button>
          </div>

          {/* Column on mobile, row from md up */}
          <div
            className="flex h-[28rem] flex-col gap-2 md:h-80 md:flex-row lg:h-[26rem]"
            onMouseLeave={() => setActive(null)}
          >
            {amenities.map((a, idx) => {
              const isActive = idx === active
              return (
                <div
                  key={a.title}
                  tabIndex={0}
                  onMouseEnter={() => setActive(idx)}
                  onClick={() => setActive(idx)}
                  onFocus={() => setActive(idx)}
                  onBlur={() => setActive(null)}
                  className={`relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-in-out ${isActive ? 'flex-[5]' : 'flex-1'
                    }`}
                >
                  <Img src={a.src} alt={a.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />

                  {/* Collapsed title: horizontal on mobile, vertical from md up */}
                  <span
                    className={`absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-semibold transition-opacity duration-300 md:bottom-4 md:left-1/2 md:top-auto md:-translate-x-1/2 md:translate-y-0 md:[writing-mode:vertical-rl] ${isActive ? 'opacity-0' : 'opacity-100'
                      }`}
                  >
                    {a.title}
                  </span>

                  {/* Expanded: title + extra info */}
                  <div
                    className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-500 md:p-5 ${isActive ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
                      }`}
                  >
                    <h3 className="text-lg font-bold text-gold md:text-xl">{a.title}</h3>
                    <p className="mt-1 text-sm text-white/90">{a.info}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: animated nearby map */}
        <NearbyMap />
      </div>
    </section>
  )
}
