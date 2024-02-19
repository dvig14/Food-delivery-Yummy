import ItemsList from './ItemsList'
import {useDispatch,useSelector} from 'react-redux'
import {clearCart} from '../utils/cartSlice'
import {NavLink} from 'react-router-dom'
import {useContext,useEffect} from 'react'
import {IndexContext} from '../utils/IndexContext'

const Cart = () => {

    const cartItems = useSelector((store) => store.cart.items)
    const itemCount = useSelector((store) => store.cart.count)
    const dispatch = useDispatch()
    const {setIsCart} = useContext(IndexContext)

    const itemTotal = itemCount.reduce((acc,curr)=>{   
      const {price,count} = curr
      return acc + (price/100 * count)
    },0)

    useEffect(()=>{
      setIsCart(true)
    },[])
   //console.log(itemCount)

    const handleClearCart = () => dispatch(clearCart())
     
      return(
        <div className='text-center mx-auto p-4 smallM:px-0 w-[100%] mt-[7rem]'>
            {cartItems.length == 0 ? 
              <div className='w-[100%] h-[50vh] mb-[3rem] flex flex-col gap-[1rem] mt-[3rem]'>
                <img src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0' 
                  alt='' className='w-[280px] h-[75%] mx-auto'/>
                <p className='flex flex-col text-gray-600'>
                 <span className='font-bold text-lg'>Your cart is empty</span>
                 <span className='text-gray-500'>You can go to home page to view more restaurants</span>
                </p>
                <button className='bg-[#fc8019] px-4 py-2 my-2 mx-auto font-semibold text-white uppercase'>
                 <NavLink to='/'>see restaurants near you</NavLink>
                </button>
              </div> 
               : 
              <div className='flex flex-col bg-gray-100 p-4'>
              <button className='bg-[#fc8019] px-2 py-1 my-[2rem] mx-auto font-semibold text-white'
                onClick={handleClearCart}
              >
                Clear cart
              </button> 
              <div className='desktop:w-[50%] laptop:w-[60%] tablet:w-[70%] mobile:w-[90%] smallM:w-[100%] mx-auto relative mb-[3rem]'>
              <p className='w-[100%] bg-white px-[2rem] py-[0.8rem] text-gray-800 font-medium text-lg text-left 
              border-b-2 border-gray-100'>
                {itemCount[0].restName}'s Order
              </p>

              <div className='overflow-y-scroll w-[100%] h-[300px] bg-white'>

                <ItemsList items={cartItems}/>

                <div className='w-[100%] bg-white font-medium text-left mt-[-1rem] text-sm flex flex-col 
                  gap-[0.6rem] py-3 px-[1.5rem]'>
                   <span className='font-bold text-gray-800'>Bill Details</span>
                   <p className='text-gray-500 flex justify-between'>Item Total <span>Rs.{itemTotal.toFixed(2)}</span></p>
                   <p className='text-gray-500 flex justify-between'>Delivery Fee | 1.5 kms<span>Rs.47</span></p>   
                </div>

              </div>

              <div className='bg-white w-[100%] flex justify-between border-t px-[1.5rem] py-[1rem] text-lg font-medium
              text-gray-800'>
                <span>TO PAY</span>
                <span>Rs.{(itemTotal + 47).toFixed(2)}</span>
              </div>

              </div>
             </div>
            }
        </div>
      )

}
export default Cart