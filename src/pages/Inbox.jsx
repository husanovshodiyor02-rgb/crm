import { useState } from 'react';

const initialMessages = [
  { id: 1, from: 'Alisher Nazarov', avatar: 'AN', color: 'from-violet-400 to-purple-500', subject: 'Buyurtma haqida savol', preview: 'Salom, mening #ORD-001 buyurtmam qachon yetib keladi?', time: '10:32', read: false, starred: false },
  { id: 2, from: 'Malika Yusupova', avatar: 'MY', color: 'from-blue-400 to-indigo-500', subject: 'Mahsulot qaytarish', preview: 'iPhone 15 ni qaytarmoqchiman, qanday qilaman?', time: '09:15', read: false, starred: true },
  { id: 3, from: 'Sarvar Usmonov', avatar: 'SU', color: 'from-emerald-400 to-teal-500', subject: 'Haftalik hisobot', preview: 'Bu hafta 47 ta yangi mijoz qo\'shildi, daromad 12% oshdi.', time: 'Kecha', read: true, starred: false },
  { id: 4, from: 'Zulfiya Karimova', avatar: 'ZK', color: 'from-orange-400 to-red-500', subject: 'VIP mijoz so\'rovi', preview: 'Maxsus chegirma haqida gaplashmoqchiman, iltimos aloqaga chiqing.', time: 'Kecha', read: true, starred: true },
  { id: 5, from: 'Gulnora Azimova', avatar: 'GA', color: 'from-pink-400 to-rose-500', subject: 'Qo\'llab-quvvatlash yangilanishi', preview: 'Bugun 12 ta murojaat hal qilindi, 2 tasi kutilmoqda.', time: 'Dush', read: true, starred: false },
  { id: 6, from: 'Jasur Toshmatov', avatar: 'JT', color: 'from-cyan-400 to-blue-500', subject: 'To\'lov muammosi', preview: 'Karta orqali to\'lov amalga oshmayapti, yordam bering.', time: 'Dush', read: true, starred: false },
];

export default function Inbox({ toast }) {
  const [messages, setMessages] = useState(initialMessages);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [reply, setReply] = useState('');

  const unread = messages.filter(m => !m.read).length;

  const filtered = messages.filter(m => {
    if (filter === 'unread') return !m.read;
    if (filter === 'starred') return m.starred;
    return true;
  });

  function openMessage(msg) {
    setSelected(msg);
    if (!msg.read) {
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m));
    }
  }

  function toggleStar(id, e) {
    e.stopPropagation();
    setMessages(prev => prev.map(m => m.id === id ? { ...m, starred: !m.starred } : m));
  }

  function deleteMessage(id, e) {
    e.stopPropagation();
    setMessages(prev => prev.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
    toast?.info('Xabar o\'chirildi');
  }

  function sendReply() {
    if (!reply.trim()) return;
    toast?.success('Javob yuborildi');
    setReply('');
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex h-[calc(100vh-10rem)]">
        {/* Left panel */}
        <div className="w-80 flex-shrink-0 border-r border-slate-100 flex flex-col">
          {/* Filters */}
          <div className="p-4 border-b border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Inbox</h3>
              {unread > 0 && (
                <span className="text-xs font-bold text-white bg-violet-600 px-2 py-0.5 rounded-full">{unread}</span>
              )}
            </div>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
              {[['all', 'Barchasi'], ['unread', 'O\'qilmagan'], ['starred', 'Yulduzli']].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setFilter(val)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${filter === val ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Message list */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
            {filtered.map(msg => (
              <div
                key={msg.id}
                onClick={() => openMessage(msg)}
                className={`px-4 py-3.5 cursor-pointer hover:bg-slate-50 transition-colors group relative ${selected?.id === msg.id ? 'bg-violet-50 border-r-2 border-violet-500' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${msg.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5`}>
                    {msg.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-sm truncate ${!msg.read ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>{msg.from}</span>
                      <span className="text-xs text-slate-400 flex-shrink-0">{msg.time}</span>
                    </div>
                    <div className={`text-xs truncate mt-0.5 ${!msg.read ? 'font-medium text-slate-700' : 'text-slate-500'}`}>{msg.subject}</div>
                    <div className="text-xs text-slate-400 truncate mt-0.5">{msg.preview}</div>
                  </div>
                </div>
                {!msg.read && <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-violet-600 rounded-full" />}
                <div className="absolute right-4 top-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg shadow-sm border border-slate-100 p-1">
                  <button onClick={e => toggleStar(msg.id, e)} className={`text-sm ${msg.starred ? 'text-amber-400' : 'text-slate-300 hover:text-amber-400'}`}>★</button>
                  <button onClick={e => deleteMessage(msg.id, e)} className="text-sm text-slate-300 hover:text-red-400">×</button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="flex items-center justify-center h-32 text-slate-400 text-sm">Xabar yo'q</div>
            )}
          </div>
        </div>

        {/* Right panel */}
        {selected ? (
          <div className="flex-1 flex flex-col min-w-0">
            <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${selected.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                  {selected.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{selected.subject}</div>
                  <div className="text-sm text-slate-400">Kimdan: {selected.from} · {selected.time}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={e => toggleStar(selected.id, e)} className={`w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-sm transition-colors ${selected.starred ? 'text-amber-400 bg-amber-50' : 'text-slate-400 hover:bg-slate-50'}`}>★</button>
                <button onClick={e => deleteMessage(selected.id, e)} className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-50 transition-colors text-sm">🗑</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">
                {selected.preview}
              </div>
            </div>
            <div className="p-4 border-t border-slate-100">
              <div className="flex gap-3">
                <textarea
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  placeholder="Javob yozing..."
                  rows={2}
                  className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 resize-none"
                />
                <button
                  onClick={sendReply}
                  className="px-5 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors self-end"
                >
                  Yuborish
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-300">
            <div className="text-center">
              <div className="text-5xl mb-3">✉️</div>
              <div className="text-sm">Xabar tanlang</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
