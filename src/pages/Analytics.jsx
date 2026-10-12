import { chartData, stats } from '../data/mockData';

const maxRevenue = Math.max(...chartData.map(d => d.revenue));
const maxOrders = Math.max(...chartData.map(d => d.orders));

export default function Analytics() {
  return (
    <div className="p-6 space-y-6">
      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-slate-800 font-semibold text-lg">Daromad Tahlili</h3>
            <p className="text-slate-400 text-sm">So'nggi 6 oy ko'rsatkichlari</p>
          </div>
          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-slate-500"><span className="w-3 h-3 rounded-sm bg-violet-500 inline-block" /> Daromad</span>
            <span className="flex items-center gap-1.5 text-slate-500"><span className="w-3 h-3 rounded-sm bg-blue-400 inline-block" /> Buyurtmalar</span>
          </div>
        </div>
        <div className="flex items-end gap-6 h-48">
          {chartData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full flex gap-1 items-end">
                <div
                  className="flex-1 bg-gradient-to-t from-violet-500 to-indigo-400 rounded-t-lg group-hover:from-violet-600 group-hover:to-indigo-500 transition-all cursor-pointer relative"
                  style={{ height: `${(d.revenue / maxRevenue) * 160}px` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1.5 rounded-lg whitespace-nowrap pointer-events-none z-10">
                    ${(d.revenue / 1000).toFixed(0)}k
                  </div>
                </div>
                <div
                  className="flex-1 bg-gradient-to-t from-blue-400 to-sky-300 rounded-t-lg transition-all cursor-pointer"
                  style={{ height: `${(d.orders / maxOrders) * 120}px` }}
                />
              </div>
              <span className="text-xs text-slate-400 font-medium">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funnel */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-slate-800 font-semibold mb-5">Savdo Hunisi</h3>
          <div className="space-y-3">
            {[
              { label: 'Tashrif buyuruvchilar', value: 12480, pct: 100, color: 'bg-violet-500' },
              { label: 'Mahsulot ko\'rganlar', value: 7830, pct: 62.7, color: 'bg-indigo-400' },
              { label: 'Savatga qo\'shganlar', value: 3210, pct: 25.7, color: 'bg-blue-400' },
              { label: 'To\'lov boshlaganlar', value: 1560, pct: 12.5, color: 'bg-sky-400' },
              { label: 'Buyurtma yakunlaganlar', value: 658, pct: 5.3, color: 'bg-cyan-400' },
            ].map((step, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-600">{step.label}</span>
                  <div className="flex gap-3 text-slate-800 font-medium">
                    <span>{step.value.toLocaleString()}</span>
                    <span className="text-slate-400 w-12 text-right">{step.pct}%</span>
                  </div>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${step.color} rounded-full`} style={{ width: `${step.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-slate-800 font-semibold mb-5">Top Mahsulotlar</h3>
          <div className="space-y-4">
            {[
              { name: 'iPhone 15 Pro', sales: 389, revenue: '$389,000', share: 32 },
              { name: 'AirPods Pro', sales: 512, revenue: '$127,000', share: 24 },
              { name: 'MacBook Air M3', sales: 267, revenue: '$347,000', share: 18 },
              { name: 'iPad Air M2', sales: 203, revenue: '$122,000', share: 14 },
              { name: 'Apple Watch S9', sales: 178, revenue: '$71,000', share: 12 },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-lg font-bold text-slate-200 w-5">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 font-medium truncate">{p.name}</span>
                    <span className="text-slate-500 flex-shrink-0 ml-2">{p.share}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full" style={{ width: `${p.share * 3}%` }} />
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-700 w-20 text-right">{p.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-slate-800 font-semibold">Oylik Hisobot</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Oy</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Daromad</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Buyurtmalar</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">O'sish</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {chartData.map((d, i) => {
                const prev = chartData[i - 1];
                const growth = prev ? (((d.revenue - prev.revenue) / prev.revenue) * 100).toFixed(1) : null;
                const isUp = growth !== null && parseFloat(growth) >= 0;
                return (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3.5 text-sm font-medium text-slate-700">{d.month} 2026</td>
                    <td className="px-5 py-3.5 text-sm font-bold text-slate-800">${d.revenue.toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">{d.orders}</td>
                    <td className="px-5 py-3.5">
                      {growth !== null ? (
                        <span className={`text-xs font-semibold ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>
                          {isUp ? '↑' : '↓'} {Math.abs(growth)}%
                        </span>
                      ) : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${i === chartData.length - 1 ? 'bg-violet-100 text-violet-700' : 'bg-slate-100 text-slate-500'}`}>
                        {i === chartData.length - 1 ? 'Joriy oy' : 'Yakunlandi'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
