import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useEditRoomById, useGetRoomById } from "../../../hooks/room.hook";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const UpdateRoom = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const { data, isLoading } = useGetRoomById(roomId);
  const { mutate: editRoom, status } = useEditRoomById();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    room_name: "",
    price: "",
    status: "empty",
    facilities: "",
    description: "",
    floor: "",
    capacity: "",
  });

  const [images, setImages] = useState([]);

  /* ================= PREFILL FORM ================= */
  useEffect(() => {
    if (!data) return;

    const room = data.data.data;

    setForm({
      room_name: room.room_name,
      price: room.price,
      status: room.status,
      facilities: room.facilities,
      description: room.description,
      floor: room.floor,
      capacity: room.capacity,
    });
  }, [data]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    images.forEach((file) => {
      formData.append("images", file);
    });

    editRoom(
      { roomId, data: formData },
      {
        onSuccess: () => {
          toast.success("Kamar berhasil diperbarui");
          queryClient.invalidateQueries({
            queryKey: ["roomsbyownerid"],
          });
          queryClient.invalidateQueries({
            queryKey: ["room", roomId],
          });
          navigate("/dashboard/rooms");
        },
        onError: (err) => {
          toast.error(err.response?.data?.message || "Gagal update kamar");
        },
      }
    );
  };

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 text-sm text-gray-500">
        Loading data kamar...
      </div>
    );
  }

  return (
    <main className="px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 pb-8">
      <h1 className="font-semibold text-xl mb-1">Edit Kamar</h1>
      <p className="text-xs text-gray-500 mb-6">
        Perbarui informasi kamar dan fasilitas
      </p>

      <div className="bg-white shadow-md p-4 sm:p-6 lg:p-9 rounded-xl">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Upload Image */}
          <label htmlFor="input-image" className="cursor-pointer">
            <div className="flex justify-center items-center w-full lg:w-60 h-48 lg:h-60 bg-gray-200 rounded-lg">
              <div className="text-center">
                <Icon
                  icon="material-symbols:cloud-upload"
                  width={24}
                  className="mx-auto text-gray-500"
                />
                <p className="text-gray-500 text-sm mt-2">
                  Upload Image ({images.length})
                </p>
              </div>
            </div>
            <input
              id="input-image"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          {/* Form */}
          <div className="flex-1 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium">Nama Kamar</label>
                <input
                  name="room_name"
                  value={form.room_name}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Harga /bulan</label>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1">Lantai</label>
                <select
                  name="floor"
                  value={form.floor}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2 text-sm bg-white"
                >
                  <option value="">Pilih data nya</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Kapasitas
                </label>
                <select
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2 text-sm bg-white"
                >
                  <option value="">Pilih data nya</option>
                  <option value={1}>1 Orang</option>
                  <option value={2}>2 Orang</option>
                  <option value={3}>3 Orang</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Fasilitas</label>
              <textarea
                name="facilities"
                value={form.facilities}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded-md px-4 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Deskripsi</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded-md px-4 py-2 text-sm"
              />
            </div>

            <div className="pt-3 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate("/dashboard/rooms")}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-md text-sm"
              >
                Batal
              </button>
              <button
                disabled={status === "pending"}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md text-sm"
              >
                {status === "pending" ? "Loading..." : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UpdateRoom;
