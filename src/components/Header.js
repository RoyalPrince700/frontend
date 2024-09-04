import React from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import {Link} from "react-router-dom"


const Header = () => {
  return (
   <header className='h-16 shadow-md bg-white'>
    <div className='container mx-auto flex items-center px-4 
    justify-between'>
      <div className='cursor-pointer'>
       <Link to={"/"}>
       <Logo w={90} h={60}/>
       </Link>
       
       
        
        
       
      </div>
      <div className='hidden lg:flex items-center w-full justify-between
       max-w-sm border rounded-full focus-within:shadow-md pl-2'>
        <input type='text' placeholder='search product here...' 
        className='w-full outline-none'/>
        <div className='tetx-lg min-w-[50px] flex items-center
         h-8 bg-red-600 justify-center rounded-r-full text-white'>
        <GrSearch />
        </div>
      </div>

      <div className='flex items-center gap-7'>
        <div>
           <FaRegCircleUser className='text-2xl'/>
        </div>
        <div className='text-2xl flex relative'>

          <span> <FaShoppingCart/></span>

          <div className='bg-red-600 rounded-full text-white 
          w-5 h-5 p-1 flex items-center justify-center
          absolute -top-2 -right-3'>
            <p className='text-xs'>0</p>
          </div>
        </div>

        <div>
          <Link to={"/login"} className='px-2 py-1 rounded-full text-white
           hover:bg-red-700 bg-red-600 p-3'>Login</Link>
        </div>
       
      </div>
    </div>
   </header>
  )
}

export default Header