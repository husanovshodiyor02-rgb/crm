import { useState } from 'react';
import { customers } from '../data/mockData';

const statusColors = {
  'Faol': 'bg-emerald-100 text-emerald-700',
  'Nofaol': 'bg-slate-100 text-slate-600',
  'VIP': 'bg-amber-100 text-amber-700',
};

const avatarColors = [
  'from-violet-400 to-purple-500',
  'from-blue-400 to-indigo-500',
  'from-emerald-400 to-teal-500',
  'from-orange-400 to-red-500',
  'from-pink-400 to-rose-500',
  'from-cyan-400 to-blue-500',
  'from-amber-400 to-orange-500',
  'from-green-400 to-emerald-500',
];

export default function Customers() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Barchasi');
  const [selected, setSelected] = useState(null);

  const filtered = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'Barchasi' || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Mijoz qidirish..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        </div>
        <div className="flex gap-2">
          {['Barchasi', 'Faol', 'Nofaol', 'VIP'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                filter === f
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="ml-auto px-4 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors shadow-md shadow-violet-600/20 flex items-center gap-2">
          <span>+</span> Yangi Mijoz
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5">Mijoz</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5">Aloqa</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5">Shahar</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5">Buyurtmalar</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5">Xarajat</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5">Holat</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5">Amal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((c, i) => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                        {c.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800">{c.name}</div>
                        <div className="text-xs text-slate-400">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{c.phone}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{c.city}</td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-slate-800">{c.orders}</span>
                    <span className="text-xs text-slate-400 ml-1">ta</span>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-800">{c.spent}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-xs px-2.5 py-1.5 bg-violet-50 text-violet-600 rounded-lg hover:bg-violet-100 font-medium">Ko'rish</button>
                      <button className="text-xs px-2.5 py-1.5 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 font-medium">Tahrir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between">
          <span className="text-sm text-slate-400">{filtered.length} ta mijoz topildi</span>
          <div className="flex gap-1">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-8 h-8 text-sm rounded-lg transition-colors ${p === 1 ? 'bg-violet-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
