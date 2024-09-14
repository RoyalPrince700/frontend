import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

function Home() {
  return (
    <div>
      <CategoryList/>
    
      <BannerProduct/>

      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular Watch"}/>
      
      <VerticalCardProduct  category={"mobiles"} heading={"Mobiles"}/>
      <VerticalCardProduct  category={"mouse"} heading={"Mouse"}/>
      <VerticalCardProduct  category={"televisions"} heading={"Popular Televisions"}/>
      <VerticalCardProduct  category={"camera"} heading={"Camera and Gadgets"}/>
      <VerticalCardProduct  category={"earphones"} heading={"Earphones"}/>
      <VerticalCardProduct  category={"printers"} heading={"Printers"}/>
      <VerticalCardProduct  category={"speakers"} heading={"Bluetooth Speakers"}/>
      <VerticalCardProduct  category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct  category={"trimers"} heading={"Trimers"}/>
      <VerticalCardProduct  category={"processor"} heading={"Processor"}/>
    </div>
  )
}

export default Home