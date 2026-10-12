import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Employees from './pages/Employees';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const pages = {
  dashboard: Dashboard,
  customers: Customers,
  orders: Orders,
  products: Products,
  employees: Employees,
  analytics: Analytics,
  settings: Settings,
};

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  const PageComponent = pages[page] || Dashboard;

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar
        active={page}
        onNavigate={setPage}
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header page={page} />
        <main className="flex-1 overflow-auto">
          <PageComponent />
        </main>
      </div>
    </div>
  );
}
