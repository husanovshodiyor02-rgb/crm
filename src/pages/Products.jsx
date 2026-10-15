import { useState } from 'react';
import { products } from '../data/mockData';

const statusConfig = {
  'Mavjud': 'bg-emerald-100 text-emerald-700',
  'Kam qoldi': 'bg-amber-100 text-amber-700',
  'Tugagan': 'bg-red-100 text-red-700',
};

const categoryIcons = {
  'Laptop': '💻',
  'Telefon': '📱',
  'Aksesuar': '🎧',
  'Planshet': '📱',
  'Soat': '⌚',
  'Desktop': '🖥️',
};

export default function Products() {
  const [view, setView] = useState('table');
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('Barchasi');

  const categories = ['Barchasi', ...new Set(products.map(p => p.category))];

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'Barchasi' || p.category === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Mahsulot qidirish..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilterCat(c)}
              className={`px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all ${
                filterCat === c
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            <button onClick={() => setView('table')} className={`px-3 py-2 text-sm rounded-lg transition-all font-medium ${view === 'table' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>☰</button>
            <button onClick={() => setView('grid')} className={`px-3 py-2 text-sm rounded-lg transition-all font-medium ${view === 'grid' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>⊞</button>
          </div>
          <button className="px-4 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors shadow-md shadow-violet-600/20">
            + Mahsulot
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden">
              <div className="h-28 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-5xl">
                {categoryIcons[p.category] || '📦'}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-800 leading-snug">{p.name}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${statusConfig[p.status]}`}>{p.status}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{p.category}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-slate-900">{p.price}</span>
                  <span className="text-xs text-slate-400">Zaxira: {p.stock}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
                  <button className="flex-1 text-xs py-2 bg-violet-50 text-violet-600 rounded-lg hover:bg-violet-100 font-medium">Tahrir</button>
                  <button className="flex-1 text-xs py-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 font-medium">Ko'rish</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5">Mahsulot</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5">Kategoriya</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5">Narx</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5">Zaxira</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5">Sotilgan</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5">Holat</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                          {categoryIcons[p.category] || '📦'}
                        </div>
                        <span className="text-sm font-medium text-slate-800">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">{p.category}</span>
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-slate-800">{p.price}</td>
                    <td className="px-5 py-4">
                      <span className={`text-sm font-semibold ${p.stock === 0 ? 'text-red-500' : p.stock < 10 ? 'text-amber-600' : 'text-slate-800'}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{p.sold}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusConfig[p.status]}`}>{p.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-xs px-3 py-2 bg-violet-50 text-violet-600 rounded-lg hover:bg-violet-100 font-medium">Tahrir</button>
                        <button className="text-xs px-3 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 font-medium">O'chirish</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
