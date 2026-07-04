import React from 'react';
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

const SidebarContent = ({ onClose }) => {
  const location = useLocation();
  const navs = [
    {
      type: 1,
      title: "menu",
    },
    {
      type: 2,
      title: "Dashboard",
      icon: "uis:chart",
      route: "/dashboard/",
    },
    {
      type: 2,
      title: "Data kamar",
      icon: "mdi:drive-document",
      route: "/dashboard/rooms",
    },
    {
      type: 2,
      title: "Data Penghuni",
      icon: "iconamoon:profile-fill",
      route: "/dashboard/tenants",
    },
    {
      type: 1,
      title: "others",
    },
    {
      type: 2,
      title: "Detail Pembayaran",
      icon: "mingcute:wallet-fill",
      route: "/dashboard/payment-reports",
    },
    {
      type: 2,
      title: "Laporan keuangan",
      icon: "mingcute:wallet-fill",
      route: "/dashboard/financial-reports",
    },
    {
      type: 2,
      title: "Bantuan",
      icon: "solar:info-square-bold",
      route: "/dashboard/helps",
    },
  ];

  return (
    <div className="px-4 sm:px-5 lg:px-7 py-8 lg:py-16">
      <div>
        {navs.map((nav, i) => {
          const isActive = location.pathname === nav.route;
          return nav.type === 1 ? (
            <h2
              key={i}
              className="font-poppins font-normal uppercase text-gray-600 ml-5 lg:ml-9 mb-3 lg:mb-5 text-xs lg:text-base mt-2"
            >
              {nav.title}
            </h2>
          ) : (
            <Link to={nav.route} key={i} onClick={onClose}>
              <div
                className={`px-5 lg:px-9 py-4 lg:py-7 flex space-x-4 lg:space-x-5 items-center hover:bg-[#3674B5]/10 rounded-md group transition duration-200 cursor-pointer ${
                  isActive && "bg-[#3674B5]/10"
                }`}
              >
                <Icon
                  icon={nav.icon}
                  width="24"
                  height="24"
                  //   color="currentColor"
                  className={` group-hover:text-[#3674B5] ${
                    isActive ? "text-[#3674B5]" : "text-gray-600"
                  }`}
                />
                <span
                  className={`group-hover:text-[#3674B5] font-medium text-sm ${
                    isActive && "text-[#3674B5]"
                  }`}
                >
                  {nav.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarContent;