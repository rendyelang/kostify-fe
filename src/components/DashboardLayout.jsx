import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar/DashboardSidebar';
import Topbar from "./Topbar";

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
      <main className="flex-1 w-full bg-[#F0F7FF] min-w-0">
        <Topbar onToggleMobileMenu={toggleMobileMenu} />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;