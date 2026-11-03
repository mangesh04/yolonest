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
    <section id="home" className="relative flex flex-1 flex-col justify-center overflow-hidden bg-navy text-white">
      {/* Background image + overlays: behind everything */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* the image */}
        <img
          src="/images/hero/bg.webp"
          alt=""
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover object-center "
        />

        {/* navy tint: image still visible, right side more solid behind the map */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(14,16,56,.95) 0%, rgba(14,16,56,.75) 40%, rgba(14,16,56,.86) 70%, rgba(14,16,56,.92) 100%)',
          }}
        />

        {/* single soft glow, top-left only */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(55% 50% at 8% 0%, rgba(99,102,241,.3), transparent 70%)',
          }}
        />

        {/* fade into the section below */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy to-transparent" />
      </div>

      {/* Content: relative so it stays above the background */}
      <div className="relative mx-auto grid w-full max-w-6xl gap-4 px-4 py-6 md:py-8 lg:grid-cols-3">
        {/* Left: heading + expanding amenity panels */}
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-2">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
              Premium co-living,
              <span className="block text-gold">built around your lifestyle</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/80 sm:text-base">
              A fully furnished PG with a gym, gaming zone, pickleball court and café,
              close to Hinjewadi's IT parks and the metro.
            </p>
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

        {/* Right: places chips card + map card */}
        {/* <NearbyMap /> */}
      </div>
    </section>
  )
}