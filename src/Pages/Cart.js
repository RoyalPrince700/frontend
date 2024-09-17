import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayNARCurrency from '../helpers/displayCurrency'
import {MdDelete} from "react-icons/md"


const Cart = () => {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)
  

    const fetchData = async() =>{
        setLoading(true)
        const response = await fetch(SummaryApi.addToCartProductView.url,{
            method : SummaryApi.addToCartProductView.method,
            credentials : 'include',
            headers : {
                'content-type' : 'application/json'
            },
            
        })

        setLoading(false)
        const responseData = await response.json()
        

        if (responseData.success){
            setData(responseData.data)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    /*const increaseQty = async(id,qty) =>{
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method : SummaryApi.updateCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                        quantity :  qty + 1
                    })
            
        })
        const responseData = await response.json()

        

        if(responseData.success){
            fetchData()
        }
 }

        const increaseQty = async(id, qty) => {
            console.log("Current quantity:", qty);  // Log the current quantity for debugging
            const newQty = qty + 1;
            console.log("Updated quantity:", newQty);  // Log the updated quantity for debugging
        
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    quantity: newQty  // Send the updated quantity to the server
                })
            });
        
            const responseData = await response.json();
            console.log("Server Response:", responseData);  // Log the server's response for debugging
        
            if (responseData.success) {
                fetchData();  // Fetch the updated cart data after a successful update
            }
        };*/

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

        /*const deleteCartProduct = async (id) =>{
            const response = await fetch(SummaryApi.deleteCartProduct.url, {
                method: SummaryApi.deleteCartProduct.method,

                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    _id: id,  // Send the product's _id
                    
                })
            });
        
            const responseData = await response.json();
        
            if (responseData.success) {
                fetchData();  // Fetch updated cart data after the successful update
                context.fetchUserAddToCart()
            }
           } */

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

  return (
    <div className='container mx-auto'>
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
                    loadingCart.map(el => {
                               return(
                                 <div key={el+"Add To Cart Loading"} 
                                 className='w-full bg-slate-200 h-32 border
                            border-slate-300 my-2 animate-pulse rounded'>

                            </div>
                               ) 

                    })
                       
                ) : (
                 data.map((product, index) =>{
                   return (
                    <div key={product?._id+"Add To Cart Loading"}
                    className='w-full bg-white h-32 border
                   border-slate-300 my-2 rounded grid grid-cols-[128px,1fr]'>
                    <div className='w-32 h-32 bg bg-slate-200'>
                        <img src={product?.productId?.productImage[0]} 
                        className='w-full h-full object-scale-down
                        mix-blend-multiply'/> 
                    </div>
                    <div className='px-4 py-2 relative'>
                  {/**delete product */}
                        <div className='absolute right-0 text-red-600 rounded-full
                        p-2 hover:bg-red-600 hover:text-white cursor-pointer'
                        onClick={()=>deleteCartProduct(product?._id)}>
                        <MdDelete/>
                        </div>
                        <h2 className='text-lg lg:text-xl text-ellipsis
                       line-clamp-1 '>{product?.productId?.productName}</h2>
                       <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
              <div className='flex items-center justify-between'>
              <p className='text-red-600 font-medium text-lg'>
              {displayNARCurrency(product?.productId?.sellingPrice)}</p>
              <p className='text-slate-600 font-semibold text-lg'>
              {displayNARCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
              </div>
                    <div className='flex items-center gap-3 mt-1'>
                        <button className='flex rounded hover:bg-red-600
                         hover:text-white justify-center items-center 
                         border w-6 h-6 border-red-600 text-red-600'
                         onClick={()=>decreaseQty(product?._id, product?.quantity)}
                         >-</button>
                        <span>{product?.quantity}</span>
                        <button className='flex rounded hover:bg-red-600
                         hover:text-white justify-center items-center 
                         border w-6 h-6 border-red-600 text-red-600
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
         <div className='mt-5 lg:mt-0 w-full max-w-sm'>
         {
                loading ? (
                <div className='h-36 bg-slate-200 border border-slate-300
                 animate-pulse'>
                                
                            </div>
                ) : (
        <div className='h-36 bg-white'>
        <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
        <div className='flex items-center justify-between 
        px-4 font-medium text-lg text-slate-600  gap-2'>
            <p>Quantity</p>
            <p>{totalQty}</p> 
            </div>

            <div className='flex 
            font-medium text-lg text-slate-600 items-center justify-between px-4  gap-2'>
                <p>Total Price</p>
                <p>{displayNARCurrency(totalPrice)}</p>
            </div>
            <button className='bg-blue-600 p-2 text-white
            w-full'>Payment</button>
        </div>
    )
}
         </div>
          


       </div>
    </div>
  )
}

export default Cart

