import React, { useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayNARCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

const HorizontalCardProduct = ({category, heading}) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const fetchData = async() => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("horizontal data",categoryProduct.data )
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
    <div className='container mx-auto px-4 my-6 relative'>

                <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

        <div className='flex items-center gap-4 md:gap-6 
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
            <div className='w-full min-w-[280px] md:min-w-[320px] h-36
            max-w-[280px] md:max-w-[320px]
                bg-white rounded-sm shadow flex'>
                
                <div className='bg-slate-200 h-full p-4 min-w-[120px] 
                md:min-w-[145px] animate-pulse rounded-full'>
                   
                </div>
                <div className='p-4 grid w-full gap-2'>
                    <h2 className='font-medium text-base md:text-lg
                    text-ellipsis line-clamp-1 text-black bg-slate-200
                    animate-pulse p-1'></h2>
                    <p className='capitalize animate-pulse rounded-full
                     text-slate-500  bg-slate-200'>
                        </p>
                    <div className='flex gap-3 w-full'>
                        <p className=' animate-pulse rounded-full text-red-600 font-medium w-full bg-slate-200 p-1'>
                            </p>
                        <p className=' animate-pulse rounded-full text-slate-500 line-through w-full bg-slate-200 p-1'>
                            </p>
                    </div>
                    <button className='animate-pulse rounded-full text-sm  bg-slate-200 text-white
                     p-2 py-0.5 px-3 
                   w-full '></button>
                    </div>
                </div>
                )
            })
        ) : (
            data.map((product, index)=>{
                return (  
            <div className='w-full min-w-[280px] md:min-w-[320px] h-36
            max-w-[280px] md:max-w-[320px]
                bg-white rounded-sm shadow flex'>
                
                <div className='bg-slate-200 h-full p-4 min-w-[120px] 
                md:min-w-[145px]'>
                   <img src={product?.productImage[0]}
                   className='object-scale-down h-full
                   hover:scale-110 transition-all'
                   />
                </div>
                <div className='p-4 grid'>
                    <h2 className='font-medium text-base md:text-lg
                    text-ellipsis line-clamp-1 text-black
                    '>{product?.productName}</h2>
                    <p className='capitalize text-slate-500'>
                        {product?.category}</p>
                    <div className='flex gap-3'>
                        <p className='text-red-600 font-medium'>{displayNARCurrency(product?.sellingPrice)}</p>
                        <p className='text-slate-500 line-through'>{displayNARCurrency(product?.price) }</p>
                    </div>
                    <button className='bg-red-600 text-sm text-white
                    hover:bg-red-700 p-2 py-0.5 px-3 rounded-full
                    '>Add to Cart</button>
                    </div>
                </div>
                )
            })
        )
               
                }
        </div>
                
    </div>
  )
}

export default HorizontalCardProduct