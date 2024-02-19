import {createContext,useState} from 'react';

const IndexContext = createContext()

const IndexProvider = ({children}) => {
   
    const [isCart,setIsCart] = useState(false)
    const [restName,setRestName] = useState('')
    const [otherRestaurant,setOtherRestaurant] = useState(false)

    return <IndexContext.Provider value={{isCart,setIsCart,restName,setRestName,otherRestaurant,setOtherRestaurant}}>
        {children}
    </IndexContext.Provider>
}

export {IndexContext,IndexProvider};