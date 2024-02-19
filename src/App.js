import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import Footer from './components/Footer'
import RestaurantMenu from "./components/RestaurantMenu";
import {Provider} from 'react-redux'
import appStore from './utils/appStore'
import Cart from './components/Cart'
import {IndexProvider} from './utils/IndexContext'

const AppLayout = () => {

    return(
        <Provider store={appStore}>
          <IndexProvider>
         <React.Fragment>
          <Router>
           <Header/>
           <Routes>
             <Route  path='/' element={<Main/>}/>
             <Route path='/about' element={<About/>}/>
             <Route path='/contact' element={<Contact/>}/>
             <Route path='/cart' element={<Cart/>}/>
             <Route path='/restaurants/:resId' element={<RestaurantMenu/>}/>
             <Route path='/*' element={<Error/>}/>
           </Routes>
           <Footer/>
          </Router>
         </React.Fragment>
         </IndexProvider>
        </Provider>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppLayout/>);