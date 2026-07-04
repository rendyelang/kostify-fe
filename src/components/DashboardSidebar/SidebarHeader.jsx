import React from 'react'
import logo from '../../assets/logo.svg'

const SidebarHeader = () => {
  return (
    <header className="h-16 sm:h-20 lg:h-24 flex items-center border-b-[0.5px] border-b-[#C8CBD9]">
      <div className="flex items-center space-x-3 lg:space-x-4 ml-6 lg:ml-14">
        <div className="inline-block rounded-full shadow-md p-4 ">
          <img src={logo} alt="logo" />
        </div>
        <h1 className="text-2xl font-bold font-poppins text-[#3674B5]">
          Kostify
        </h1>
      </div>
    </header>
  );
}

export default SidebarHeader