import { useEffect, useState } from 'react';

const icons = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

const colors = {
  success: 'bg-emerald-500',
  error: 'bg-red-500',
  warning: 'bg-amber-500',
  info: 'bg-blue-500',
};

function ToastItem({ toast, onRemove }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, toast.duration || 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`flex items-center gap-3 bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 min-w-72 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <div className={`w-7 h-7 rounded-lg ${colors[toast.type || 'info']} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
        {icons[toast.type || 'info']}
      </div>
      <div className="flex-1 min-w-0">
        {toast.title && <div className="text-sm font-semibold text-slate-800">{toast.title}</div>}
        <div className="text-sm text-slate-500">{toast.message}</div>
      </div>
      <button onClick={() => onRemove(toast.id)} className="text-slate-300 hover:text-slate-500 transition-colors ml-1 text-lg leading-none">×</button>
    </div>
  );
}

export default function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
}
