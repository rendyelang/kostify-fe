import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteRoomById, useGetRoomById } from "../../hooks/room.hook";
import { useQueryClient } from "@tanstack/react-query";

const DialogDetailRoom = () => {
  const navigate = useNavigate();
  const { room_id } = useParams();
  const queryClient = useQueryClient();


  const { data, isLoading } = useGetRoomById(room_id);
  const room = data?.data?.data;

  const {mutate: deleteRoomById, status: deleteStatus} = useDeleteRoomById();

  const onClose = () => {
    navigate("/dashboard/rooms");
  };

  const onDelete = (room_id) => {
    deleteRoomById(room_id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["roomsbyownerid"],
        });
        navigate('/dashboard/rooms')
      }
    })
  }

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!room) return null;

  return (
    <div className="absolute inset-0 z-10 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-100px)] flex justify-center items-center backdrop-blur-sm bg-white/10 p-4">
      <div className="relative bg-white max-w-2xl w-full rounded-xl overflow-hidden shadow-md max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <div className="absolute right-3 top-3 z-10">
          <button
            onClick={onClose}
            className="rounded-full p-1 backdrop-blur-md bg-white/60 hover:bg-white/80 transition"
          >
            <Icon icon="material-symbols:close-rounded" width="24" />
          </button>
        </div>

        {/* Image */}
        <img
          src={room.image_url?.[0]}
          alt={room.room_name}
          className="h-48 sm:h-64 lg:h-96 w-full object-cover"
        />

        {/* Content */}
        <div className="px-6 py-6">
          <h1 className="font-semibold text-3xl mb-2">{room.room_name}</h1>

          <h2 className="font-medium text-xl mb-3">
            Rp {Number(room.price).toLocaleString("id-ID")}
          </h2>

          <p className="text-base mb-3 text-gray-900">
            Lantai {room.floor} || {room.capacity} Orang
          </p>

          <p className="text-base mb-4 text-gray-900">{room.description}</p>

          <p className="text-sm mb-4 text-gray-600">
            <span className="font-medium">Fasilitas:</span> {room.facilities}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => onDelete(room.room_id)}
              className="h-12 flex-1 bg-red-600 hover:bg-red-600/90 text-white rounded-md transition"
            >
              {deleteStatus === "pending" ? "Loading..." : "Hapus"}
            </button>
            <button
              onClick={() => navigate(`/dashboard/rooms/${room.room_id}/edit`)}
              className="h-12 flex-1 bg-blue-600 hover:bg-blue-600/90 text-white rounded-md transition"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogDetailRoom;
