import {useDispatch,useSelector} from 'react-redux'
import {addItem,removeItem,itemCount,updateAtZero} from '../utils/cartSlice'
import {IndexContext} from '../utils/IndexContext'
import {useContext} from 'react'

const AddItemBtn = ({setActiveBtnIndex,btnIndex,item,index,val,eachItemCount}) => {
  
  const dispatch = useDispatch();
  const {restName,setOtherRestaurant} = useContext(IndexContext)
  const checkRest = useSelector((store) => store.cart.count)
  const cartItems = useSelector((store) => store.cart.items)
  const itemId = item?.card?.info?.id
  const price = item?.card?.info?.price ? item?.card?.info?.price : item?.card?.info?.defaultPrice

  const handleAddItem = (item,count) => {
    dispatch(itemCount({itemId,count,price,restName})) 
    dispatch(addItem(item))
  }

  const handleRemoveItem = (item,count) => {
   count > 0 ? dispatch(itemCount({itemId,count,price,restName})) : 
    [dispatch(updateAtZero({itemId})),setActiveBtnIndex(index)] ;
    dispatch(removeItem(item))
  }

  return(
        <>
        { btnIndex ? 
          <button className=' rounded-md bg-white shadow-lg py-1 px-3 relative top-[-1rem] flex items-center gap-3
           m-auto mobile:py-[0.1rem] mobile:px-2 mobile:top-[-0.5rem]'>

           <span className='text-red-600 text-xl font-extrabold'
             onClick={() => {
               let count
               val.some((val)=> val.itemId === itemId ? count = val.count : '')
               handleRemoveItem(item,--count)
             }}>
             -
           </span>
           {eachItemCount}
           <span className='text-green-500 text-xl font-extrabold'
             onClick={() => {
              let count
              val.some((val)=> val.itemId === itemId ? count = val.count : '')
              handleAddItem(item,++count)
             }}>
             +
           </span>
         
          </button> 
         :
         <button className='bg-white py-2 px-4 relative top-[-1rem] m-auto rounded-md shadow-lg text-green-500
          mobile:py-1 mobile:top-[-0.5rem]'
          onClick={() => {
           cartItems.length === 0 || checkRest[0].restName === restName ? 
           [setActiveBtnIndex(),handleAddItem(item,1)] : setOtherRestaurant(true)
          }}>
           Add
         </button>
        }
        </>
     )
}
export default AddItemBtn;