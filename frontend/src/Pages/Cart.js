import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayNARCurrency from '../helpers/displayCurrency'
import {MdDelete} from "react-icons/md"
import {loadStripe} from '@stripe/stripe-js';



const Cart = () => {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const context = useContext(Context) //data of cart is coming from here
    const loadingCart = new Array(context.cartProductCount).fill(null)
  

    const fetchData = async() =>{
       
        const response = await fetch(SummaryApi.addToCartProductView.url,{
            method : SummaryApi.addToCartProductView.method,
            credentials : 'include',
            headers : {
                'content-type' : 'application/json'
            },
            
        })

      
        const responseData = await response.json()
        

        if (responseData.success){
            setData(responseData.data)
        }
    }

    const handleLoading = async() =>{
       await fetchData()
    }
    useEffect(()=>{
            setLoading(true)
            handleLoading()
            setLoading(false)

    },[])

        const increaseQty = async (id, qty) => {
           
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    _id: id,  // Send the product's _id
                    quantity: qty + 1  // Increase the quantity
                })
            });
        
            const responseData = await response.json();
            console.log("Server Response:", responseData);  // Log the server response
        
            if (responseData.success) {
                fetchData();  // Fetch updated cart data after the successful update
            }
        }
        
        const decreaseQty =  async (id, qty) => {
           if (qty >= 2){
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    _id: id,  // Send the product's _id
                    quantity: qty - 1  // Decrease the quantity
                })
            });
        
            const responseData = await response.json();
            console.log("Server Response:", responseData);  // Log the server response
        
            if (responseData.success) {
                fetchData();  // Fetch updated cart data after the successful update
            }
           } 
           
        }
            const deleteCartProduct = async (id) => {
                try {
                  const response = await fetch(SummaryApi.deleteCartProduct.url, {
                    method: SummaryApi.deleteCartProduct.method,
                    credentials: 'include',
                    headers: {
                      'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                      _id: id, // Send the product's _id
                    }),
                  });
              
                  const responseData = await response.json();
              
                  console.log("Delete Response Data:", responseData); // Log the response data for debugging
              
                  if (responseData.success) {
                    // Update local state
                    fetchData(); // Fetch updated cart data after successful deletion
                    // Update context
                    context.fetchUserAddToCart(); // Ensure this method updates the global cart state
                  } else {
                    console.error("Failed to delete product from cart:", responseData.message); // Log any error messages
                  }
                } catch (error) {
                  console.error("Error deleting product from cart:", error); // Log any errors
                }
              };
              
    const totalQty = data.reduce((previousValue,currentValue)=>
         previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce(
        (preve,curr)=>preve + (curr.quantity * 
            curr?.productId?.sellingPrice) , 0)

            const handlePayment = async()=>{


                const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
                const response = await fetch(SummaryApi.payment.url,{
                    method : SummaryApi.payment.method,
                    credentials : 'include',
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body : JSON.stringify({
                     cartItems :  data 
                    })
                })

                const responseData = await response.json()

                if(responseData?.id){
                    stripePromise.redirectToCheckout({sessionId : responseData.id})
                }

                console.log("payment response", responseData)
            }

  return (
    <div className='container mx-auto mt-10 lg:mt-0'>
        
       <div className='text-center text-lg my-3'>
       {
             data.length === 0 && !loading && (
                <p className='bg-white py-5'>No Data</p>
             )
        }
       </div>

       <div className='flex flex-col p-4 lg:flex-row gap-10 lg:justify-between'>  
             {/**view product */}
        <div className='w-full max-w-3xl'>
            {
                loading ? (
                    loadingCart.map((el,index) => {
                               return(
                                 <div key={el+"Add To Cart Loading"+index} 
                                 className='w-full bg-slate-200 h-32 border
                            border-slate-300 my-2 animate-pulse rounded'>

                            </div>
                               ) 

                    })
                       
                ) : (
                 data.map((product, index) =>{
                   return (
                    

                    <div key={product?._id+"Add To Cart Loading"}
                    className='w-full bg-white h-40 border
                   border-slate-300 my-2 rounded grid grid-cols-[128px,1fr]'>
                    <div className='w-32 h-40 bg bg-slate-200'>
                        <img src={product?.productId?.productImage[0]} 
                        className='w-full h-full object-scale-down
                        mix-blend-multiply'/> 
                    </div>
                    <div className='px-4 py-2 relative'>
                  {/**delete product */}
                        <div className='absolute right-0 text-yellow-600 rounded-full
                        p-2 hover:bg-yellow-600 hover:text-white cursor-pointer'
                        onClick={()=>deleteCartProduct(product?._id)}>
                        <MdDelete/>
                        </div>
                        <h2 className='text-lg lg:text-xl text-ellipsis
                       line-clamp-1 '>{product?.productId?.productName}</h2>
                       <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                     <div className='flex flex-col md:flex-row justify-between'>
                            <p className='text-black font-medium text-lg'> {displayNARCurrency(product?.productId?.sellingPrice)}</p>
                            <p className='text-slate-600 font-semibold text-lg'> {displayNARCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                   </div>
                    <div className='flex items-center gap-3 mt-1'>
                        <button className='flex rounded hover:bg-yellow-600
                         hover:text-white justify-center items-center 
                         border w-6 h-6 border-yellow-600 text-yellow-600'
                         onClick={()=>decreaseQty(product?._id, product?.quantity)}
                         >-</button>
                        <span>{product?.quantity}</span>
                        <button className='flex rounded hover:bg-yellow-600
                         hover:text-white justify-center items-center 
                         border w-6 h-6 border-yellow-600 text-yellow-600
                         '
                         onClick={() => increaseQty(product?._id, product?.quantity)}

           // onClick={()=>increaseQty(product?._id,product?.quantity)}
                         >+</button>
                    </div>
                    </div>

                   </div>
                   )
                 })
                )
            }
        </div>

            {/**summary */}
            {
                data[0] && (
                    <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {
                           loading ? (
                           <div className='h-36 bg-slate-200 border border-slate-300
                            animate-pulse'>
                                           
                                       </div>
                           ) : (

                 <div className='h-auto bg-white rounded-lg shadow-lg'>
                        <h2 className='text-lg font-semibold text-gray-800 px-6 py-4 border-b border-gray-200'>Summary</h2>
                        
                        <div className='px-6 py-4'>
                            <div className='flex items-center justify-between text-gray-600 mb-3'>
                                <p className='text-sm'>Quantity</p>
                                <p className='text-sm'>{totalQty}</p> 
                            </div>

                            <div className='flex items-center justify-between text-gray-600 mb-3'>
                                <p className='text-sm'>Total Price</p>
                                <p className='text-sm'>{displayNARCurrency(totalPrice)}</p>
                            </div>
                        </div>

                        <button 
                            className='bg-yellow-600 hover:bg-yellow-700 transition-colors duration-200 text-white py-3 px-6 rounded-b-lg w-full font-semibold'
                            onClick={handlePayment}>
                            Make Payment
                        </button>
                    </div>

               )
           }
                    </div>
                )
            }
       
          


       </div>
    </div>
  )
}

export default Cart

