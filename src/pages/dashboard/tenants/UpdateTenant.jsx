import { Icon } from "@iconify/react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useEditTenant, useGetTenantById } from "../../../hooks/tenant.hook";
import { useGetRoomsByOwnerId } from "../../../hooks/room.hook";

const UpdateTenant = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {tenantId} = useParams();
  const { data: rooms } = useGetRoomsByOwnerId();
  const { data: tenant } = useGetTenantById(tenantId);
  const { mutate: editTenant, status } = useEditTenant();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    birth_place: '',
    room_id: '',
    birth_date: '',
    emergency_number: '',
  });

  useEffect(() => {
    if(tenant){
        setForm({
          name: tenant?.name,
          email: tenant?.email,
          phone_number: tenant?.phone,
          address: tenant?.address,
          birth_place: tenant?.birth_place,
          room_id: tenant?.room_id,
          birth_date: tenant?.birth_date.split("T")[0],
          emergency_number: tenant?.emergency_number,
        });
    }
   
  }, [tenant])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editTenant(
      {
        tenantId: tenantId,
        data: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            birth_place: form.birth_place,
            room_id: form.room_id,
            birth_date: form.birth_date,
            emergency_number: form.emergency_number,
        },
      },
      {
        onSuccess: (res) => {
          setForm({
            name: "",
            email: "",
            phone_number: "",
            address: "",
            birth_place: "",
            room_id: "",
            birth_date: "",
            emergency_number: "",
          });
          queryClient.invalidateQueries({
            queryKey: ["tenantsbyowner"],
          });
          navigate("/dashboard/tenants");
        },
        onError: (err) => {
          toast.error(err.response.data.message);
        },
      },
    );
  };

  return (
    <main className="px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 pb-8">
      <h1 className="font-semibold text-xl mb-1">Edit Data Penghuni</h1>
      <p className="text-xs text-gray-500 mb-6">
        Memperbaharui seluruh data penghuni yang ditambahkan
      </p>

      <div className="bg-white shadow-md p-4 sm:p-6 lg:p-9 rounded-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:gap-10">
          {/* Upload Image */}

          {/* Form */}
          <div className="flex-1 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium">Nama Lengkap</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Masukan nama penghuni"
                  className="w-full border-b bg-gray-100 border-b-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-b-2 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Alamat Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Masukan alamat email"
                  className="w-full border-b bg-gray-100 border-b-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-b-2 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nomer Telepon
                </label>
                <input
                  name="phone_number"
                  value={form.phone_number}
                  onChange={handleChange}
                  type="number"
                  placeholder="Masukan nomer telepon"
                  className="w-full border-b bg-gray-100 border-b-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-b-2 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tempat Lahir
                </label>
                <input
                  name="birth_place"
                  value={form.birth_place}
                  onChange={handleChange}
                  placeholder="Masukan tempat lahir"
                  className="w-full border-b bg-gray-100 border-b-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-b-2 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium">Tanggal Lahir</label>
                <input
                  name="birth_date"
                  value={form.birth_date}
                  type="date"
                  placeholder="Masukan tanggal lahir"
                  onChange={handleChange}
                  className="w-full border-b bg-gray-100 border-b-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-b-2 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Kamar</label>
                <select
                  name="room_id"
                  value={form.room_id}
                  onChange={handleChange}
                  className="w-full border-b bg-gray-100 border-b-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-b-2 focus:border-blue-500"
                >
                  <option>Pilih data nya</option>
                  {rooms?.map((room) => (
                    <option key={room.room_id} value={room.room_id}>
                      {room.room_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium">Nomer Darurat</label>
                <input
                  name="emergency_number"
                  value={form.emergency_number}
                  type="text"
                  placeholder="Masukan nomer darurat"
                  onChange={handleChange}
                  className="w-full border-b bg-gray-100 border-b-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-b-2 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Alamat Lengkap</label>
              <textarea
                name="address"
                value={form.address}
                rows={3}
                placeholder="Masukan alamat lengkap"
                onChange={handleChange}
                className="w-full border-b bg-gray-100 border-b-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-b-2 focus:border-blue-500"
              />
            </div>

            <div className="pt-3 flex justify-end space-x-3 ">
              <button
                type="button"
                onClick={() => navigate("/dashboard/tenants")}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-md text-sm"
              >
                Batal
              </button>
              <button
                disabled={status === "pending"}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md text-sm"
              >
                {status === "pending" ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UpdateTenant;
