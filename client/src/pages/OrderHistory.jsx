import React from 'react'; 

import Header from '../components/base/headerAdmin'; 
import Footer from '../components/base/footer'; 
import OrderHistory from '../components/orderHistory';

const orderHistory = () =>{
    return(
        <div>
            <Header />
            <OrderHistory />
            <Footer />
        </div>
    );
}

export default orderHistory; 