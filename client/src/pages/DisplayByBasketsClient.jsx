import React from 'react';

import HeaderAdmin from "../components/base/headerAdmin";
import HeaderSuper from '../components/base/headerSuperUser'; 
import Footer from "../components/base/footer";
import DisplayByBasketsClient from "../components/displayByBasketsClient";
import {getFromLocal} from '../functions/localStorage'

const displayByBasketsClient = () => {
    return (
        <div>
            {getFromLocal('role') ==="superUsuario"?<HeaderSuper/>:<HeaderAdmin/>}
            <DisplayByBasketsClient />
            <Footer/>
        </div>
    )
}

export default displayByBasketsClient; 
