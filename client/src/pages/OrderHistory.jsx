import React from 'react'; 
import HeaderAdmin from '../components/base/headerAdmin'; 
import HeaderSuper from '../components/base/headerSuperUser'; 
import Footer from '../components/base/footer'; 
import OrderHistory from '../components/orderHistory';
import {getFromLocal} from '../functions/localStorage'
const orderHistory = () =>{
    return(
        <div>
            {getFromLocal('role') ==="superUsuario"?<HeaderSuper/>:<HeaderAdmin/>}
            <OrderHistory />
            <Footer />
        </div>
    );
}

export default orderHistory; 