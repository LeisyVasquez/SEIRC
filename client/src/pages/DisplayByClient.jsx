import React from 'react';

import HeaderAdmin from "../components/base/headerAdmin";
import Footer from "../components/base/footer";
import DisplayByClient from "../components/displayByClient";


const displayByClient = () => {
    return (
        <div>
            <HeaderAdmin/>
            <DisplayByClient />
            <Footer/>
        </div>
    )
}

export default displayByClient; 