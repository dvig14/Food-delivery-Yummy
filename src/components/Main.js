import ReasCard , {withVegReasCard} from "./ReasCard";
import {useState,useEffect} from "react";
import Shimmer from "./shimmer"
import {Link} from "react-router-dom"
import {IoIosArrowDown } from "react-icons/io";
import {CgClose } from "react-icons/cg";
//import useOnlineStatus from '../utils/useOnlineStatus'
import {IndexContext} from '../utils/IndexContext'
import {useContext} from 'react'
import {Swiggy_URL} from '../utils/constants'
//import { useQuery } from '@tanstack/react-query';

const Main = () => {

  const [ListOfCards,setListOfCards] = useState([])
  const [FilterCards,setFilterCards] = useState([])
  const [searchText,setSearchText] = useState('')
  const [itemNotFound,setItemNotFound] = useState(false)
  const [sort,setSort] = useState(false)
  const [filter,setFilter] = useState(false)
  const {setOtherRestaurant} = useContext(IndexContext)
  const [activeFilter,setActiveFilter] = useState([])
  const [targetFilter,setTargetFilter] = useState('')
  const [Sibling,setSibling] = useState(false)
  const normalfilter = 'flex items-center gap-1 text-gray-600 font-medium rounded-3xl border px-3 py-2 shadow-xl text-sm outline-none shadow-gray-100'
  const activefilter = `${normalfilter} bg-gray-200 border-gray-400`

  const fetchData = async () => {
    try{
      const data = await fetch(`https://thingproxy.freeboard.io/fetch/${Swiggy_URL}`);

      const json = await data.json();

      const getResCards = async (jsonData) => {

        const cards = jsonData?.data?.cards

        for(let i=0 ; i<cards.length; i++) {
          const checkRestaurants = cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants
          if(checkRestaurants != undefined) return checkRestaurants
        }

      }

      const resCards = await getResCards(json)
      setListOfCards(resCards)
      setFilterCards(resCards)
      setOtherRestaurant(false)
      //console.log(resCards)
      //console.log(json)
    }
    catch(e){
       console.log(e)
    }

  }
  useEffect(()=>{
    fetchData()
  },[])
  
  useEffect(()=>{
    handelFilter()
  },[activeFilter])
  //const onlineStatus = useOnlineStatus();

  /*if(onlineStatus === false) return(
      <h1 className='font-bold text-center'>Look's like your offline!!</h1>
  )*/

  const searchData = (text) => {
    const cards = searchText === '' ? FilterCards : ListOfCards
    const filteredRest = [...cards].filter((res) => res.info.name.toLowerCase().includes(text.toLowerCase()))
    filteredRest.length !== 0 ? [setFilterCards(filteredRest),setItemNotFound(false)] : setItemNotFound(true)
  }

  const sorting = (sortBy) => {
     const filterRest = FilterCards.sort((a,b)=>{ 
        let result
        const priceA = Number(a.info.costForTwo.split(' ')[0].slice(1))
        const priceB = Number(b.info.costForTwo.split(' ')[0].slice(1))
        if(sortBy === 1) result = priceB - priceA
        else if(sortBy === 2) result = priceA - priceB
        else if(sortBy === 3) result = a.info.name.localeCompare(b.info.name)
        else if(sortBy === 4) result = b.info.name.localeCompare(a.info.name)
        else if(sortBy === 5) result = b.info.avgRating - a.info.avgRating
        return result
     })
    setFilterCards(filterRest)
  }

  const handelSort = (e) => {
    switch(e.target.value){
      case 0 : setFilterCards(ListOfCards);
      break;
      default : sorting(e.target.value);
      break;
    }
  }    
  
  const handelFilter = () => {
    
    if(targetFilter !== '') {
     
      const sibling = targetFilter.value === '300-600' ? targetFilter.nextSibling : targetFilter.value === '300>less' ?
      targetFilter.previousSibling : ''

      if((targetFilter.value === '300>less' || targetFilter.value === '300-600') && !Sibling){
        sibling.className = 'hidden'
        setSibling(true)
      } 
      else if(targetFilter.value === '300>less' || targetFilter.value === '300-600'){
        sibling.className = normalfilter
        setSibling(false)
      }
      
      activeFilter.includes(targetFilter.value) ? 
      targetFilter.className = activefilter : targetFilter.className = normalfilter 
      
    }
    
    let result = ''
    let arr = []
    let count = 0
    activeFilter.length !== 0 ? activeFilter.map((val)=>{
      
      const filterList = ListOfCards.filter((res) => {

        const price = Number(res.info.costForTwo.split(' ')[0].slice(1))
        if(val === '4.2+') result = res.info.avgRating > 4.2
        else if(val === 'veg') result =  res.info.veg
        else if(val === '300-600') result = 300 <= price && price <= 600  
        else if(val === '300>less') result =  price < 300
        return result
         
      })

      arr.length === 0 && count === 0 ? [arr = filterList,count = 1] : arr.flat().length !== 0 ?
      arr = arr.flat().map((item) => filterList.filter((val) => val.info.id === item.info.id)) : ''
      
      filterList.length !== 0 && arr.flat().length !== 0 ? [setFilterCards(arr.flat()),setItemNotFound(false)]
      : setItemNotFound(true)

    }) 
    : [setItemNotFound(false),setFilterCards(ListOfCards)]

  }

  const handelActiveFilter = (e) => {
    
    setTargetFilter(e.target)
    const filter = e.target.value 
    setActiveFilter((activeFilter) => [...activeFilter].includes(filter) ? 
      [...activeFilter].filter((val) => val !== filter) : [...activeFilter,filter]
    ) 
   
  }

  const ReasCardVeg = withVegReasCard(ReasCard)

    return ListOfCards.length === 0 ? <Shimmer/> : (

        <div className="mt-[10rem] w-[85vw] mobile:w-[100%] mx-auto">
          <div className="search-bar flex items-center justify-center gap-2 mb-[2rem]">
            <span className='font-medium text-gray-700'>Search :</span>
            <input type="text" placeholder="Search" value={searchText} 
              className="border pl-2 py-1 rounded border-[#FFE7C7] outline-orange-300"
              onChange={(e)=>{setSearchText(e.target.value)
                searchData(e.target.value)
              }}
             />
          </div>
         
         <div className='fixed bottom-0 w-[100%] bg-gray-800 opacity-[0.95] z-20 p-3 text-center text-white font-medium 
          text-xl tablet:hidden' onClick={()=>setFilter(!filter)}>
           Filter
         </div>
         <div className={`w-[95%] ${filter ? 'mobile:top-0' : 'mobile:top-[-100vh]'} mobile:h-[100vh] mobile:bg-white 
          mobile:fixed mx-auto flex items-center gap-3 mobile:z-30 mobile:w-[100%] mobile:flex-col mobile:justify-start
          mobile:transition-all mobile:ease-in-out mobile:duration-[2s] mobile:pt-[8rem] mobile:gap-[1.5rem]`}>

          <CgClose className={`text-4xl border p-2 text-gray-700 rounded-[50%] shadow-md tablet:hidden`} 
           onClick={()=>setFilter(!filter)}
          />  

          <div className="filter flex flex-col gap-[0.1rem] text-white items-start cursor-pointer relative">
            <button className=" flex items-center gap-1 text-gray-600 font-medium rounded-3xl border px-3 py-2 shadow-xl
             text-sm outline-none shadow-gray-100" onClick={()=>setSort(!sort)}>
              Sort By 
              <IoIosArrowDown className='font-bold'/>
            </button> 
            <ul className={`${sort ? 'flex absolute top-[2.5rem]' : 'hidden'} p-1 cursor-pointer text-base flex-col 
            text-gray-600 bg-white rounded-xl border shadow font-medium z-30 w-[150px]`}
             onClick={(e)=>{
              handelSort(e)
              setSort(!sort)
             }}
            >
             <li value='0' className='hover:bg-[#FFE7C7] p-2 rounded'>Relevance</li>
              <li value='1' className='hover:bg-[#FFE7C7] p-2 rounded'>Price (high-Low)</li>
              <li value='2' className='hover:bg-[#FFE7C7] p-2 rounded'>Price (low-high)</li>
              <li value='3' className='hover:bg-[#FFE7C7] p-2  rounded'>Alphabet (a-z)</li>
              <li value='4' className='hover:bg-[#FFE7C7] p-2  rounded'>Alphabet (z-a)</li>
              <li value='5' className='hover:bg-[#FFE7C7] p-2 rounded'>Ratings</li>
           </ul>
          </div> 

          <button className={normalfilter} value='4.2+' onClick={handelActiveFilter}>
              Ratings 4.2+
          </button>
          <button className={normalfilter} value='veg' onClick={handelActiveFilter}>
              Pure Veg
          </button> 
          <button className={normalfilter} value='300-600' onClick={handelActiveFilter}>
              Rs. 300-Rs. 600
          </button>  
          <button className={normalfilter} value='300>less' onClick={handelActiveFilter}>
              Less than Rs. 300
          </button> 

        </div>
  
          <div className="flex flex-wrap gap-y-5 py-6 justify-evenly relative">

            { itemNotFound ?
              <h2 className='text-gray-700 font-bold h-[100vh] text-lg mobile:text-base'>
                No match found for "{searchText}"
              </h2>
              :
              FilterCards.map((rest)=>(
                <Link key={rest.info.id} to={"/restaurants/"+ rest.info.id}>
                  { 
                    rest.info.veg ? (<ReasCardVeg {...rest.info}/>) : (<ReasCard {...rest.info}/>)
                  }
                </Link>
              ))
            }

          </div>
        </div>
    )
}
export default Main;