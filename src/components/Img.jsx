import { useState } from 'react'

// Shows the image. If the file is missing, shows a placeholder with the path to add.
export default function Img({ src, alt = '', className = '' }) {
  const [bad, setBad] = useState(false)
  if (bad)
    return (
      <div className={`bg-gradient-to-br from-navy to-gold/50 grid place-items-center p-2 text-center text-xs text-white/70 ${className}`}>
        {src}
      </div>
    )
  return <img src={src} alt={alt} onError={() => setBad(true)} className={`object-cover ${className}`} />
}
