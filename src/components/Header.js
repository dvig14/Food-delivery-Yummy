
import LOGO from "../images/logo.jpg";
import {useState} from 'react';
import {NavLink} from 'react-router-dom';
//import useOnlineStatus from '../utils/useOnlineStatus'
import {useSelector} from 'react-redux'
import { CgMenu,CgClose } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {

  const activeLink = 'text-orange-500';
  const normalLink = 'relative after:bg-orange-500 after:h-[0.1em] after:absolute after:-bottom-1 after:left-0 after:hover:w-[100%] after:hover:animate-[hoverWidth_0.5s_linear]';

 // const [btnName,setbtnName] = useState('Login')
  const [toggleMenu,setToggleMenu] = useState(false)
 // const onlineStatus = useOnlineStatus()
  const countVal = useSelector((store) => store.cart.count)
  
  const handelToggle = () => setToggleMenu(!toggleMenu)

  const cartItems = countVal.reduce((acc,curr)=>{
    return acc + curr.count
  },null)
 
  return(
    <div className="flex justify-between items-center shadow-lg fixed top-0 w-[100%] bg-white z-20 p-6">
      <div className="logo-container w-36 mobile:w-32">
        <img className="w-[100%]" alt="logo" src= {LOGO}/>
      </div>
      <div className={`nav absolute tablet:right-0 desktop:w-[40%] laptop:w-[50%] tablet:w-[55%] mobile:w-[70vw] mobile:fixed 
       mobile:transition-all mobile:ease-in-out mobile:duration-[1s] mobile:top-0 
       ${toggleMenu ? 'mobile:right-0' : 'mobile:right-[-70vw]'}` 
      }>
        <ul className='flex justify-evenly p-4 font-medium laptop:text-lg text-base items-center cursor-pointer
            mobile:bg-white mobile:flex mobile:flex-col mobile:gap-10 mobile:justify-start mobile:p-5 mobile:w-[100%]
            mobile:h-screen mobile:text-lg mobile:uppercase text-gray-800 mobile:pt-[10rem]'>
         { /*<li>Online Status : {onlineStatus ? 
            <span className='text-green-500'>on</span> :
            <span className='text-red-500'>off</span>
            }
          </li>*/}
          <li>
            <NavLink to="/" className={({isActive})=> isActive ? activeLink : normalLink} onClick={handelToggle}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({isActive})=> isActive ? activeLink : normalLink} onClick={handelToggle}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({isActive})=> isActive ? activeLink : normalLink} onClick={handelToggle}>
              Contact
            </NavLink>
          </li>
          <li className='relative'>
            <NavLink to='/cart' className={({isActive})=> isActive ? activeLink : normalLink} onClick={handelToggle}>
              Cart
            </NavLink>
            <span className='absolute laptop:bottom-[1.1rem] bg-orange-400 px-[0.3rem] rounded-[50%] text-white font-bold 
             text-xs tablet:bottom-[1rem] tablet:-right-3 bottom-[1.1rem]'>
              {cartItems}
            </span>
          </li>
         {/*<button className="bg-orange-400 text-white px-2 py-1 rounded"
            onClick={()=>{
              btnName === 'Login' 
              ? setbtnName('Logout') 
              : setbtnName('Login');
              handelToggle()
            }}
          >{btnName}</button>*/}
        </ul>
      </div>
      <div className={`relative tablet:hidden right-[2rem] ${toggleMenu ? '-z-10' : ''}`}>
        <NavLink to='/cart'>
          <FaShoppingCart className='text-xl text-gray-700'/>
        </NavLink>
        <span className='absolute right-0 bottom-[1.1rem] bg-orange-400 px-[0.3rem] rounded-[50%] text-white font-bold 
          text-xs'>
          {cartItems}
        </span>
      </div>
      <div className={`tablet:hidden right-0 p-4 text-xl cursor-pointer ${toggleMenu? 'fixed' : 'absolute'}`}>    
          <CgMenu className={`${toggleMenu ? 'hidden' : 'block'}`} onClick={handelToggle}/>
          <CgClose className={`${toggleMenu ?'block' : 'hidden'}`} onClick={handelToggle} />  
      </div>
      <div className={`${toggleMenu ? 
      'mobile:fixed mobile:bg-black/[0.4] mobile:w-[30vw] mobile:left-0 mobile:top-0 mobile:h-screen' : 'hidden'}`}></div>
    </div>
  )
}
export default Header;