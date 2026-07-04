import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ListRooms = ({ rooms }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      {rooms?.map((room) => (
        <div
          className="flex flex-col shadow-md bg-white rounded-xl p-4 hover:shadow-lg transition-shadow duration-200"
          key={room.room_id}
        >
          <img
            src={room.image_url[0]}
            alt="room_image"
            className="h-36 sm:h-40 w-full object-cover rounded-md mb-3"
          />
          <div className="flex justify-between items-center">
            <h1 className="font-medium text-lg sm:text-xl truncate">{room.room_name}</h1>
            <p className="font-normal text-xs flex space-x-2 flex-shrink-0 ml-2">
              <Icon icon="iconamoon:profile-thin" width="16" height="16" />
              <span>{room.capacity} orang</span>
            </p>
          </div>
          <h2 className="text-sm font-light mb-2">
            Rp {Number(room.price).toLocaleString("id-ID")}/bulan
          </h2>
          <p className="mb-4 text-sm text-gray-600 line-clamp-2">{room.description}</p>
          <button
            onClick={() => navigate(`/dashboard/rooms/${room.room_id}`)}
            className="h-10 rounded-md w-full flex justify-center items-center bg-[#578FCA] text-white mt-auto hover:bg-[#578FCA]/90 transition duration-200 text-sm"
          >
            Detail
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListRooms;
