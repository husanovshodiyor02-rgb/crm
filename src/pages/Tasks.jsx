import { useState } from 'react';
import Modal from '../components/Modal';

const initialTasks = {
  todo: [
    { id: 1, title: 'Yangi mijozlar bazasini yangilash', priority: 'Yuqori', assignee: 'SU', due: '2026-10-20' },
    { id: 2, title: 'Q4 hisobotini tayyorlash', priority: 'O\'rta', assignee: 'GA', due: '2026-10-25' },
    { id: 3, title: 'Mahsulot katalogini tekshirish', priority: 'Past', assignee: 'FN', due: '2026-10-28' },
  ],
  inprogress: [
    { id: 4, title: 'Mijoz qo\'llab-quvvatlash tizimini sozlash', priority: 'Yuqori', assignee: 'TX', due: '2026-10-19' },
    { id: 5, title: 'Marketing kampaniyasini ishga tushirish', priority: 'O\'rta', assignee: 'FN', due: '2026-10-22' },
  ],
  review: [
    { id: 6, title: 'Yangi onboarding jarayoni', priority: 'O\'rta', assignee: 'GA', due: '2026-10-18' },
  ],
  done: [
    { id: 7, title: 'CRM panel dizaynini tasdiqlash', priority: 'Yuqori', assignee: 'SU', due: '2026-10-15' },
    { id: 8, title: 'Xodimlar bilan uchrashuvni o\'tkazish', priority: 'Past', assignee: 'US', due: '2026-10-14' },
  ],
};

const columns = [
  { id: 'todo', label: 'Bajarilmagan', color: 'bg-slate-400', light: 'bg-slate-50 border-slate-200' },
  { id: 'inprogress', label: 'Jarayonda', color: 'bg-blue-500', light: 'bg-blue-50 border-blue-200' },
  { id: 'review', label: 'Ko\'rib chiqilmoqda', color: 'bg-amber-500', light: 'bg-amber-50 border-amber-200' },
  { id: 'done', label: 'Bajarildi', color: 'bg-emerald-500', light: 'bg-emerald-50 border-emerald-200' },
];

const priorityColors = {
  'Yuqori': 'bg-red-100 text-red-600',
  'O\'rta': 'bg-amber-100 text-amber-600',
  'Past': 'bg-slate-100 text-slate-500',
};

const avatarColors = ['from-violet-400 to-purple-500', 'from-blue-400 to-indigo-500', 'from-emerald-400 to-teal-500', 'from-orange-400 to-red-500', 'from-pink-400 to-rose-500'];

export default function Tasks({ toast }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [modalOpen, setModalOpen] = useState(false);
  const [dragTask, setDragTask] = useState(null);
  const [dragFrom, setDragFrom] = useState(null);
  const [form, setForm] = useState({ title: '', priority: 'O\'rta', assignee: 'SU', due: '', col: 'todo' });

  const totalTasks = Object.values(tasks).flat().length;
  const doneTasks = tasks.done.length;

  function handleDragStart(task, colId) {
    setDragTask(task);
    setDragFrom(colId);
  }

  function handleDrop(colId) {
    if (!dragTask || dragFrom === colId) return;
    setTasks(prev => {
      const from = prev[dragFrom].filter(t => t.id !== dragTask.id);
      const to = [...prev[colId], dragTask];
      return { ...prev, [dragFrom]: from, [colId]: to };
    });
    toast?.success(`Vazifa "${dragTask.title.slice(0, 20)}..." ko'chirildi`);
    setDragTask(null);
    setDragFrom(null);
  }

  function addTask() {
    if (!form.title.trim()) return;
    const newTask = { id: Date.now(), title: form.title, priority: form.priority, assignee: form.assignee, due: form.due };
    setTasks(prev => ({ ...prev, [form.col]: [...prev[form.col], newTask] }));
    toast?.success('Yangi vazifa qo\'shildi');
    setModalOpen(false);
    setForm({ title: '', priority: 'O\'rta', assignee: 'SU', due: '', col: 'todo' });
  }

  function deleteTask(colId, taskId) {
    setTasks(prev => ({ ...prev, [colId]: prev[colId].filter(t => t.id !== taskId) }));
    toast?.info('Vazifa o\'chirildi');
  }

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div>
            <div className="text-2xl font-bold text-slate-800">{doneTasks}/{totalTasks}</div>
            <div className="text-xs text-slate-400">Bajarildi</div>
          </div>
          <div className="h-10 w-px bg-slate-200" />
          <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${(doneTasks / totalTasks) * 100}%` }} />
          </div>
          <span className="text-sm text-slate-500">{Math.round((doneTasks / totalTasks) * 100)}%</span>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors shadow-md shadow-violet-600/20"
        >
          + Vazifa qo'shish
        </button>
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map(col => (
          <div
            key={col.id}
            className="flex flex-col gap-3"
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop(col.id)}
          >
            {/* Column header */}
            <div className={`flex items-center justify-between px-3 py-2 rounded-xl border ${col.light}`}>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                <span className="text-sm font-semibold text-slate-700">{col.label}</span>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                {tasks[col.id].length}
              </span>
            </div>

            {/* Tasks */}
            <div className="space-y-2 min-h-24">
              {tasks[col.id].map((task, i) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task, col.id)}
                  className="bg-white rounded-xl border border-slate-100 shadow-sm p-3.5 cursor-grab active:cursor-grabbing hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-slate-700 leading-snug">{task.title}</p>
                    <button
                      onClick={() => deleteTask(col.id, task.id)}
                      className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all text-lg leading-none flex-shrink-0"
                    >×</button>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                    <div className="flex items-center gap-2">
                      {task.due && <span className="text-xs text-slate-400">{task.due.slice(5)}</span>}
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}>
                        {task.assignee[0]}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {tasks[col.id].length === 0 && (
                <div className="h-16 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-300 text-sm">
                  Bu yerga tashlang
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Yangi Vazifa">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Vazifa nomi</label>
            <input
              type="text"
              placeholder="Vazifa nomini kiriting..."
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Muhimlik</label>
              <select
                value={form.priority}
                onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
              >
                <option>Yuqori</option>
                <option>O'rta</option>
                <option>Past</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Ustun</label>
              <select
                value={form.col}
                onChange={e => setForm(f => ({ ...f, col: e.target.value }))}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
              >
                {columns.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Muddat</label>
            <input
              type="date"
              value={form.due}
              onChange={e => setForm(f => ({ ...f, due: e.target.value }))}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={addTask}
              className="flex-1 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors"
            >
              Qo'shish
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="flex-1 py-2.5 bg-slate-100 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-200 transition-colors"
            >
              Bekor qilish
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
