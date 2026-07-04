import React from 'react';
import SidebarContent from './SidebarContent';
import SidebarHeader from './SidebarHeader';

const DashboardSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 sm:w-80 bg-white h-screen overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto lg:w-80 xl:w-96
          lg:flex-shrink-0
        `}
      >
        <SidebarHeader />
        <SidebarContent onClose={onClose} />
      </aside>
    </>
  );
};

export default DashboardSidebar;