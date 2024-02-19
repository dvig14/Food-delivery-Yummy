
import { CDN_URL } from "../utils/constants";
import { FaStar } from "react-icons/fa6"

const ReasCard = ({cloudinaryImageId,name,avgRating,cuisines,costForTwo}) => {


   return(
     <div className="flex-col w-[270px] h-fit p-3 rounded-lg hover:scale-95 text-gray-700">
      <img alt="" src={CDN_URL+cloudinaryImageId} className="w-[100%] rounded-lg shadow-xl"/>
      <h3 className="font-bold mt-3 text-lg">{name}</h3>
      <h4 className="font-semibold flex items-center gap-1">
         <FaStar className='rounded-[50%] bg-green-600 text-white p-1 text-lg'/>
         {avgRating}
         </h4>
      <h4>{cuisines.join(' , ')}</h4>
      <h4>{costForTwo}</h4>
      </div>
   )
}

/* Higher Order func. */
export const withVegReasCard = (ReasCard) => {
   return (props) => {
    return (
       <div>
         <label className='absolute m-3 bg-green-500 text-white py-1 px-3 rounded z-10 font-bold'>Veg</label>
         <ReasCard {...props}/>
       </div>
    )
   }

}

export default ReasCard;