import React from 'react';

import HeaderAdmin from "../components/base/headerAdmin";
import Footer from "../components/base/footer";
import DisplayByBaskets from "../components/displayByBaskets";


const displayByBaskets = () => {
    return (
        <div>
            <HeaderAdmin/>
            <DisplayByBaskets />
            <Footer/>
        </div>
    )
}

export default displayByBaskets; 
