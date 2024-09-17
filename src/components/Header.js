import React, { useContext, useEffect, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)

  // Handle logout functionality
  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include', // fixed the typo here
    });

    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-menu') && menuDisplay) {
        setMenuDisplay(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuDisplay]);

  const handleSearch = (e) =>{
    const {value} = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }


  return (
    <header className='h-16 shadow-md bg-white z-40 fixed w-full'>
      <div className='container mx-auto flex items-center py-4 justify-between'>
        <div className='cursor-pointer'>
          <Link to={"/"}>
            <Logo w="90px" h="20px" />
          </Link>
        </div>

        {/* Search bar */}
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
          <input
            type='text'
            placeholder='Search product here...'
            className='w-full outline-none'
          onChange={ handleSearch}
          value={search}
          />
          <div className='text-lg min-w-[50px] flex items-center h-8 bg-red-600 justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>

        {/* User and Cart section */}
        <div className='flex items-center gap-7'>
          {/* User profile */}
          <div className='relative flex justify-center'>
            {user?._id && (
              <div
                className='text-3xl cursor-pointer flex justify-center user-menu'
                onClick={() => setMenuDisplay(prev => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className='w-10 h-10 rounded-full'
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {/* User menu */}
            {menuDisplay && (
              <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className='whitespace-nowrap hover:bg-slate-100 p-2'
                      onClick={() => setMenuDisplay(prev => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
   {/* Shopping Cart you will display the number of item in the cart in the app.js file*/}
    {
       user?._id && (
       
          <Link to={"/cart"} className='text-2xl flex relative'>
            <span>
              <FaShoppingCart />
            </span>
          <div className='bg-red-600 rounded-full text-white w-5 h-5 p-1 flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-sm'>{context?.cartProductCount}</p>
            </div>
           </Link>
           )
    }
            

      
       
      

            
       

          {/* Login/Logout Button */}
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className='px-2 py-1 rounded-full text-white hover:bg-red-700 bg-red-600 p-3'
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className='px-2 py-1 rounded-full text-white hover:bg-red-700 bg-red-600 p-3'
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;



/*import React, { useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import {toast} from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()

  const [menuDisplay,setMenuDisplay] = useState(false)




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
   <header className='h-16 shadow-md bg-white z-40 fixed w-full'>
    <div className='container mx-auto flex items-center py-4 
    justify-between'>
      <div className='cursor-pointer'>
       <Link to={"/"}>
       <Logo w="90px" h="20px" />
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

       <div className='relative flex justify-center'>

        {
          user?._id && (
            <div className='text-3xl cursor-pointer flex justify-center'
       onClick={()=>setMenuDisplay(preve => !preve)}>
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
          )
        }
       

          {
            menuDisplay && (

            <div className='absolute bg-white bottom-0 
              top-11 h-fit p-2 shadow-lg rounded'>
              <nav>
                {
                  user?.role === ROLE.ADMIN && (
                    <Link to={"/admin-panel/all-products"} 
                    className='whitespace-nowrap hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                
                  )
                }
                 </nav>
            </div>
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

export default Header*/