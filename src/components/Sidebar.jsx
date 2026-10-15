import { useState } from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'customers', label: 'Mijozlar', icon: '👥' },
  { id: 'orders', label: 'Buyurtmalar', icon: '📦' },
  { id: 'products', label: 'Mahsulotlar', icon: '🛍️' },
  { id: 'employees', label: 'Xodimlar', icon: '🧑‍💼' },
  { id: 'analytics', label: 'Analitika', icon: '📊' },
  { id: 'settings', label: 'Sozlamalar', icon: '⚙️' },
];

export default function Sidebar({ active, onNavigate, collapsed, onToggle }) {
  return (
    <aside
      className={`${collapsed ? 'w-16' : 'w-64'} flex flex-col bg-slate-900 min-h-screen transition-all duration-300 relative z-20`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-700/50">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          C
        </div>
        {!collapsed && (
          <div>
            <div className="text-white font-semibold text-sm">CRM Panel</div>
            <div className="text-slate-400 text-xs">v2.0 Pro</div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="ml-auto w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center text-sm flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
              ${active === item.id
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
          >
            <span className="text-base flex-shrink-0">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
            {!collapsed && active === item.id && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />
            )}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-slate-700/50">
        <div className={`flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors`}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            A
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-medium truncate">Admin</div>
              <div className="text-slate-500 text-xs truncate">admin@crm.uz</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
