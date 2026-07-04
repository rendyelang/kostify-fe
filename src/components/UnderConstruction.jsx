import { Icon } from '@iconify/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnderConstruction = ({ title, description }) => {
  const navigate = useNavigate();

  return (
    <main className="px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 pb-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="font-semibold text-lg sm:text-xl">{title}</h1>
        <p className="font-light text-xs text-gray-500 mt-0.5">
          Halaman ini sedang dalam tahap pengembangan
        </p>
      </div>

      {/* Under Construction Card */}
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 max-w-lg w-full text-center">
          {/* Animated Icon */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#3674B5]/5 animate-ping-slow" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#3674B5]/10 to-[#578FCA]/10 flex items-center justify-center">
              <Icon
                icon="fluent:wrench-screwdriver-20-filled"
                width="40"
                height="40"
                className="text-[#3674B5] sm:w-12 sm:h-12"
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
            Sedang Dalam Pengembangan
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-8 max-w-md mx-auto">
            {description}
          </p>

          {/* Decorative Progress Bar */}
          <div className="w-full max-w-xs mx-auto mb-8">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span>Progress</span>
              <span>Segera Hadir</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#3674B5] to-[#578FCA] rounded-full w-[35%] animate-progress" />
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#3674B5] hover:bg-[#2c5f95] text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md active:scale-[0.98]"
          >
            <Icon icon="mdi:arrow-left" width="18" height="18" />
            Kembali ke Dashboard
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.1;
          }
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 3s ease-in-out infinite;
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 35%; }
        }
        .animate-progress {
          animation: progress 1.5s ease-out forwards;
        }
      `}</style>
    </main>
  );
};

export default UnderConstruction;
