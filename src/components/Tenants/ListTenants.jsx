import { Icon } from '@iconify/react';
import React from 'react';
import { useGetTenantsByOwner } from '../../hooks/tenant.hook';
import { useNavigate } from 'react-router-dom';

const ListTenants = ({ onOpenDeleteDialog }) => {
  const navigate = useNavigate();
  const { data: tenants } = useGetTenantsByOwner();

  // ─── Mobile Card View for small screens ───
  const MobileCard = ({ tenant, index }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#3674B5]/10 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-[#3674B5]">{index + 1}</span>
          </div>
          <div className="min-w-0">
            <p className="font-medium text-sm text-gray-800 truncate">{tenant.name}</p>
            <p className="text-xs text-gray-500 truncate">{tenant.email}</p>
          </div>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => navigate(`/dashboard/tenants/${tenant.tenant_id}/edit`)}
            className="p-1.5 rounded-md hover:bg-blue-50 transition-colors"
            title="Edit"
          >
            <Icon icon="mdi:pencil-outline" className="text-blue-500" width="16" height="16" />
          </button>
          <button
            onClick={() => onOpenDeleteDialog(tenant.tenant_id)}
            className="p-1.5 rounded-md hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <Icon icon="tabler:trash" className="text-red-500" width="16" height="16" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-gray-400">Telepon</span>
          <p className="text-gray-700 font-medium truncate">{tenant.phone || '-'}</p>
        </div>
        <div>
          <span className="text-gray-400">Keterangan</span>
          <p className="text-gray-700 font-medium truncate">{tenant.keterangan || '-'}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full mt-6 sm:mt-8">
      {/* ─── Mobile Card Layout (< md) ─── */}
      <div className="md:hidden space-y-3">
        {tenants?.map((tenant, index) => (
          <MobileCard key={tenant.tenant_id} tenant={tenant} index={index} />
        ))}
        {(!tenants || tenants.length === 0) && (
          <p className="text-center text-gray-400 text-sm py-8">Belum ada data penghuni</p>
        )}
      </div>

      {/* ─── Desktop Table Layout (>= md) ─── */}
      <div className="hidden md:block max-w-7xl mx-auto">
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-[#EAEAEA]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 border-r w-12">
                    No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 border-r">
                    Nama Lengkap
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 border-r">
                    Alamat Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 border-r">
                    No Telepon
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 border-r">
                    Keterangan
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 w-24">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {tenants?.map((tenant, index) => (
                  <tr key={tenant.tenant_id}>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {tenant.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {tenant.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {tenant.phone}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {tenant.keterangan}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            navigate(
                              `/dashboard/tenants/${tenant.tenant_id}/edit`,
                            )
                          }
                          className="p-1.5 text-white rounded transition-colors"
                          title="Edit"
                        >
                          <Icon
                            icon="mdi:pencil-outline"
                            className="text-blue-500 hover:text-blue-600"
                            width="16"
                            height="16"
                          />
                        </button>
                        <button
                          onClick={() => onOpenDeleteDialog(tenant.tenant_id)}
                          className="p-1.5 text-white rounded transition-colors"
                          title="Delete"
                        >
                          <Icon
                            icon="tabler:trash"
                            className="text-red-500 hover:text-red-600"
                            width="16"
                            height="16"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTenants;