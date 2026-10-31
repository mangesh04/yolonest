import { ShieldCheck, Tag, CookingPot, Trophy } from 'lucide-react'

const items = [
    { icon: ShieldCheck, title: 'Verified Listings', sub: '100% Genuine Stays' },
    { icon: Tag, title: 'Zero Brokerage', sub: 'Direct Owner Deal' },
    { icon: CookingPot, title: 'Modular Kitchen', sub: 'Self-Cooking Freedom' },
    { icon: Trophy, title: 'Gym & Pickleball', sub: 'Active Community' },
]

export default function TrustStrip() {
    return (
        <div className="border-t border-gold/30 bg-white">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
                {items.map(({ icon: Icon, title, sub }) => (
                    <div key={title} className="flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/20 text-amber-600">
                            <Icon size={20} />
                        </span>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-navy">{title}</p>
                            <p className="truncate text-xs text-navy/60">{sub}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}