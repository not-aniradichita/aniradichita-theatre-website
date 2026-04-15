import { ReactNode, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { JoinModal } from '../components/JoinModal';
import { Navbar } from '../components/Navbar';
import { useUiStore } from '../store/uiStore';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { theme } = useUiStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="relative overflow-hidden">{children ?? <Outlet />}</main>
      <JoinModal />
      <Footer />
    </div>
  );
}
