import React from 'react';

import HeaderAdmin from "../components/base/headerAdmin";
import Footer from "../components/base/footer";
import DisplayByBasketsProvider from "../components/displayByBasketsProvider";


const displayByBasketsProvider = () => {
    return (
        <div>
            <HeaderAdmin/>
            <DisplayByBasketsProvider />
            <Footer/>
        </div>
    )
}

export default displayByBasketsProvider; 
