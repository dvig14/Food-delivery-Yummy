import React,{useState,useContext} from 'react'
import {CDN_URL} from '../utils/constants'
import AddItemBtn from './AddItemBtn'
import {useSelector} from 'react-redux'
import {IndexContext} from '../utils/IndexContext'

const ItemsList = ({items}) => {

  const [activeBtnIndex,setActiveBtnIndex] = useState([])
  const countVal = useSelector((store) => store.cart.count)
  const {isCart} = useContext(IndexContext)

  return(
    <div className={`${isCart ? 'w-[100%] bg-white' : 'w-full'}`}>
      {
        items.map((item,index)=>(
           
          <div key={item.card.info.id} className={`flex py-3 px-4 my-1 ${isCart ? 
            'items-center justify-evenly text-gray-800 mb-[1rem]' : 'text-left gap-3 justify-between border-b-2'}`}
           >

            <div className={`flex flex-col gap-2 ${isCart ? 'text-left w-7/12 mx-1' : 'w-10/12'}`}>

              <span className='font-bold mobile:text-sm'>{item.card.info.name}</span>

              <span className='font-medium mobile:text-sm'>
                 Rs - {item.card.info.price ? (item.card.info.price / 100) : (item.card.info.defaultPrice / 100)}
              </span>

              <p className={`${isCart ? 'hidden' : 'text-slate-600 text-sm mb-1 mobile:text-xs'}`}>
                {item.card.info.description}
              </p>

            </div>

            <div className={`${isCart ? 'font-bold flex items-center mr-[1.5rem] ' : 'hidden'}`}>

            { isCart && 
              <AddItemBtn btnIndex = {true}
                 eachItemCount = {countVal.map((val)=> val.itemId === item?.card?.info?.id ? val.count : null)}
                  val = {countVal}
                  item = {item}
                  index = {index}
                  setActiveBtnIndex = {() => ''}
              />
            }
            </div>

            <div className={`${isCart ? '' : 'flex flex-col w-[120px] mobile:w-[110px] font-bold h-[100px]'}`}>

              {
                item.card.info.imageId ?
                <img src={CDN_URL + item.card.info.imageId} className={`rounded-sm ${isCart ? 'smallM:h-14 h-16' : 
                'h-20 mobile:h-16'}`}/> : ''
              }
              {
                !isCart && 
                <AddItemBtn btnIndex = {activeBtnIndex.includes(index)}
                  eachItemCount = {countVal.map((val)=> val.itemId === item?.card?.info?.id ? val.count : null)}
                  val = {countVal}
                  item = {item}
                  index = {index}
                  setActiveBtnIndex = {(ind) => setActiveBtnIndex((activeBtnIndex) => 
                    [...activeBtnIndex].includes(index) ?
                    [...activeBtnIndex].filter((index) => ind !== index)
                    : [...activeBtnIndex,index]
                  )}
                />
              }

            </div>

          </div>
        ))
     } 
    </div>
  )
}
export default ItemsList