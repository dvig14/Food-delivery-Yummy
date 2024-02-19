const Contact = () =>{
    return(
        <div className='mt-[10rem] smallM:mt-[6rem] desktop:py-4 flex flex-col items-center gap-[4rem] font-[Arial]'>
           <h2 className='font-bold text-3xl tracking-wide mobile:w-[80%] text-center text-gray-800 smallM:w-[100%] 
           smallM:text-[1.7rem] smallM:leading-[2.5rem]'>
              Feel Free To Contact Us
           </h2>
           
           <form action='https://formspree.io/f/xqkradby' method='POST' className='flex flex-col gap-[2rem] border-black 
             laptop:w-[40%] tablet:w-[50%] mobile:w-[80%] '>
  
              <input type='text' placeholder='USERNAME' name='USERNAME' required
               className='border-2 border-[#FFE7C7] p-2 placeholder:text-sm outline-orange-300 tracking-wide'/>
  
              <input type='text' placeholder='EMAIL' name='EMAIl' required 
               className={`border-2 border-[#FFE7C7] p-2 placeholder:text-sm outline-orange-300 tracking-wide`} />
  
              <textarea name='message' rows='5' placeholder='Add your comment...' required
               className='border-2 border-[#FFE7C7] p-2 placeholder:text-sm outline-orange-300'/>
  
              <input type='submit' className='bg-orange-500 w-[100px] py-[0.5rem] text-white font-medium tracking-wider 
               rounded-md cursor-pointer' value='Send'/>
           </form>

           <iframe title='map'
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108704.21800053399!2d74.78771819809008!3d31.6336638533191
            63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391964aa569e7355%3A0xeea2605bee84ef7d!2sAmritsar%2C%20Punjab!
            5e0!3m2!1sen!2sin!4v1705341799683!5m2!1sen!2sin" 
            width="100%" 
            height="350" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className='animate-[flash_2s_ease] bg-gray-200 mb-[2rem]'
           />
  
        </div>
     )
  
}
export default Contact;