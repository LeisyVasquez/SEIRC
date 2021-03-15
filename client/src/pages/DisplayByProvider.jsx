import React from 'react';

import HeaderAdmin from "../components/base/headerAdmin";
import Footer from "../components/base/footer";
import DisplayByProvider from "../components/displayByProvider";


const displayByProvider = () => {
    return (
        <div>
            <HeaderAdmin/>
            <DisplayByProvider />
            <Footer/>
        </div>
    )
}

export default displayByProvider; 