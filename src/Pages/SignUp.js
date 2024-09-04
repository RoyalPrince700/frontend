import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {Link} from "react-router-dom"
import loginIcons from '../assest/signin.gif'
import imageTobase64 from '../routes/imageTobase64';


const SignUp = () => {

    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
      email : "",
      passwod : "",
      name: "",
      confirmPassword : "",
      profilePic : ""
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

    const handleUploadPic = async(e)=>{
            const file = e.target.files[0]

            const imagePic = await imageTobase64(file)
         
            setData((preve)=>{
                return{
                  ...preve,
                 profilePic : imagePic
                }
              })
    }

    const handleSubmit = (e) =>{
      e.preventDefault()
    }

    console.log("data login",data)

  return (
    <section id='signup'>
    <div className='mx-auto container p-4'>
      <div className='bg-white mx-auto p-4 
      w-full max-w-md py-5 '>
        <div className='w-20 h-20 mx-auto relative overflow-hidden 
        rounded-full'>
            <div>
                <img src={data.profilePic || loginIcons} alt='login icon'/>
            </div>
           <form>
            <label>
            <div className='text-xs absolute bg-opacity-80 bottom-0 
            w-full bg-slate-200 pb-2 pt-2 cursor-pointer text-center'>
                Upload Photo
            </div>
                <input type='file' className='hidden' onChange={handleUploadPic}/>
            </label>
         
           </form>
          
        </div>

        <form className='pt-6 flex flex-col gap-2' 
        onSubmit={handleSubmit}>

        <div className='grid'>
            <label>Name :</label>
            <div className='bg-slate-100 p-2'>
                  <input 
                  type='text' 
                  placeholder='enter your name'
                  name='name'
                  value={data.name}
                  onChange={handleChange}
                  className='w-full h-full outline-none bg-transparent'/>
            </div>
        
          </div>

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
           
          </div>

          <div>
            <label>Confirm Password :</label>
            <div className='bg-slate-100 flex p-2'>
               <input 
               type={showConfirmPassword ? "text" : "password"} 
               name='confirmPassword'
               value={data.confirmPassword}
               onChange={handleChange}
               placeholder='enter confirm password'
                className='w-full h-full outline-none bg-transparent'/>
                <div className='cursor-pointer text-xl'
                onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                  <span>
                    {
                      showConfirmPassword ? (
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
            
           
          </div>

          <button className='bg-red-600 hover:bg-red-700 text-white px-6
          py-2 w-full max-w-[150px] rounded-full hover:scale-110 
          transition-all mx-auto block mt-6'>Sign Up</button>
        </form> 
        <p className='my-5'>Already have account ? <Link to={"/login"} className='text-red-600 hover:underline hover:text-red-700'>Login</Link> </p>
      </div>
    </div>

   </section>
  )
}

export default SignUp