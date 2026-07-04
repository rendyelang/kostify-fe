import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import ListTenants from '../../../components/Tenants/ListTenants';
import DialogDeleteTenant from '../../../components/Tenants/DialogDeleteTenant';
import { useState } from 'react';

const Tenants = () => {
  const navigate = useNavigate();
  const [tenantId, setTenantId] = useState(null);

  const handleOpenDeleteDialog = (id) => {
    setTenantId(id);
  };

  const handleCloseDeleteDialog = () => {
    setTenantId(null);
  };

  return (
    <main className="px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 pb-8 relative">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 w-full">
        <div>
          <h1 className="font-semibold text-lg sm:text-xl">Data Penghuni</h1>
          <p className="font-light text-xs">Informasi seluruh data penghuni</p>
        </div>
        <button onClick={() => navigate("/dashboard/tenants/add")} className="self-start sm:self-auto">
          <Icon
            icon="icon-park-solid:add"
            className="text-[#3674B5]"
            width="36"
            height="36"
          />
        </button>
      </div>
      <ListTenants onOpenDeleteDialog={handleOpenDeleteDialog} />
      <DialogDeleteTenant onClose={handleCloseDeleteDialog} tenantId={tenantId} />
    </main>
  );
};

export default Tenants;