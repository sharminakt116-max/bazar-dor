

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NavLinks from './NavLinks';
import UserInfo from './UserInfo';

const Header = () => {
  // const date = new Date().toLocaleDateString('bn-BD', {
  //   dateStyle: 'full'
  // });
  const date = new Date().toLocaleDateString('bn-BD', {
    dateStyle: 'full'
  });

  return (
  
 <header className='w-full bg-white border-b border-gray-200 shadow-sm'>
<div className='border-b border-gray-200'>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        

        <div className="flex items-center gap-4">
          <Image 
            className="h-12 w-14 rounded-xl bg-green-700 object-cover" 
            height={50} 
            width={50} 
            src="/logo-icon.png" 
            alt="" 
          />
          <div>
            <h1 className="text-2xl font-semibold">বাজার দর</h1>
            <p className="text-sm text-gray-600">{date}</p>
          </div>
        </div>
<UserInfo/>
        
      </div>
      </div>
      <NavLinks/>
     </header>

  );
};

export default Header;