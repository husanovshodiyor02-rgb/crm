import { employees } from '../data/mockData';

const statusDot = {
  'Online': 'bg-emerald-500',
  'Offline': 'bg-slate-400',
  'Away': 'bg-amber-500',
};

const avatarColors = [
  'from-violet-400 to-purple-500',
  'from-blue-400 to-indigo-500',
  'from-emerald-400 to-teal-500',
  'from-orange-400 to-red-500',
  'from-pink-400 to-rose-500',
];

export default function Employees() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          {[
            { label: 'Jami xodimlar', value: employees.length, color: 'text-slate-800' },
            { label: 'Online', value: employees.filter(e => e.status === 'Online').length, color: 'text-emerald-600' },
            { label: 'Offline', value: employees.filter(e => e.status === 'Offline').length, color: 'text-slate-500' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
        <button className="px-4 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors shadow-md shadow-violet-600/20">
          + Xodim qo'shish
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((e, i) => (
          <div key={e.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-5">
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white font-bold text-sm`}>
                  {e.avatar}
                </div>
                <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${statusDot[e.status]}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-800 truncate">{e.name}</h3>
                <p className="text-xs text-slate-400">{e.role}</p>
                <span className="text-xs text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md mt-1 inline-block font-medium">{e.dept}</span>
              </div>
              <span className={`text-xs font-medium ${e.status === 'Online' ? 'text-emerald-600' : e.status === 'Away' ? 'text-amber-600' : 'text-slate-400'}`}>
                {e.status}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Samaradorlik</span>
                  <span className="font-semibold text-slate-700">{e.performance}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${e.performance >= 90 ? 'bg-emerald-500' : e.performance >= 80 ? 'bg-blue-500' : 'bg-amber-500'}`}
                    style={{ width: `${e.performance}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{e.tasks}</span> ta faol vazifa
              </div>
              <div className="flex gap-2">
                <button className="text-xs px-3 py-2 bg-violet-50 text-violet-600 rounded-lg hover:bg-violet-100 font-medium">Profil</button>
                <button className="text-xs px-3 py-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 font-medium">Xabar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
