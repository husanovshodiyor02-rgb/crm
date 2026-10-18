import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ToastContainer from './components/Toast';
import { useToast } from './hooks/useToast';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Employees from './pages/Employees';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Tasks from './pages/Tasks';
import Inbox from './pages/Inbox';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState('light');
  const { toasts, removeToast, toast } = useToast();

  const isDark = theme === 'dark';

  const pageProps = { toast, theme, setTheme };

  const pages = {
    dashboard: <Dashboard {...pageProps} />,
    customers: <Customers {...pageProps} />,
    orders: <Orders {...pageProps} />,
    products: <Products {...pageProps} />,
    employees: <Employees {...pageProps} />,
    analytics: <Analytics {...pageProps} />,
    tasks: <Tasks {...pageProps} />,
    inbox: <Inbox {...pageProps} />,
    settings: <Settings {...pageProps} />,
  };

  return (
    <div className={`flex min-h-screen font-sans ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Sidebar
        active={page}
        onNavigate={setPage}
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
        isDark={isDark}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header page={page} isDark={isDark} />
        <main className="flex-1 overflow-auto">
          {pages[page] || pages.dashboard}
        </main>
      </div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
