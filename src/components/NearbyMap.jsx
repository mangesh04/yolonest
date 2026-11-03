import { memo } from 'react'

const D =
  'M145.76 95.4273C129.399 78.7697 87.2912 48.8399 46.4387 58.9347M46.4387 58.9347C41.5116 60.1522 36.6028 61.9519 31.7596 64.4273C25.2596 67.7496 20.0596 75.8273 25.2596 81.4273C27.9263 84.094 35.0596 88.2273 42.2596 83.4273C46.0701 80.887 48.7154 71.4452 46.4387 58.9347ZM46.4387 58.9347C43.3381 41.8968 31.1083 19.1672 0.259598 0.427307'

const START = { x: 145.76, y: 95.43 } // main dot
const END = { x: 0.26, y: 0.43 }      // second dot

function NearbyMap() {
  return (
    <div className="flex h-full items-center justify-center text-white">
      <style>{`
        @keyframes draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
        .reveal{stroke-dasharray:1;animation:draw 2.5s ease-out .5s both}
        @keyframes pop{from{transform:scale(0)}to{transform:scale(1)}}
        .pop{transform-box:fill-box;transform-origin:center;animation:pop .4s 2.8s cubic-bezier(.2,1.6,.4,1) both}
        @media (prefers-reduced-motion:reduce){.reveal,.pop{animation:none}}
      `}</style>

      <svg viewBox="-12 -12 171 120" className="w-full max-w-md overflow-visible">
        <defs>
          <mask id="reveal-mask" maskUnits="userSpaceOnUse" x="-12" y="-12" width="171" height="120">
            <path d={D} pathLength="1" fill="none" stroke="white" strokeWidth="8" className="reveal" />
          </mask>
        </defs>

        {/* dashed line, revealed once from the main dot to the second dot */}
        <g mask="url(#reveal-mask)">
          <path
            d={D}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 6"
          />
        </g>

        {/* main dot */}
        <circle cx={START.x} cy={START.y} r="5" fill="white" />

        {/* second dot */}
        <circle cx={END.x} cy={END.y} r="3.5" fill="white" className="pop" />
      </svg>
    </div>
  )
}

export default memo(NearbyMap)