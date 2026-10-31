import { memo, useEffect, useState } from 'react'

/*
  Simple illustrated map - no map library, no API key, no tiles.
  It is NOT to scale: positions (x, y on a 320x300 canvas) and distances (km)
  are approximate. Edit the PLACES list below to match reality.
*/

const HUB = { x: 160, y: 150 }

const CATS = {
  landmark: { color: '#f59e0b', emoji: '🛕' },
  work: { color: '#60a5fa', emoji: '💼' },
  food: { color: '#fb923c', emoji: '🍜' },
  area: { color: '#4ade80', emoji: '🏘️' },
  travel: { color: '#c084fc', emoji: '🚇' },
}

const PLACES = [
  { name: 'Hirai Mata Mandir', cat: 'landmark', x: 188, y: 168, km: 0.3, info: 'Local temple, a short walk from the PG.' },
  { name: 'Xion Mall', cat: 'food', x: 128, y: 168, km: 0.3, info: 'Shopping, food court and entertainment.' },
  { name: 'Maan Metro Station', cat: 'travel', x: 92, y: 132, km: 1.8, info: 'Metro station on the Hinjewadi–Shivajinagar line.' },
  { name: 'Wakad', cat: 'area', x: 214, y: 108, km: 2.4, info: 'Cafés, restaurants, markets and hospitals.' },
  { name: 'Infotech Park Phase 2', cat: 'work', x: 60, y: 196, km: 4.6, info: 'Major IT offices and companies.' },
  { name: 'Balewadi High Street', cat: 'food', x: 238, y: 178, km: 4.6, info: 'Popular for cafés, food and nightlife.' },
]

function NearbyMap() {
  const [step, setStep] = useState(0) // places revealed so far
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    if (step >= PLACES.length) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 1000 : 2800)
    return () => clearTimeout(t)
  }, [playing, step])

  const shown = PLACES.slice(0, step)
  const active = step > 0 ? PLACES[step - 1] : null
  const finished = step >= PLACES.length

  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-white/[0.06] text-white ring-1 ring-white/10">
      <style>{`
        @keyframes draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
        .route{stroke-dasharray:1;animation:draw .9s ease-out both}
        @keyframes pop{from{transform:scale(0)}to{transform:scale(1)}}
        .pop{transform-box:fill-box;transform-origin:center;animation:pop .45s .8s cubic-bezier(.2,1.6,.4,1) both}
        @keyframes pulse{from{transform:scale(1);opacity:.6}to{transform:scale(2.2);opacity:0}}
        .pulse{transform-box:fill-box;transform-origin:center;animation:pulse 1.6s ease-out infinite}
        @keyframes cardIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        .card-in{animation:cardIn .35s .8s ease-out both}
        @media (prefers-reduced-motion:reduce){.route,.pop,.pulse,.card-in{animation:none}}
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-4 pt-4">
        <h2 className="text-lg font-bold">See what you get nearby</h2>
        <button
          onClick={() => {
            if (finished) setStep(0)
            setPlaying((p) => !p || finished)
          }}
          className="shrink-0 rounded-full border border-gold/60 px-3 py-1 text-xs font-semibold text-gold transition-colors hover:bg-gold hover:text-navy"
        >
          {playing ? 'Pause' : finished ? 'Replay' : 'Play'}
        </button>
      </div>

      {/* Revealed places: small, static chips above the map */}
      <div className="flex min-h-[3.5rem] flex-wrap content-start gap-1 px-4 py-2">
        {shown.length === 0 ? (
          <p className="text-xs text-white/60">Finding places near YOLO PG…</p>
        ) : (
          shown.map((p) => {
            const isActive = active?.name === p.name
            return (
              <span
                key={p.name}
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ${isActive ? 'bg-gold font-semibold text-navy' : 'bg-white/10 text-white/90'
                  }`}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: CATS[p.cat].color }} />
                {p.name}
                <span className={isActive ? 'text-navy/70' : 'text-white/55'}>{p.km} km</span>
              </span>
            )
          })
        )}
      </div>

      {/* Map */}
      <div className="relative min-h-[18rem] flex-1 bg-black/25">
        <svg
          viewBox="40 0 240 300"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Illustrated map of places near YOLO PG, Hinjewadi"
        >
          {/* green areas */}
          <g fill="#34d399" opacity=".14">
            <ellipse cx="70" cy="40" rx="55" ry="28" />
            <ellipse cx="270" cy="150" rx="40" ry="22" />
            <ellipse cx="110" cy="265" rx="60" ry="24" />
          </g>

          {/* roads */}
          <g fill="none" stroke="#ffffff" strokeOpacity=".13" strokeLinecap="round">
            <path d="M0 165 C80 150 120 160 160 150 S260 120 320 125" strokeWidth="8" />
            <path d="M60 0 C90 80 140 140 160 150 S200 230 190 300" strokeWidth="6" />
            <path d="M0 232 C90 210 170 232 320 200" strokeWidth="5" />
            <path d="M200 0 C220 60 250 100 320 90" strokeWidth="5" />
          </g>

          {/* distance rings */}
          <g fill="none" stroke="#f5b82e" strokeWidth="1" strokeDasharray="3 5" opacity=".45">
            <circle cx={HUB.x} cy={HUB.y} r="45" />
            <circle cx={HUB.x} cy={HUB.y} r="90" />
            <circle cx={HUB.x} cy={HUB.y} r="135" />
          </g>

          {/* connections */}
          {shown.map((p) => (
            <line
              key={`l-${p.name}`}
              x1={HUB.x}
              y1={HUB.y}
              x2={p.x}
              y2={p.y}
              pathLength="1"
              className="route"
              stroke={CATS[p.cat].color}
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}

          {/* destination pins */}
          {shown.map((p) => (
            <g key={`p-${p.name}`} transform={`translate(${p.x} ${p.y})`}>
              <g className="pop">
                {active?.name === p.name && (
                  <circle r="11" fill="none" stroke={CATS[p.cat].color} strokeWidth="2" className="pulse" />
                )}
                <circle r="11" fill={CATS[p.cat].color} stroke="#fff" strokeOpacity=".9" strokeWidth="2" />
                <text textAnchor="middle" dy="4" fontSize="12">
                  {CATS[p.cat].emoji}
                </text>
              </g>
            </g>
          ))}

          {/* home: YOLO PG */}
          <g transform={`translate(${HUB.x} ${HUB.y})`}>
            <circle r="15" className="pulse fill-gold" />
            <circle r="15" className="fill-navy stroke-gold" strokeWidth="3" />
            <text textAnchor="middle" dy="5" fontSize="14">🏠</text>
            <rect x="-28" y="19" width="56" height="15" rx="7.5" className="fill-gold" />
            <text x="0" y="30" textAnchor="middle" fontSize="9" fontWeight="700" className="fill-navy">
              YOLO PG
            </text>
          </g>
        </svg>

        {/* info window for the place being connected */}
        {active && (
          <div
            key={active.name}
            className={`card-in absolute left-3 right-3 max-w-[16rem] rounded-xl bg-navy/90 p-2.5 shadow-lg ring-1 ring-gold/30 backdrop-blur ${active.y > HUB.y ? 'top-3' : 'bottom-3'
              }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{CATS[active.cat].emoji}</span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold leading-tight text-white">{active.name}</p>
                <p className="text-[11px] text-white/60">~{active.km} km from YOLO PG</p>
              </div>
            </div>
            <p className="mt-1.5 text-xs text-white/80">{active.info}</p>
          </div>
        )}
      </div>

      <p className="px-4 py-2 text-[10px] text-white/50">Illustration, not to scale. Distances are approximate.</p>
    </div>
  )
}

export default memo(NearbyMap)