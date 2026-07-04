import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import FilterRooms from "../../../components/Rooms/FilterRooms";
import ListRooms from "../../../components/Rooms/ListRooms";
import { useGetRoomsByOwnerId } from "../../../hooks/room.hook";
import { Outlet, useNavigate } from "react-router-dom";

const Rooms = () => {
  const [selectedFilter, setSelectedFilter] = useState("semua");
  const navigate = useNavigate();

  const { data: rooms, isLoading } = useGetRoomsByOwnerId();

  const filteredRooms = rooms?.filter((room) => {
    if (selectedFilter === "semua") return true;
    return room.status === selectedFilter;
  });

  return (
    <main className="px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 pb-8 relative">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 w-full">
        <div>
          <h1 className="font-semibold text-lg sm:text-xl">Data Kamar</h1>
          <p className="font-light text-xs">
            Informasi seluruh data kamar dan fasilitas didalamnya
          </p>
        </div>
        <button onClick={() => navigate("/dashboard/rooms/add")} className="self-start sm:self-auto">
          <Icon
            icon="icon-park-solid:add"
            className="text-[#3674B5]"
            width="36"
            height="36"
          />
        </button>
      </div>
      <FilterRooms
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <ListRooms rooms={filteredRooms} />
      <Outlet />
    </main>
  );
};

export default Rooms;
