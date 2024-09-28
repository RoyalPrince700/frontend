import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import SubHeader from '../components/SubHeader'

function Home() {
  return (
    <div className='mt-16 lg:mt-0'>
      {/* <CategoryList/> */}
      <SubHeader/>
    
      <BannerProduct/>

      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular Watch"}/>
      
      <VerticalCardProduct  category={"mobiles"} heading={"mobiles"}/>
      <VerticalCardProduct  category={"mouse"} heading={"Mouse"}/>
      <VerticalCardProduct  category={"televisions"} heading={"Popular Televisions"}/>
      <VerticalCardProduct  category={"camera"} heading={"Camera and Gadgets"}/>
      <VerticalCardProduct  category={"earphones"} heading={"Earphones"}/>
      <VerticalCardProduct  category={"printers"} heading={"Printers"}/>

      <HorizontalCardProduct category={"speakers"} heading={"Popular Speakers"}/>
      <HorizontalCardProduct category={"mobiles"} heading={"mobiles"}/>

      <VerticalCardProduct  category={"speakers"} heading={"Bluetooth Speakers"}/>
      <VerticalCardProduct  category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct  category={"trimers"} heading={"Trimers"}/>
      <VerticalCardProduct  category={"processor"} heading={"Processor"}/>
    </div>
  )
}

export default Home