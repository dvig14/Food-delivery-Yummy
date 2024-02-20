
import Shimmer from "./shimmer"
import {useParams} from "react-router-dom";
import useRestaurantMenu from '../utils/useRestaurantMenu'
import ReasCategory from './ReasCategory'
import {useState,useContext} from 'react'
import {IndexContext} from '../utils/IndexContext'
import {useDispatch} from 'react-redux'
import {clearCart} from '../utils/cartSlice'
import { FaStar } from "react-icons/fa6"

const RestaurantMenu = () => {

    const {resId} = useParams()
    const [showIndex,setShowIndex] = useState(null);
    const {setRestName,otherRestaurant,setOtherRestaurant} = useContext(IndexContext)
    const dispatch = useDispatch()

    const handelCart = () => {
        dispatch(clearCart())
        setOtherRestaurant(false)
    }

    const resInfo = useRestaurantMenu(resId)
    
    if(resInfo === null) return <Shimmer/>
    
    const {name, cuisines, costForTwoMessage,areaName,avgRating,totalRatingsString} = 
    resInfo?.cards?.map((x)=>x.card)?.find((x) => 
     x && x.card["@type"] === 'type.googleapis.com/swiggy.presentation.food.v2.Restaurant')?.card?.info

    const categories = resInfo?.cards.find((x)=>x.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) => c.card?.card?.["@type"] === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
    )
   
    return (
        <div className='mt-[8rem] text-gray-700 flex flex-col items-center'>
            <div className='flex laptop:w-7/12 tablet:w-9/12 mobile:w-[90%] justify-between border-b border-dashed 
             border-gray-300 pb-[1rem] items-center'>
              <div className='flex flex-col gap-1'>
               <p className='font-bold text-lg text-gray-800 smallM:text-base'>{name}</p>
               <p className='text-sm text-gray-500 text-left smallM:text-xs'>{cuisines.join(' , ')}</p>
               <p className='text-sm text-gray-500 text-left smallM:text-xs'>{areaName}</p>
              </div>
              <div className='border rounded-md shadow-sm px-2 py-1 flex flex-col gap-2'>
                <p className='flex items-center justify-center gap-1 text-green-600 font-bold smallM:text-sm'>
                  <FaStar/>
                  {avgRating}
                </p>
                <hr/>
                <p className='text-xs text-gray-500 font-medium pb-2'>{totalRatingsString}</p>
              </div>
            </div>
            <p className='my-4 font-bold'>{costForTwoMessage}</p>
            {
              categories.map((category,index) => (
                  <ReasCategory key={category?.card?.card?.title} {...category?.card?.card} 
                   showItemList = {index === showIndex ? true : false}
                   showSign = {index === showIndex ? '-' : '+'}
                   setShowIndex = {() => {
                     setShowIndex(showIndex === index ? null : index)
                     setRestName(name)
                   }}
                 /> 
              ))
            } 
            <div className={`${otherRestaurant ? 'bottom-[1rem]' : 'bottom-[-100vh]'} desktop:w-[40%] laptop:w-[50%] 
            tablet:w-[60%] mobile:w-[90%] smallM:p-6 fixed bg-white shadow-2xl p-8 shadow-gray-600 z-30
            transition-all ease-in-out duration-[0.5s]`}>
                <h3 className='text-left font-bold text-xl text-gray-800 mb-[0.4rem] smallM:text-lg'>
                    Items already in cart
                </h3>
                <p className='text-left text-gray-600 text-sm'>
                 Your cart contains items from other restaurant. Would you like to reset your cart for adding items from 
                 this restaurant?
                </p>
                <div className='mt-[1.5rem] flex justify-evenly gap-[1.3rem]'>
                    <button className='uppercase border-2 border-[#60b246] p-3 w-[50%] text-[#60b246] font-medium
                    hover:shadow-lg hover:shadow-gray-300 smallM:p-2 smallM:text-sm'onClick={()=>setOtherRestaurant(false)}>
                        no
                    </button>
                    <button className='uppercase bg-[#60b246] p-3 w-[50%] text-white font-medium  hover:shadow-lg 
                    hover:shadow-gray-300 smallM:p-2 smallM:text-sm' onClick={handelCart}>
                        yes, start afresh
                    </button>
                </div>
            </div>  
        </div>
    )

}
export default RestaurantMenu;