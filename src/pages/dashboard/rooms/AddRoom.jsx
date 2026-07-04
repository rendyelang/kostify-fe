import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useAddRoom } from "../../../hooks/room.hook";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const AddRoom = () => {
  const navigate = useNavigate();
  const { mutate: addRoom, status } = useAddRoom();
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
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImages(files);

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("room_name", form.room_name);
    formData.append("price", form.price);
    formData.append("status", form.status);
    formData.append("facilities", form.facilities);
    formData.append("description", form.description);
    formData.append("floor", form.floor);
    formData.append("capacity", form.capacity);

    images.forEach((file) => {
      formData.append("images", file);
    });

    addRoom(formData, {
      onSuccess: (res) => {
        toast.success("Kamar berhasil ditambahkan!");
        setForm({
          room_name: "",
          price: "",
          status: "empty",
          facilities: "",
          description: "",
          floor: "",
          capacity: "",
        });
        setImages([]);
        setImagePreviews([]);
        queryClient.invalidateQueries({
          queryKey: ["roomsbyownerid"],
        });
        navigate("/dashboard/rooms");
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Terjadi kesalahan");
      },
    });
  };

  return (
    <main className="px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 pb-8">
      <h1 className="font-semibold text-xl mb-1">Tambah Kamar</h1>
      <p className="text-xs text-gray-500 mb-6">
        Informasi seluruh data kamar dan fasilitas didalamnya
      </p>

      <div className="bg-white shadow-md p-4 sm:p-6 lg:p-9 rounded-xl">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Upload Image */}
          <div className="w-full lg:w-60 space-y-3">
            <label htmlFor="input-image" className="cursor-pointer block">
              <div className="flex justify-center items-center w-full h-40 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
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

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <Icon icon="mdi:close" width={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form */}
          <div className="flex-1 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium">Nama Kamar</label>
                <input
                  name="room_name"
                  value={form.room_name}
                  onChange={handleChange}
                  placeholder="West-002"
                  className="w-full border-b bg-gray-100 border-b-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-b-2 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Harga /bulan</label>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="900000"
                  className="w-full border-b bg-gray-100 border-b-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-b-2 focus:border-blue-500"
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
                  className="w-full border-b bg-gray-100 border-b-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-b-2 focus:border-blue-500"
                >
                  <option>Pilih data nya</option>
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
                  className="w-full border-b bg-gray-100 border-b-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-b-2 focus:border-blue-500"
                >
                  <option>Pilih data nya</option>
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
                placeholder="AC, TV"
                className="w-full border-b bg-gray-100 border-b-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-b-2 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Deskripsi</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="comfortable room"
                className="w-full border-b bg-gray-100 border-b-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-b-2 focus:border-blue-500"
              />
            </div>

            <div className="pt-3 flex justify-end space-x-3 ">
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
                {status === "pending" ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddRoom;
