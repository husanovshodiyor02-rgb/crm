import { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true, push: true, sms: false, reports: true,
  });
  const [theme, setTheme] = useState('light');

  const tabs = [
    { id: 'profile', label: 'Profil', icon: '👤' },
    { id: 'notifications', label: 'Bildirishnomalar', icon: '🔔' },
    { id: 'security', label: 'Xavfsizlik', icon: '🔒' },
    { id: 'appearance', label: 'Ko\'rinish', icon: '🎨' },
    { id: 'integrations', label: 'Integratsiyalar', icon: '🔗' },
  ];

  return (
    <div className="p-6">
      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Sidebar tabs */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-2 space-y-1">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === t.id
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
              <div>
                <h2 className="text-slate-800 font-semibold text-lg">Profil Ma'lumotlari</h2>
                <p className="text-slate-400 text-sm">Shaxsiy ma'lumotlaringizni yangilang</p>
              </div>
              <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                  A
                </div>
                <div>
                  <button className="px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors">
                    Rasm yuklash
                  </button>
                  <p className="text-slate-400 text-xs mt-2">PNG, JPG. Max 2MB</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Ism', value: 'Admin', type: 'text' },
                  { label: 'Familiya', value: 'User', type: 'text' },
                  { label: 'Email', value: 'admin@crm.uz', type: 'email' },
                  { label: 'Telefon', value: '+998 90 000 00 00', type: 'tel' },
                  { label: 'Lavozim', value: 'Super Admin', type: 'text' },
                  { label: 'Shahar', value: 'Toshkent', type: 'text' },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all"
                    />
                  </div>
                ))}
              </div>
              <button className="px-6 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors shadow-md shadow-violet-600/20">
                Saqlash
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
              <div>
                <h2 className="text-slate-800 font-semibold text-lg">Bildirishnomalar</h2>
                <p className="text-slate-400 text-sm">Qaysi bildirishnomalarni olishni tanlang</p>
              </div>
              <div className="space-y-4">
                {[
                  { key: 'email', label: 'Email bildirishnomalar', desc: 'Muhim yangiliklar emailga yuborilsin' },
                  { key: 'push', label: 'Push bildirishnomalar', desc: 'Brauzer orqali real-time xabarlar' },
                  { key: 'sms', label: 'SMS bildirishnomalar', desc: 'Telefonga qisqa xabarlar' },
                  { key: 'reports', label: 'Haftalik hisobotlar', desc: 'Avtomatik haftalik tahlil xulosasi' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <div className="text-sm font-medium text-slate-700">{item.label}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key] }))}
                      className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 ${notifications[item.key] ? 'bg-violet-600' : 'bg-slate-200'}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${notifications[item.key] ? 'left-5.5 translate-x-0.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
              <div>
                <h2 className="text-slate-800 font-semibold text-lg">Xavfsizlik</h2>
                <p className="text-slate-400 text-sm">Hisobingizni himoya qiling</p>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Joriy parol', placeholder: '••••••••', type: 'password' },
                  { label: 'Yangi parol', placeholder: '••••••••', type: 'password' },
                  { label: 'Parolni tasdiqlang', placeholder: '••••••••', type: 'password' },
                ].map((f, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="w-full max-w-md px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all"
                    />
                  </div>
                ))}
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="text-sm font-medium text-amber-700">Ikki bosqichli autentifikatsiya</div>
                <div className="text-xs text-amber-600 mt-1">Hisobingizni yanada xavfsiz qilish uchun 2FA yoqing</div>
                <button className="mt-3 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors">
                  2FA yoqish
                </button>
              </div>
              <button className="px-6 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors shadow-md shadow-violet-600/20">
                Parolni yangilash
              </button>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
              <div>
                <h2 className="text-slate-800 font-semibold text-lg">Ko'rinish</h2>
                <p className="text-slate-400 text-sm">Interfeys mavzusini sozlang</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['light', 'dark', 'system'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${theme === t ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <div className="text-2xl mb-2">
                      {t === 'light' ? '☀️' : t === 'dark' ? '🌙' : '💻'}
                    </div>
                    <div className="text-sm font-medium text-slate-700 capitalize">
                      {t === 'light' ? 'Yorug\'' : t === 'dark' ? 'Qorong\'u' : 'Sistema'}
                    </div>
                    {theme === t && <div className="text-xs text-violet-600 mt-1 font-medium">Tanlangan</div>}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-3">Asosiy rang</label>
                <div className="flex gap-3">
                  {['bg-violet-600', 'bg-blue-600', 'bg-emerald-600', 'bg-orange-500', 'bg-pink-600', 'bg-slate-800'].map((c, i) => (
                    <button key={i} className={`w-8 h-8 rounded-lg ${c} ${i === 0 ? 'ring-2 ring-offset-2 ring-violet-400' : ''} hover:scale-110 transition-transform`} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
              <div>
                <h2 className="text-slate-800 font-semibold text-lg">Integratsiyalar</h2>
                <p className="text-slate-400 text-sm">Tashqi xizmatlarni ulang</p>
              </div>
              {[
                { name: 'Stripe', desc: 'To\'lov tizimi', icon: '💳', connected: true },
                { name: 'Telegram Bot', desc: 'Bildirishnomalar uchun', icon: '✈️', connected: true },
                { name: 'Google Analytics', desc: 'Trafik tahlili', icon: '📊', connected: false },
                { name: 'Mailchimp', desc: 'Email marketing', icon: '📧', connected: false },
                { name: 'Slack', desc: 'Jamoa xabarlashimi', icon: '💬', connected: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-700">{item.name}</div>
                      <div className="text-xs text-slate-400">{item.desc}</div>
                    </div>
                  </div>
                  <button className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                    item.connected
                      ? 'bg-emerald-50 text-emerald-600 hover:bg-red-50 hover:text-red-500'
                      : 'bg-violet-50 text-violet-600 hover:bg-violet-100'
                  }`}>
                    {item.connected ? 'Ulangan ✓' : 'Ulash'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
