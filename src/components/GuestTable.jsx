// Shared table. Pass onDelete and/or onPaid to show those buttons.
export default function GuestTable({ guests, onDelete, onPaid }) {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">
      <table className="w-full text-left text-sm text-navy">
        <thead className="bg-navy text-white">
          <tr>{['Guest', 'Room / bed', 'Rent', 'Status', 'ID proof', ''].map((h) => <th key={h} className="px-3 py-2 font-medium">{h}</th>)}</tr>
        </thead>
        <tbody>
          {guests.map((g) => (
            <tr key={g.id} className="border-t border-navy/10">
              <td className="px-3 py-2">{g.name}<div className="text-xs text-navy/50">{g.phone}</div></td>
              <td className="px-3 py-2">{g.room} / {g.bed}</td>
              <td className="px-3 py-2">₹{g.rent}</td>
              <td className={`px-3 py-2 font-semibold ${g.status === 'Paid' ? 'text-green-700' : 'text-red-600'}`}>{g.status}</td>
              <td className="px-3 py-2">{g.docs ? 'Submitted' : 'Missing'}</td>
              <td className="space-x-2 px-3 py-2 text-right">
                {onPaid && g.status === 'Due' && <button onClick={() => onPaid(g.id)} className="rounded bg-gold px-2 py-1 text-xs font-semibold text-navy">Mark paid</button>}
                {onDelete && <button onClick={() => onDelete(g.id)} className="rounded border border-red-300 px-2 py-1 text-xs text-red-600">Remove</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
