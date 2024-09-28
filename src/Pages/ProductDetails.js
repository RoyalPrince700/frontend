import React, { useCallback, useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from 'react-icons/fa'
import { FaStarHalf } from 'react-icons/fa'
import displayNARCurrency  from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const ProductDetails = () => {
  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })

  const params = useParams()
  const [loading,setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x : 0,
    y : 0
  })
  const [zoomImage, setZoomImage] = useState(false)
  const { fetchUserAddToCart } = useContext(Context);

  const navigate = useNavigate()

  // console.log("productss id", params) call params inside useEffect so it will update automatically

  const fetchProductDetails = async()=>{
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url,{
      method : SummaryApi.productDetails.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
          productId : params?.id
      })
    })
    setLoading(false)
    const dataResponse = await response.json()


    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data.productImage[0])
    

  }

  console.log("data", data)

  useEffect(()=>{
    fetchProductDetails()
  },[params]) //call params to update the product 

  const handleMouseEnterProduct = (imageURL)=>{
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true) 
    const {left, top, width, height} = e.target.getBoundingClientRect()
    console.log("coordinate", left, top, width, height)

    const x =( e.clientX - left) / width
    const y =( e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y 
    })
   
   
  },[zoomImageCoordinate])

  const handleLeaveImageZoom = ()=>{
    setZoomImage(false)
  }

  const handleAddToCart = async (e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async(e,id) =>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  return (
    <div className='container mt-16 lg:mt-0 mx-auto p-4'>

      <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/**product image */}
          <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

            <div className='h-[300px] w-[300px] lg:h-96 lg:w-96
            bg-slate-200 relative p-2'>
                <img src={activeImage} className='h-full w-full 
                object-scale-down mix-blend-multiply'
               onMouseMove={handleZoomImage}
               onMouseLeave={handleLeaveImageZoom}
               />
               {/**product zoom */}
               {
                zoomImage && (
                  <div className='hidden lg:block absolute overflow-hidden 
                  min-w-[400px] min-h-[400px] bg-slate-200
                  p-1 -right-[510px] top-0'>
                      <div className='w-full h-full min-h-[400px] min-w-[500px] 
                      mix-blend-multiply scale-125'
                      style={{
                        backgroundImage : `url(${activeImage})`,
                        backgroundRepeat : 'no repeat',
                        backgroundPosition : `${zoomImageCoordinate.x * 100}%
                        ${zoomImageCoordinate.y * 100}%`
      
      
                      }}>
      
                      </div>
                  </div>
                )
               }
      
            </div>
  

            <div className='h-full'>
        {
          loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll
                scrollbar-none h-full'>
                  {
                     productImageListLoading.map((el,index) =>{
                      return(
                        <div className='h-20 w-20 bg-slate-200 rounded
                        animate-pulse'
                        key={"loadingImage"+index}>
        
                          </div>
              )
            })
          }
           </div>
                 
          ) : (
            <div>
                    <div className='flex gap-2 lg:flex-col overflow-scroll
                scrollbar-none h-full'>
                  {
                     data?.productImage?.map((imageURL, index) =>{
                      return(
                        <div className='h-20 w-20 bg-slate-200 rounded P-1'
                        key={imageURL}>
                            <img src={imageURL} className='w-full p-1 h-full
                            object-scale-down mix-blend-multiply cursor-pointer'
                            onMouseEnter={()=>handleMouseEnterProduct(imageURL)}
                            onClick={()=>handleMouseEnterProduct(imageURL)}/>
                          </div>
              )
            })
          }
           </div>
            </div>
          )
        }
            </div>
          </div>

           {/**product details */}
          {
            loading ? (
              <div className='grid w-full gap-1'>
              <p className='bg-slate-200 animate-pulse text-red-600
             h-6 w-full rounded-full inline-block lg:h-8'></p>
              <h2 className='text-2xl lg:h-8 lg:text-4xl font-medium h-6  w-full bg-slate-200
              animate-pulse'></h2>
              <p className='capitalize lg:h-8 rounded-full animate-pulse
               bg-slate-200  w-full min-w-[100px] text-slate-400'></p>

              <div className='text-red-600  w-full bg-slate-200 h-6 animate-pulse flex items-center gap-1'>
                 
              </div>

              <div className='flex h-6 lg:h-8  w-full animate-pulse  items-center gap-2 text-2xl lg:text-3xl font-medium my-2'>
                <p className='text-red-600 lg:h-8  w-full bg-slate-200'></p>
                <p className='text-slate-400 lg:h-8 w-full line-through bg-slate-200'></p>
              </div>

              <div className=' w-full flex items-center my-2'>
                <button className='h-6 lg:h-8  w-full bg-slate-200 rounded animate-pulse'></button>
                <button className='h-6  lg:h-8 w-full bg-slate-200 rounded animate-pulse'></button>
              </div>

              <div>
                <p className='text-slate-600  w-full font-medium my-1 h-6
                 bg-slate-200 rounded animate-pulse'> </p>
                <p className='h-10 bg-slate-200  w-full rounded 
                animate-pulse'></p>
              </div>

            </div>
            ) : 
            (
              <div className='flex flex-col gap-1'>
              <p className='bg-yellow-200 text-yellow-600
              px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
              <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
              <p className='capitalize text-slate-400'>{data?.category}</p>

              <div className='text-yellow-600 flex items-center gap-1'>
                  <FaStar/>
                  <FaStar/>
                  <FaStar/>
                  <FaStar/>
                  <FaStarHalf/>
              </div>

              <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-2'>
                <p className='text-yellow-600'>{displayNARCurrency(data.sellingPrice)}</p>
                <p className='text-slate-400 line-through'>{displayNARCurrency(data.price)}</p>
              </div>

              <div className='flex items-center my-2 gap-3'>
                <button className='border-2 text-yellow-600 font-medium px-3 py-1 min-w-[120px] border-yellow-600 
                hover:bg-yellow-600 hover:text-white '
               onClick={(e)=>handleBuyProduct(e,data?._id)} >Buy</button>
                <button className='border-2 font-medium text-white bg-yellow-600 px-3 py-1 min-w-[120px] border-yellow-600 
                hover:text-yellow-600 hover:bg-white'
                onClick={(e)=>handleAddToCart(e,data?._id)}>Add To Cart</button>
              </div>

              <div>
                <p className='text-slate-600 font-medium my-1'>Description :</p>
                <p>{data.description}</p>
              </div>

            </div>
            )
          }
      </div>


{
  data.category && (
     <CategoryWiseProductDisplay  category={data?.category} heading={"Recommended Product"}/>
      
  )
}
     
    </div>
  )
}

export default ProductDetails