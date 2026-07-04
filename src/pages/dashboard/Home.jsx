import React from 'react';
import { Icon } from '@iconify/react';
import { useGetRoomsByOwnerId } from '../../hooks/room.hook';
import { useGetTenantsByOwner } from '../../hooks/tenant.hook';

const Home = () => {
  const rooms = useGetRoomsByOwnerId();
  const tenants = useGetTenantsByOwner();

  // ─── Compute real statistics ───
  // The hooks return data arrays directly (or empty arrays while loading)
  const roomsData = Array.isArray(rooms) ? rooms : (rooms?.data || []);
  const tenantsData = Array.isArray(tenants) ? tenants : (tenants?.data || []);

  const totalRooms = roomsData.length;
  const occupiedRooms = roomsData.filter((r) => r.status === 'full').length;
  const emptyRooms = roomsData.filter((r) => r.status === 'empty').length;
  const totalTenants = tenantsData.length;
  const estimatedRevenue = roomsData
    .filter((r) => r.status === 'full')
    .reduce((sum, r) => sum + Number(r.price || 0), 0);

  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  // ─── Stat cards config ───
  const stats = [
    {
      label: 'Total Kamar',
      value: totalRooms,
      icon: 'fluent:building-home-20-filled',
      bgLight: 'bg-blue-50',
      textColor: 'text-[#3674B5]',
    },
    {
      label: 'Kamar Terisi',
      value: occupiedRooms,
      icon: 'mdi:door-closed-lock',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    {
      label: 'Kamar Kosong',
      value: emptyRooms,
      icon: 'mdi:door-open',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
    {
      label: 'Total Penghuni',
      value: totalTenants,
      icon: 'mdi:account-group',
      bgLight: 'bg-violet-50',
      textColor: 'text-violet-600',
    },
  ];

  return (
    <main className="px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 pb-8">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="font-semibold text-lg sm:text-xl">Dashboard</h1>
        <p className="font-light text-xs sm:text-sm text-gray-500 mt-0.5">
          Ringkasan informasi properti dan penghuni kos Anda
        </p>
      </div>

      {/* ─── Summary Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg ${stat.bgLight} flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                <Icon icon={stat.icon} width="24" height="24" className={stat.textColor} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Revenue Card + Occupancy Rate ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Revenue */}
        <div className="bg-gradient-to-br from-[#3674B5] to-[#578FCA] rounded-xl p-6 text-white shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Icon icon="mdi:cash-multiple" width="22" height="22" />
            </div>
            <span className="text-sm font-medium text-white/80">
              Estimasi Pendapatan Bulanan
            </span>
          </div>
          <p className="text-3xl sm:text-4xl font-bold">
            Rp {estimatedRevenue.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-white/60 mt-2">
            Dihitung dari {occupiedRooms} kamar yang terisi
          </p>
        </div>

        {/* Occupancy Rate */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Icon icon="mdi:chart-donut" width="22" height="22" className="text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">
              Tingkat Hunian
            </span>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <p className="text-4xl sm:text-5xl font-bold text-gray-800">{occupancyRate}</p>
            <span className="text-lg font-medium text-gray-400 mb-1">%</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>{occupiedRooms} terisi</span>
            <span>{emptyRooms} kosong</span>
          </div>
        </div>
      </div>

      {/* ─── Room Quick Overview ─── */}
      {roomsData.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-base sm:text-lg text-gray-800">
              Status Kamar
            </h2>
            <span className="text-xs text-gray-400">
              {totalRooms} kamar terdaftar
            </span>
          </div>

          {/* Room Status Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {roomsData.map((room) => {
              const isFull = room.status === 'full';
              return (
                <div
                  key={room.room_id}
                  className={`rounded-lg border p-3 text-center transition-all duration-200 hover:shadow-sm ${
                    isFull
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <Icon
                    icon={isFull ? 'mdi:door-closed-lock' : 'mdi:door-open'}
                    width="24"
                    height="24"
                    className={`mx-auto mb-1 ${
                      isFull ? 'text-emerald-500' : 'text-amber-500'
                    }`}
                  />
                  <p className="text-xs font-semibold text-gray-700 truncate">
                    {room.room_name}
                  </p>
                  <p
                    className={`text-[10px] font-medium mt-0.5 ${
                      isFull ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {isFull ? 'Terisi' : 'Kosong'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;