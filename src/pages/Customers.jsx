import { useState } from 'react';
import { customers as initialCustomers } from '../data/mockData';
import Modal from '../components/Modal';

const statusColors = {
  'Faol': 'bg-emerald-100 text-emerald-700',
  'Nofaol': 'bg-slate-100 text-slate-600',
  'VIP': 'bg-amber-100 text-amber-700',
};

const avatarColors = [
  'from-violet-400 to-purple-500', 'from-blue-400 to-indigo-500',
  'from-emerald-400 to-teal-500', 'from-orange-400 to-red-500',
  'from-pink-400 to-rose-500', 'from-cyan-400 to-blue-500',
  'from-amber-400 to-orange-500', 'from-green-400 to-emerald-500',
];

export default function Customers({ toast }) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Barchasi');
  const [sort, setSort] = useState({ key: null, dir: 'asc' });
  const [detailOpen, setDetailOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', status: 'Faol' });

  function toggleSort(key) {
    setSort(s => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' });
  }

  function sortIcon(key) {
    if (sort.key !== key) return <span className="text-slate-300 ml-1">↕</span>;
    return <span className="text-violet-500 ml-1">{sort.dir === 'asc' ? '↑' : '↓'}</span>;
  }

  let filtered = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'Barchasi' || c.status === filter;
    return matchSearch && matchFilter;
  });

  if (sort.key) {
    filtered = [...filtered].sort((a, b) => {
      let av = a[sort.key], bv = b[sort.key];
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      return sort.dir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });
  }

  function addCustomer() {
    if (!form.name || !form.email) return;
    const newC = {
      id: Date.now(), ...form,
      orders: 0, spent: '$0', avatar: form.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
    };
    setCustomers(prev => [newC, ...prev]);
    toast?.success('Yangi mijoz qo\'shildi', form.name);
    setAddOpen(false);
    setForm({ name: '', email: '', phone: '', city: '', status: 'Faol' });
  }

  return (
    <div className="p-6 space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
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
        <div className="flex gap-2 flex-wrap">
          {['Barchasi', 'Faol', 'Nofaol', 'VIP'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                filter === f ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="ml-auto px-4 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors shadow-md shadow-violet-600/20 flex items-center gap-2"
        >
          + Yangi Mijoz
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {[['name', 'Mijoz'], ['phone', 'Aloqa'], ['city', 'Shahar'], ['orders', 'Buyurtmalar'], ['spent', 'Xarajat'], ['status', 'Holat']].map(([key, label]) => (
                  <th key={key} className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5 cursor-pointer hover:text-slate-700 select-none" onClick={() => toggleSort(key)}>
                    {label}{sortIcon(key)}
                  </th>
                ))}
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
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[c.status]}`}>{c.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => { setSelected(c); setDetailOpen(true); }}
                        className="text-xs px-3 py-2 bg-violet-50 text-violet-600 rounded-lg hover:bg-violet-100 font-medium"
                      >Ko'rish</button>
                      <button className="text-xs px-3 py-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 font-medium">Tahrir</button>
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
              <button key={p} className={`w-8 h-8 text-sm rounded-lg transition-colors flex items-center justify-center font-medium ${p === 1 ? 'bg-violet-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal open={detailOpen} onClose={() => setDetailOpen(false)} title="Mijoz Ma'lumotlari" size="lg">
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${avatarColors[0]} flex items-center justify-center text-white text-xl font-bold`}>
                {selected.avatar}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{selected.name}</h3>
                <p className="text-slate-400 text-sm">{selected.email}</p>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full mt-1 inline-block ${statusColors[selected.status]}`}>{selected.status}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Telefon', value: selected.phone },
                { label: 'Shahar', value: selected.city },
                { label: 'Jami buyurtmalar', value: `${selected.orders} ta` },
                { label: 'Jami xarajat', value: selected.spent },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-3.5">
                  <div className="text-xs text-slate-400 mb-1">{item.label}</div>
                  <div className="text-sm font-semibold text-slate-800">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors">Buyurtma qo'shish</button>
              <button className="flex-1 py-2.5 bg-slate-100 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-200 transition-colors">Tahrirlash</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Yangi Mijoz Qo'shish">
        <div className="space-y-4">
          {[
            { label: 'Ism Familiya', key: 'name', type: 'text', placeholder: 'Alisher Nazarov' },
            { label: 'Email', key: 'email', type: 'email', placeholder: 'alisher@gmail.com' },
            { label: 'Telefon', key: 'phone', type: 'tel', placeholder: '+998 90 000 00 00' },
            { label: 'Shahar', key: 'city', type: 'text', placeholder: 'Toshkent' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Holat</label>
            <select
              value={form.status}
              onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
            >
              <option>Faol</option>
              <option>Nofaol</option>
              <option>VIP</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={addCustomer} className="flex-1 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors">Saqlash</button>
            <button onClick={() => setAddOpen(false)} className="flex-1 py-2.5 bg-slate-100 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-200 transition-colors">Bekor qilish</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
