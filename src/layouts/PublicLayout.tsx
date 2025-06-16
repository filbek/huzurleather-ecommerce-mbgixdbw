import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from '../components/layout/PublicHeader';
import Footer from '../components/Footer';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
