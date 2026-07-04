import { Icon } from '@iconify/react';
import React from 'react';
import { toast } from 'sonner';

const Topbar = ({ onToggleMobileMenu }) => {
  // Ambil data user dari localStorage
  const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const user = userString ? JSON.parse(userString) : null;
  const userName = user?.name || user?.fullName || 'Owner';

  const handleUnderConstruction = (featureName) => {
    toast.info(`Fitur ${featureName} sedang dalam konstruksi (Under Construction)`);
  };

  return (
    <header>
      <div className="h-16 sm:h-20 lg:h-24 flex justify-between items-center bg-white w-full border-b-[0.5px] border-b-[#C8CBD9] px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Left: Hamburger (mobile/tablet only) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 -ml-1 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <Icon
              icon="mdi:menu"
              width="24"
              height="24"
              className="text-gray-600"
            />
          </button>
        </div>

        {/* Right: Profile & Notification */}
        <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-9">
          <div
            onClick={() => handleUnderConstruction('Profil')}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            title="Profil"
          >
            <div className="flex justify-between items-center space-x-3 sm:space-x-5 lg:space-x-8">
              <div className="flex space-x-2 sm:space-x-3 items-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <Icon icon="iconamoon:profile-fill" className="w-full h-full text-gray-600" />
                </div>
                <span className="text-sm sm:text-base font-medium text-gray-800">{userName}</span>
              </div>
              <Icon
                icon="iconamoon:arrow-up-2-light"
                width="24"
                height="24"
                className="rotate-180 hidden sm:block lg:w-8 lg:h-8 text-gray-500"
              />
            </div>
          </div>
          <div
            onClick={() => handleUnderConstruction('Notifikasi')}
            className="relative cursor-pointer hover:opacity-80 transition-opacity"
            title="Notifikasi"
          >
            <Icon
              icon="ion:notifcations"
              className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#B0C3CC]"
            />
            <div className="absolute w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full top-0 right-0 border border-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;