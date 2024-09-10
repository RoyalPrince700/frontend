import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImages';
import DisplayImage from './DisplayImage';
import { MdDelete } from 'react-icons/md'

const UploadProduct = ({
  onClose
}) => {

  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    selling : "",
  })
  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
 
  const [fullScreenImage, setFullScreenImage] = useState("")

  const handleOnChange = (e) => {

  }
  const handleUploadProduct = async(e) => {
    const file = e.target.files[0]
   

    const uploadImageCloudinary = await uploadImage(file)

    setData((preve)=>{
      return{
        ...preve,
        productImage : [ ...preve.productImage, uploadImageCloudinary.url ]
      }
        
    })
  }

const handleDeleteProductImage = async(index)=> {
  console.log("image index", index)

  const newProductImage = [...data.productImage]
  newProductImage.splice(index,1)

  setData((preve)=>{
    return{
      ...preve,
      productImage : [ ...newProductImage ]
    }
      
  })


}

  return (
    <div className='fixed bg-opacity-35 flex justify-center items-center bg-slate-200
     w-full h-full bottom-0 top-0 left-0 right-0'>
        <div className='bg-white rounded p-4 w-full max-w-2xl h-full max-h-[80%]
        overflow-hidden'>

            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg '>Upload Product</h2> 
                <div className='w-fit cursor-pointer ml-auto 
                text-2xl hover:text-red-600' onClick={onClose}>
                    <CgClose/>
                </div>
            </div>

  <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5'> {/**overflow will make the for scrollable and set it to y */}
        <label htmlFor='productName'>Product Name</label>
        <input 
        type='text' 
        id='productName' 
        placeholder='enter Product name' 
        name ='productname'
        value={data.productName}
        onChange={handleOnChange}
        className='p-2 bg-slate-100 border rounded'
        />


        <label htmlFor='brandName' className='mt-3'>Brand Name</label>
        <input 
        type='text' 
        id='brandName' 
        placeholder='enter Brand Name' 
        value={data.brandName}
        name ='brandName'
        onChange={handleOnChange}
        className='p-2 bg-slate-100 border rounded'
        />


      <label htmlFor='category' className='mt-3 '>Category</label>
        <select value={data.category} className='p-2 bg-slate-100 border rounded'>
            {
              productCategory.map((el,index)=>{
                return (
                  <option value={el.value} key={el.value+index}>{el.value}</option>
                )
              })
            }
           </select>

         <label htmlFor='productImage' className='mt-3 '>Product Image</label>
         <label htmlFor='uploadImageInput'> {/*this label makes the whole div inside it clickable to open a file */}
           <div className='p-2 cursor-pointer bg-slate-100 border rounded h-32 w-full flex
              justify-center items-center'>

             <div className='text-slate-500 flex justify-center items-center
               flex-col gap-2'>
                  <span className='text-4xl'> <FaCloudUploadAlt/></span>
                  <p className='text-sm'>Upload Product Image</p>
                  <input type='file' id='uploadImageInput' className='hidden'
                  onChange={handleUploadProduct}/>
                   </div>
           </div>
           </label>
              <div>
                {
                  data?.productImage[0] ? (
                 <div className='flex items-center gap-2'>
                  {
                     data.productImage.map((el, index)=>{
                    return(
                      <div className='relative group'>
                     <img src={el} 
                      alt={el}
                      width={80} 
                      height={80} 
                      className='bg-slate-100 cursor-pointer' 
                      onClick={()=>{
                        setOpenFullScreenImage(true)
                        setFullScreenImage(el)
                      }}/>
                      <div className='absolute bg-red-600 rounded-full
                       bottom-0 right-0 p-1 text-white hidden 
                       group-hover:block cursor-pointer'
                       onClick={()=>handleDeleteProductImage(index)}
                       >
                        <MdDelete/>
                        </div>
                      </div>
                 
                    )
                  })
                  }
                    
                 </div>
                  
                  ) : (
                    <p className='text-red-600 text-xs'>*Please Upload Product Image</p>
                  )
                }
           
              </div>

                  <button className='px-3 hover:bg-red-700 text-white py-2 mb-10 bg-red-600'>Upload Product</button>
    </form>

             
        </div>
      
      {/**dislay image full screen */}
      {
        openFullScreenImage && (
            <DisplayImage onClose={()=>setOpenFullScreenImage(false)} 
            imgUrl={fullScreenImage}/>
        )
      }
    
    </div>
  )
}

export default UploadProduct