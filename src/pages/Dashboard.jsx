import { stats, recentOrders, chartData } from '../data/mockData';

const statusColors = {
  'Bajarildi': 'bg-emerald-100 text-emerald-700',
  'Jarayonda': 'bg-blue-100 text-blue-700',
  'Kutilmoqda': 'bg-amber-100 text-amber-700',
  'Bekor qilindi': 'bg-red-100 text-red-700',
};

const iconMap = {
  users: '👥',
  dollar: '💰',
  cart: '📦',
  chart: '📈',
};

function StatCard({ stat }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
          <p className="text-slate-900 text-2xl font-bold mt-1">{stat.value}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-xl">
          {iconMap[stat.icon]}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${stat.trend === 'up' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
          {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
        </span>
        <span className="text-slate-400 text-xs">o'tgan oyga nisbatan</span>
      </div>
    </div>
  );
}

function MiniChart() {
  const maxRevenue = Math.max(...chartData.map(d => d.revenue));
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-slate-800 font-semibold">Daromad Grafigi</h3>
          <p className="text-slate-400 text-sm">So'nggi 6 oy</p>
        </div>
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">↑ 8.2%</span>
      </div>
      <div className="flex items-end gap-3 h-36">
        {chartData.map((d, i) => {
          const h = Math.round((d.revenue / maxRevenue) * 100);
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="relative w-full">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-violet-500 to-indigo-400 group-hover:from-violet-600 group-hover:to-indigo-500 transition-all cursor-pointer"
                  style={{ height: `${h * 1.2}px` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity pointer-events-none">
                    ${(d.revenue / 1000).toFixed(0)}k
                  </div>
                </div>
              </div>
              <span className="text-slate-400 text-xs">{d.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(s => <StatCard key={s.id} stat={s} />)}
      </div>

      {/* Chart + Quick stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <MiniChart />
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="text-slate-800 font-semibold mb-4">Tezkor Ko'rsatkichlar</h3>
          <div className="space-y-4">
            {[
              { label: 'Buyurtma bajarish', value: 87, color: 'bg-violet-500' },
              { label: 'Mijoz qoniqishi', value: 92, color: 'bg-emerald-500' },
              { label: 'Mahsulot mavjudligi', value: 74, color: 'bg-blue-500' },
              { label: 'Konversiya darajasi', value: 53, color: 'bg-amber-500' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="text-slate-800 font-semibold">{item.value}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="text-slate-800 font-semibold">So'nggi Buyurtmalar</h3>
          <button className="text-violet-600 text-sm font-medium hover:text-violet-700">Barchasini ko'rish →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">ID</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Mijoz</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Mahsulot</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Summa</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Holat</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Sana</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-violet-600">{order.id}</td>
                  <td className="px-5 py-3.5 text-sm text-slate-700">{order.customer}</td>
                  <td className="px-5 py-3.5 text-sm text-slate-600">{order.product}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-slate-800">{order.amount}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-400">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
