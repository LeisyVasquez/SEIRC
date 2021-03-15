import React from 'react';

import HeaderAdmin from "../components/base/headerAdmin";
import Footer from "../components/base/footer";
import DisplayByBasketsClient from "../components/displayByBasketsClient";


const displayByBasketsClient = () => {
    return (
        <div>
            <HeaderAdmin/>
            <DisplayByBasketsClient />
            <Footer/>
        </div>
    )
}

export default displayByBasketsClient; 
