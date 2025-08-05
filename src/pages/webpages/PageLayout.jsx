import React, { useState } from 'react';
import { BsLaptop } from "react-icons/bs";
import { CiMobile3 } from "react-icons/ci";
import { MdOutlineTabletMac } from "react-icons/md";


function PageLayout() {
  const [screenSize, setScreenSize] = useState('laptop');

  const screenClasses = {
    laptop: 'w-[100%] h-[768px]',
    tablet: 'w-[768px] h-[1024px]',
    mobile: 'w-[375px] h-[667px]',
  };

  return (
    <div className="flex flex-col items-center justify-center scrollbar-hidden h-screen bg-base-300">
      {/* Buttons for switching screen sizes */}
      <div className="flex justify-between w-full ">
        <h1 className='text-neutral-content text-3xl  font-bold'>Page view </h1>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setScreenSize('laptop')}
            className={`px-4 py-2 rounded-md ${screenSize === 'laptop' ? 'bg-primary text-white' : 'bg-base-200 text-neutral-content'
              }`}
          >
            <BsLaptop />
          </button>
          <button
            onClick={() => setScreenSize('tablet')}
            className={`px-4 py-2 rounded-md ${screenSize === 'tablet' ? 'bg-primary text-white' : 'bg-base-200 text-neutral-content'
              }`}
          >
            <MdOutlineTabletMac />
          </button>
          <button
            onClick={() => setScreenSize('mobile')}
            className={`px-4 py-2 rounded-md ${screenSize === 'mobile' ? 'bg-primary text-white' : 'bg-base-200 text-neutral-content'
              }`}
          >
            <CiMobile3 />
          </button>
        </div>
      </div>

      {/* iFrame Preview */}
      <div className={` rounded-xl overflow-y-auto   scrollbar-hidden shadow-lg ${screenClasses[screenSize]}`}>
        <iframe
          src="https://www.tltechnologies.net/"
          title="TL Technologies"
          className="w-full h-full  overflow-y-auto scrollbar-hidden"
        ></iframe>
      </div>
    </div>
  );
}

export default PageLayout;
