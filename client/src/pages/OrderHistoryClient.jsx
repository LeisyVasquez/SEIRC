import React from 'react'; 

import Header from '../components/base/headerAdmin'; 
import Footer from '../components/base/footer'; 
import OrderHistoryClient from '../components/orderHistoryClient';

const orderHistoryClient = () =>{
    return(
        <div>
            <Header />
            <OrderHistoryClient />
            <Footer />
        </div>
    );
}

export default orderHistoryClient; 