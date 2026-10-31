import { useEffect, useRef } from 'react'
import { Viewer } from '@photo-sphere-viewer/core'

// Full-screen 360 view. Needs public/images/360/<room id>.jpg (equirectangular 2:1 photo).
export default function RoomViewer({ room, onClose }) {
  const box = useRef(null)
  useEffect(() => {
    const v = new Viewer({ container: box.current, panorama: `/images/360/${room.id}.jpg`, navbar: ['zoom', 'fullscreen'] })
    return () => v.destroy()
  }, [room])

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/85 p-4">
      <div className="mb-2 flex items-center justify-between text-white">
        <p className="font-semibold">Room {room.no} · {room.type} · Floor {room.floor}</p>
        <button onClick={onClose} className="rounded-full bg-gold px-4 py-1 font-semibold text-navy">Close</button>
      </div>
      <div ref={box} className="flex-1 rounded-xl" />
      <p className="mt-2 text-center text-xs text-white/60">Drag to look around. Missing view? Add public/images/360/{room.id}.jpg</p>
    </div>
  )
}
