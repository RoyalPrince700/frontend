import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {Link} from "react-router-dom"

const Login = () => {
        const [showPassword,setShowPassword] = useState(false)
      const [data, setData] = useState({
        email : "",
        passwod : ""
      })
      const handleChange = (e) => {
        const {name, value} = e.target

        setData((preve)=>{
          return{
            ...preve,
            [name] : value
          }
        })
      }

      const handleSubmit = (e) =>{
        e.preventDefault()
      }

      console.log("data login",data)

  return (
   <section id='login'>
    <div className='mx-auto container p-4'>
      <div className='bg-white mx-auto p-4 
      w-full max-w-md py-5'>
        <div className='w-20 h-20 mx-auto'>
          <img src={loginIcons} alt='login icon'/>
        </div>

        <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
          <div className='grid'>
            <label>Email :</label>
            <div className='bg-slate-100 p-2'>
                  <input 
                  type='email' 
                  placeholder='enter mail'
                  name='email'
                  value={data.email}
                  onChange={handleChange}
                  className='w-full h-full outline-none bg-transparent'/>
            </div>
        
          </div>

          <div>
            <label>Password :</label>
            <div className='bg-slate-100 flex p-2'>
               <input 
               type={showPassword ? "text" : "password"} 
               name='password'
               value={data.password}
               onChange={handleChange}
               placeholder='enter password'
                className='w-full h-full outline-none bg-transparent'/>
                <div className='cursor-pointer text-xl'
                onClick={()=>setShowPassword((preve)=>!preve)}>
                  <span>
                    {
                      showPassword ? (
                        <FaEyeSlash/>
                      )
                      :
                      (
                          <FaEye/>
                      )
                    }
                  
                    
                  </span>
                </div>
            </div>
            <Link to={'/forgot-password'} 
             className='block w-fit ml-auto hover:underline
              hover:text-red-500'>
               Forgot Password ?</Link>
           
          </div>

          <button className='bg-red-600 hover:bg-red-700 text-white px-6
          py-4 w-full text-center max-w-[150px] rounded-full hover:scale-110 
          transition-all mx-auto block mt-6'>Login</button>
        </form> 
        <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className='text-red-600 hover:underline hover:text-red-700'>Sign up</Link> </p>
      </div>
    </div>

   </section>
  )
}

export default Login