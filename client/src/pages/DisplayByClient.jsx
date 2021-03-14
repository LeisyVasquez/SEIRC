import React from 'react';

import HeaderSuperUser from "../components/base/headerSuperUser";
import Footer from "../components/base/footer";
import DisplayByClient from "../components/displayByClient";


const displayByClient = () => {
    return (
        <div>
            <HeaderSuperUser/>
            <DisplayByClient />
            <Footer/>
        </div>
    )
}

export default displayByClient; 