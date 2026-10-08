// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';
// const date=new Date().toLocaleDateString('bn-BD',{
//     dateStyle:'full'
// })
// const Header = () => {
//     return (
//         <div className='w-full flex items-center justify-between max-w-7xl mx-auto px-4 py-4 '>
//         <div className='flex gap-4 items-center '>
            
//             <Image className='h-12 w-14 bg-green-700 rounded-xl'height={50} width={50} src={'/logo-icon.png'} alt=''/>
            
//             <div>
//                 <h1 className='font-semibold text-2xl'>বাজার দর</h1>
//                 <p>{date}</p>
//             </div>
//             </div>
//             <div className='flex gap-4' >
                

//         <button className='btn btn-ghost text-neutral-700 transition-colors hover:text-red-700'>সাইন ইন</button>
          
//             <button className="btn bg-green-700 px-5 py-2 shadow-md  rounded-xl hover:bg-green-800 transition text-white">সাইন আপ</button>
     
//             </div>
            
//         </div>
//     );
// };

// export default Header;

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NavLinks from './NavLinks';

const Header = () => {
  const date = new Date(2016, 9, 6).toLocaleDateString('bn-BD', {
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

        
        <div className="flex items-center gap-4">
          <button className="btn btn-ghost text-neutral-700 transition-colors hover:text-red-700">
            সাইন ইন
          </button>
          <button className="btn rounded-xl bg-green-700 px-5 py-2 text-white shadow-md transition hover:bg-green-800">
            সাইন আপ
          </button>
        </div>

      </div>
      </div>
      <NavLinks/>
     </header>

  );
};

export default Header;