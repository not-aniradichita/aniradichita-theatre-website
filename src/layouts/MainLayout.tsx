import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="relative overflow-hidden pt-[60px]">{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
}
