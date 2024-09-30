import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import image1 from '../assest/banner/tecpc1.jpg'
import image2 from '../assest/banner/tecpc2.jpg'
import image3 from '../assest/banner/tecpc1.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'
import image6 from '../assest/banner/techno one.jpg'
import image7 from '../assest/banner/technew.jpg'
import image8 from '../assest/banner/tech second.jpg'





import image1Mobile from '../assest/banner/tmo.jpg'
import image2Mobile from '../assest/banner/tms.jpg'
import image3Mobile from '../assest/banner/tmt.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'


const BannerProduct = () => {
const [currrentImage, setCurrentImage] = useState(0)

    const desktopImages = [
      image1,
      image2,
      image3
    ]

    const mobileImages = [
      image1Mobile,
      image2Mobile,
      image3Mobile
    ]

        const nextImage = () =>{
            if (desktopImages.length -1 > currrentImage){
                 setCurrentImage(preve => preve + 1)
            }
           
        }

        const previousImage = () =>{
            if (currrentImage != 0){
                 setCurrentImage(preve => preve - 1)
            }
           
        }

        useEffect(()=>{
                const interval = setInterval(()=>{
                    if (desktopImages.length -1 > currrentImage){ 
                        nextImage()
                     }else {
                        setCurrentImage(0)
                     }                 
                },5000)

                return ()=> clearInterval(interval)  
        },[currrentImage])


  return (
    <div className='container mx-auto rounded '>
        <div className='h-40 md:h-52 w-full bg-slate-50 relative'>
        <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
           <div className=' flex justify-between w-full text-2xl'>
                <button onClick={previousImage} className='bg-white shadow-md rounded-full'><FaAngleLeft/></button>
                <button onClick={nextImage} className='bg-white shadow-md rounded-full'><FaAngleRight/></button>
           </div>
        </div>

         {/**desktop and tablet version */}
          <div className='hidden md:flex h-full w-full p-1 overflow-hidden'>
          {
                desktopImages.map((imageURL,index)=>{
                        return(
                 <div className='h-full w-full min-w-full min-h-full transition-all' 
                 key={imageURL} style={{transform : `translateX(-${currrentImage * 100}%)`}}
                 >
                        <img src={imageURL} className='w-full h-full'/>
                  </div>  
                        )
                })
            }
          </div>
      
        {/**mobile version */}

        <div className=' flex h-full w-full p-1 overflow-hidden md:hidden'>
          {
                mobileImages.map((imageURL,index)=>{
                        return(
                 <div className='h-full w-full min-w-full min-h-full transition-all' 
                 key={imageURL} style={{transform : `translateX(-${currrentImage * 100}%)`}}
                 >
                        <img src={imageURL} className='w-full h-full object-cover'/>
                  </div>  
                        )
                })
            }
          </div>
        
        </div>
      
    </div>
  )
}

export default BannerProduct