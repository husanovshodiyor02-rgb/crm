import { useState } from 'react';

const pageTitles = {
  dashboard: 'Dashboard',
  customers: 'Mijozlar',
  orders: 'Buyurtmalar',
  products: 'Mahsulotlar',
  employees: 'Xodimlar',
  analytics: 'Analitika',
  settings: 'Sozlamalar',
};

export default function Header({ page }) {
  const [search, setSearch] = useState('');

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center gap-4 px-6 sticky top-0 z-10">
      <div>
        <h1 className="text-slate-800 font-semibold text-lg leading-none">{pageTitles[page]}</h1>
        <p className="text-slate-400 text-xs mt-0.5">
          {new Date().toLocaleDateString('uz-UZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Search */}
      <div className="ml-auto flex items-center gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Qidirish..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-56 pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all placeholder:text-slate-400"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
          🔔
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold cursor-pointer">
          A
        </div>
      </div>
    </header>
  );
}
