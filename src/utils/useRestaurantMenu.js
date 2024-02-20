import {useEffect,useState} from "react";
import {Menu_API} from "../utils/constants";

const useRestaurantMenu = (resId) => {

    const [resInfo,setResInfo] = useState(null);

    useEffect(()=>{
        fetchMenu();
    },[])

    const fetchMenu = async() => {
      try{
          const data = await fetch('https://corsproxy.org/?' +  encodeURIComponent(Menu_API) + resId)
          const json = await data.json();
         // console.log(json.data)
          setResInfo(json.data)
      }
      catch(e){console.log(e)}
    };
    
    return resInfo;
}

export default useRestaurantMenu;
