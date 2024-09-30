import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayNARCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import { LiaCartPlusSolid } from 'react-icons/lia'
import { AiOutlineLike } from 'react-icons/ai'
import likedProduct from '../helpers/likedProduct'

const HorizontalCardProduct = ({category, heading}) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const { fetchUserAddToCart, fetchUserLikedProduct } = useContext(Context);

    const handleAddToCart = async(e,id)=>{
   await addToCart(e,id)
      fetchUserAddToCart()
    }

    const handleLikedProduct = async(e,id)=>{
        await likedProduct(e,id)
        fetchUserLikedProduct()
         }


    const fetchData = async() => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        
        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }



  return (
    <div className='container mx-auto px-4 my-6 w-full relative'>

                <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

        <div className='flex items-center gap-2 md:gap-3 
        overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
             <button 
             className='bg-white shadow-md rounded-full p-1 absolute
             left-0 text-lg hidden md:block
             ' onClick={scrollLeft}><FaAngleLeft/></button>
             <button 
             className='bg-white shadow-md rounded-full p-1 absolute
             right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight/></button>
    
      
        {   loading ? (
             loadingList.map((product, index)=>{
                return (  
          <div to={"product/"+product?._id} className='w-full min-w-[300px] md:min-w-[400px] h-44
                    max-w-[400px] md:max-w-[420px] 
                         rounded-sm shadow flex'>
                        
                        <div className='bg-slate-50 h-full p-4 min-w-[120px] 
                        md:min-w-[145px] max-w-[200px] animate-pulse'>
                          
                        </div>
        
                   <div className='p-4 grid w-[300px] bg-white'>
                    <div className=''>
                      <h2 className='font-medium text-base md:text-lg text-ellipsis h-4 line-clamp-1 text-black p-1 py-1
                                  animate-pulse rounded-full bg-slate-100'></h2>
                        <p className='capitalize text-slate-500 p-1 h-4  animate-pulse rounded-full mt-2 bg-slate-100'> </p>
                    </div>
                        
                       <div className='flex gap-1 flex-col animate-pulse'>
                                <p className='text-red-600 w-full h-5  font-medium p-1  animate-pulse rounded-full bg-slate-100'> </p>
                                <p className='text-slate-500  w-full h-5 line-through p-1 animate-pulse rounded-full bg-slate-100'> </p>
                         </div>
        
                            
                            <div className='flex items-center justify-between rounded-full animate-pulse bg-slate-100'>
                                    <button className=' text-sm text-yellow-600 
                                    hover:bg-yellow-700 hover:shadow-sm hover:text-white transition-all p-2 py-0.5  rounded-full
                                    'onClick={(e)=>handleAddToCart(e,product?._id)}></button>
                                        
                                        <button className=' text-sm text-yellow-600 
                                    hover:bg-yellow-700 hover:shadow-sm hover:text-white transition-all p-2 py-0.5  rounded-full
                                    '></button>
                                
                            </div>
                     </div>
             </div>
           
                )
            })
        ) : (
            data.map((product, index)=>{
                return (  
            <Link to={"product/"+product?._id} className='w-full min-w-[300px] md:min-w-[400px] h-44
            max-w-[400px] md:max-w-[420px] 
                 rounded-sm shadow flex'>
                
                <div className='bg-slate-100 h-full p-4 min-w-[120px] 
                md:min-w-[145px] max-w-[200px]'>
                   <img src={product?.productImage[0]}
                   className='object-scale-down h-full
                   hover:scale-110 transition-all'
                   />
                </div>

                <div className='p-4 grid w-[300px] bg-white'>
                    <h2 className='font-medium text-base md:text-lg
                    text-ellipsis line-clamp-1 text-black
                    '>{product?.productName}</h2>
                    <p className='capitalize text-slate-500'>
                        {product?.category}</p>
                    <div className='flex flex-col'>
                    <p className='text-slate-500 line-through'>{displayNARCurrency(product?.price) }</p>
                        <p className='text-black font-medium text-xl'>{displayNARCurrency(product?.sellingPrice)}</p>
                       
                    </div>

                    
                    <div className='flex items-center justify-between'>
                    <button className=' text-sm text-yellow-600 
                    hover:bg-yellow-700 hover:shadow-sm hover:text-white transition-all p-2 py-0.5  rounded-full
                    'onClick={(e)=>handleAddToCart(e,product?._id)}><LiaCartPlusSolid className='text-3xl'/></button>
                        
                        <button className=' text-sm text-yellow-600 
                    hover:bg-yellow-700 hover:shadow-sm hover:text-white transition-all p-2 py-0.5  rounded-full
                    'onClick={(e)=>handleLikedProduct(e,product?._id)}><AiOutlineLike className='text-xl'/></button>
                        
                    </div>
                    </div>
                </Link>
                )
            })
        )
               
                }
        </div>
                
    </div>
  )
}

export default HorizontalCardProduct