import {NavLink,Link} from 'react-router-dom'
import {FaLinkedin,FaXTwitter,FaSquareGithub } from "react-icons/fa6";
import Logo from '../images/logo.jpg'

const Footer = () => {

    const year = new Date().getFullYear()

    return(
        <div className='relative bottom-0 bg-[#263134] mt-[5rem] flex flex-col h-[400px] items-center mobile:h-fit z-20'>

            <section className='absolute laptop:top-[-3.5rem] bg-[#fcf5ee] laptop:w-[70vw] laptop:py-[1.5rem] 
             laptop:px-[3rem] flex justify-between rounded-md font-semibold drop-shadow-xl px-[2rem] py-[1rem] top-[-2.8rem] 
             w-[80vw] smallM:px-[1rem] smallM:w-[90vw]'>

                <div className='text-gary-800 leading-7 smallM:text-sm'>
                    <p>Ready to get started?</p>
                    <p>Talk to us today</p>
                </div>
                 
                <NavLink to='/contact' className='bg-orange-500 text-white py-[0.5rem] px-[0.8rem] my-auto rounded-md
                mobile:px-[0.5rem] mobile:text-sm smallM:font-normal'>
                    GET STARTED
                </NavLink>

            </section>

            <footer className='text-white flex justify-evenly items-center gap-[4rem] relative h-[100%] w-[90%] 
            mobile:flex-col mobile:justify-start mobile:gap-[2.5rem] mobile:mb-[4rem]'>
             <div className='w-[30%] mobile:w-[80%] mobile:mt-[4rem]'>
                <h2 className='laptop:text-lg text-center pb-1 mobile:text-lg mobile:font-bold'>About Us</h2>
                <p className='laptop:text-sm text-xs laptop:font-light leading-[1.5rem] text-center mobile:text-sm
                mobile:text-justify'>
                Welcome to Yummy, your go-to destination for delicious meals delivered straight to your doorstep. 
                At Yummy, we're passionate about connecting you with your favorite cuisines.
                </p>
             </div>
             <div className='flex flex-col gap-[2rem] items-center'>
               <img src={Logo} alt='logo' className='w-[120px] p-2 bg-white rounded-md mobile:hidden'/>
               <div className='flex gap-[1.2rem] items-center'>
                 <span className='tablet:hidden'>Join Us :</span>
                 <Link to='https://www.linkedin.com/in/diksha14 ' className='bg-gray-900 p-2 rounded-[50%]'>
                    <FaLinkedin className='text-2xl text-white'/>
                 </Link>
                 <Link to='https://twitter.com/Diksha74599412' className='bg-gray-900 p-2 rounded-[50%]'>
                    <FaXTwitter className='text-xl text-white'/>
                 </Link>
                 <Link to='https://github.com/dvig14 ' className='bg-gray-900 p-2 rounded-[50%]'>
                    <FaSquareGithub className='text-2xl text-white'/>
                 </Link>
               </div>
             </div>
             <div className='flex flex-col text-white text-base font-medium gap-1 tablet:w-[20%]'>
                 <span className='text-lg font-light mb-1'>Quick Links</span>
                 <NavLink to='/'>Home</NavLink>
                 <NavLink to='/about'>About Us</NavLink>
                 <NavLink to='/contact'>Contact Us</NavLink>
                 <NavLink to='/cart' >Cart</NavLink>
              </div>
            </footer>
            <p className='absolute bottom-0 text-white mobile:text-sm p-2 bg-[#222c2f] w-[100%] text-center'>
                © Copyright {year} Yummy.com
            </p>
        </div>
    )

}
export default Footer