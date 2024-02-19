import {NavLink} from "react-router-dom"

const Error = () =>{
    return(
      <div className='h-[80vh] text-center pt-[5rem] px-[2rem] flex flex-col items-center justify-center gap-4 font-[Arial] 
        text-gray-800'>
         <h2 className='text-6xl mobile:5xl'>404</h2>
         <p className='text-3xl  mobile:2xl'>UH OH! You're Lost</p>
         <p className='font-semibold text-gray-600 mobile:text-sm'>
           The page you are looking for does not exist. How you got here is a mystery. But you can click the button below to go
           back to homepage
         </p>
         <NavLink to="/" className="text-white bg-orange-500 p-2 rounded cursor-pointer text-semibold">
            Go Back To Home
         </NavLink>
      </div>
    )
}
export default Error;