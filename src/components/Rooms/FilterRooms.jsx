import React from 'react'

const FilterRooms = ({selectedFilter, setSelectedFilter}) => {
      const filters = [
        {
          type: "semua",
          lable: "Semua kamar",
        },
        {
          type: "full",
          lable: "Terisi",
        },
        {
          type: "empty",
          lable: "Kosong",
        },
      ];
  return (
    <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
      {filters.map((filter, i) => {
        const isActive = selectedFilter === filter.type;
        return (
          <div
            key={i}
            onClick={() => setSelectedFilter(filter.type)}
            className={`py-2 px-4 rounded-full border text-gray-600 hover:bg-[#578FCA] hover:border-[#3674B5] hover:text-white transition duration-200 cursor-pointer  ${
              isActive
                ? "bg-[#578FCA] border-[#3674B5] text-white"
                : "border-gray-300"
            }`}
          >
            {filter.lable}
          </div>
        );
      })}
    </div>
  );
}

export default FilterRooms