import { useState } from 'react';
import { recentOrders } from '../data/mockData';
import Modal from '../components/Modal';

const statusConfig = {
  'Bajarildi': { cls: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  'Jarayonda': { cls: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  'Kutilmoqda': { cls: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  'Bekor qilindi': { cls: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
};

const baseOrders = [
  ...recentOrders,
  { id: "#ORD-007", customer: "Sherzod Mirzayev", product: "Mac Mini M4", amount: "$699", status: "Bajarildi", date: "2026-10-08" },
  { id: "#ORD-008", customer: "Dilorom Sultanova", product: "iPhone 15 Pro", amount: "$999", status: "Jarayonda", date: "2026-10-07" },
  { id: "#ORD-009", customer: "Alisher Nazarov", product: "AirPods Pro", amount: "$249", status: "Kutilmoqda", date: "2026-10-06" },
  { id: "#ORD-010", customer: "Malika Yusupova", product: "iPad Air M2", amount: "$599", status: "Bekor qilindi", date: "2026-10-05" },
];

export default function Orders({ toast }) {
  const [orders, setOrders] = useState(baseOrders);
  const [filter, setFilter] = useState('Barchasi');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ key: null, dir: 'asc' });
  const [addOpen, setAddOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ customer: '', product: '', amount: '', status: 'Kutilmoqda', date: '' });

  function toggleSort(key) {
    setSort(s => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' });
  }
  function sortIcon(key) {
    if (sort.key !== key) return <span className="text-slate-300 ml-1">↕</span>;
    return <span className="text-violet-500 ml-1">{sort.dir === 'asc' ? '↑' : '↓'}</span>;
  }

  let filtered = orders.filter(o => {
    const matchStatus = filter === 'Barchasi' || o.status === filter;
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  if (sort.key) {
    filtered = [...filtered].sort((a, b) => {
      let av = a[sort.key]?.toLowerCase?.() ?? a[sort.key];
      let bv = b[sort.key]?.toLowerCase?.() ?? b[sort.key];
      return sort.dir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });
  }

  const counts = {
    'Barchasi': orders.length,
    'Bajarildi': orders.filter(o => o.status === 'Bajarildi').length,
    'Jarayonda': orders.filter(o => o.status === 'Jarayonda').length,
    'Kutilmoqda': orders.filter(o => o.status === 'Kutilmoqda').length,
    'Bekor qilindi': orders.filter(o => o.status === 'Bekor qilindi').length,
  };

  function addOrder() {
    if (!form.customer || !form.product) return;
    const newOrder = { id: `#ORD-${String(orders.length + 1).padStart(3, '0')}`, ...form };
    setOrders(prev => [newOrder, ...prev]);
    toast?.success('Yangi buyurtma qo\'shildi');
    setAddOpen(false);
    setForm({ customer: '', product: '', amount: '', status: 'Kutilmoqda', date: '' });
  }

  function updateStatus(id, status) {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    toast?.success('Holat yangilandi');
    setDetailOpen(false);
  }

  return (
    <div className="p-6 space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Jami', count: orders.length, color: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200' },
          { label: 'Bajarildi', count: counts['Bajarildi'], color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
          { label: 'Jarayonda', count: counts['Jarayonda'], color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
          { label: 'Kutilmoqda', count: counts['Kutilmoqda'], color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} border ${s.border} rounded-2xl p-4`}>
            <div className={`text-2xl font-bold ${s.color}`}>{s.count}</div>
            <div className="text-sm text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <input type="text" placeholder="Buyurtma qidirish..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['Barchasi', 'Bajarildi', 'Jarayonda', 'Kutilmoqda', 'Bekor qilindi'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all ${filter === f ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
            >
              {f} <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-md ${filter === f ? 'bg-white/20' : 'bg-slate-100'}`}>{counts[f]}</span>
            </button>
          ))}
        </div>
        <button onClick={() => setAddOpen(true)} className="ml-auto px-4 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors shadow-md shadow-violet-600/20">
          + Yangi Buyurtma
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {[['id','Buyurtma ID'],['customer','Mijoz'],['product','Mahsulot'],['amount','Summa'],['status','Holat'],['date','Sana']].map(([key, label]) => (
                  <th key={key} className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5 cursor-pointer hover:text-slate-700 select-none" onClick={() => toggleSort(key)}>
                    {label}{sortIcon(key)}
                  </th>
                ))}
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5">Amal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((o, i) => {
                const sc = statusConfig[o.status];
                return (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-5 py-4 text-sm font-semibold text-violet-600">{o.id}</td>
                    <td className="px-5 py-4 text-sm text-slate-700">{o.customer}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{o.product}</td>
                    <td className="px-5 py-4 text-sm font-bold text-slate-800">{o.amount}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${sc.cls}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />{o.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-400">{o.date}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setSelected(o); setDetailOpen(true); }} className="text-xs px-3 py-2 bg-violet-50 text-violet-600 rounded-lg hover:bg-violet-100 font-medium">Ko'rish</button>
                        <button className="text-xs px-3 py-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 font-medium">Tahrir</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between">
          <span className="text-sm text-slate-400">{filtered.length} ta buyurtma</span>
          <div className="flex gap-1">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-8 h-8 text-sm rounded-lg transition-colors flex items-center justify-center font-medium ${p === 1 ? 'bg-violet-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Yangi Buyurtma">
        <div className="space-y-4">
          {[
            { label: 'Mijoz ismi', key: 'customer', placeholder: 'Alisher Nazarov' },
            { label: 'Mahsulot', key: 'product', placeholder: 'MacBook Pro' },
            { label: 'Summa', key: 'amount', placeholder: '$999' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">{f.label}</label>
              <input type="text" placeholder={f.placeholder} value={form[f.key]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
              />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Holat</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400">
                {Object.keys(statusConfig).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Sana</label>
              <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={addOrder} className="flex-1 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors">Saqlash</button>
            <button onClick={() => setAddOpen(false)} className="flex-1 py-2.5 bg-slate-100 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-200 transition-colors">Bekor qilish</button>
          </div>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal open={detailOpen} onClose={() => setDetailOpen(false)} title="Buyurtma Tafsiloti">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Buyurtma ID', value: selected.id },
                { label: 'Mijoz', value: selected.customer },
                { label: 'Mahsulot', value: selected.product },
                { label: 'Summa', value: selected.amount },
                { label: 'Sana', value: selected.date },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-3.5">
                  <div className="text-xs text-slate-400 mb-1">{item.label}</div>
                  <div className="text-sm font-semibold text-slate-800">{item.value}</div>
                </div>
              ))}
              <div className="bg-slate-50 rounded-xl p-3.5">
                <div className="text-xs text-slate-400 mb-1">Joriy holat</div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusConfig[selected.status]?.cls}`}>{selected.status}</span>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-600 mb-2">Holatni o'zgartirish</div>
              <div className="flex gap-2 flex-wrap">
                {Object.keys(statusConfig).map(s => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all border ${selected.status === s ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
