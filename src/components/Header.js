import React from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import {toast} from 'react-toastify'
import { setUserDetails } from '../store/userSlice';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()

  console.log("user header", user)


  const handleLogout = async()=>{
    const fetchData = await fetch(SummaryApi.logout_user.url,{
        method : SummaryApi.logout_user.method,
            Credentials : 'include'
    })
   const data = await fetchData.json()
   if(data.success){
    toast.success(data.message)
    dispatch(setUserDetails(null))
   }
    if(data.error){
      toast.error(data.message)
    }
  }
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

        <div className='text-3xl cursor-pointer'>
          {
            user?.profilePic ? (
              <img src={user?.profilePic} 
              className='w-10 h-10 rounded-full' alt={user?.name}
              />
            ) : (
              <FaRegCircleUser/>
            )
          }

          
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
          {
            user?._id ?(
              <button onClick={handleLogout} className='px-2 py-1 rounded-full text-white
              hover:bg-red-700 bg-red-600 p-3'>Logout</button>
            )
            :(
            <Link to={"/login"} className='px-2 py-1 rounded-full text-white
           hover:bg-red-700 bg-red-600 p-3'>Login</Link>
            )
          }
          
        </div>
       
      </div>
    </div>
   </header>
  )
}

export default Header