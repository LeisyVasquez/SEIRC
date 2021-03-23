import React from 'react';

import HeaderAdmin from "../components/base/headerAdmin";
import HeaderSuper from '../components/base/headerSuperUser'; 
import Footer from "../components/base/footer";
import DisplayByBasketsProvider from "../components/displayByBasketsProvider";
import {getFromLocal} from '../functions/localStorage'

const displayByBasketsProvider = () => {
    return (
        <div>
            {getFromLocal('role') ==="superUsuario"?<HeaderSuper/>:<HeaderAdmin/>}
            <DisplayByBasketsProvider />
            <Footer/>
        </div>
    )
}

export default displayByBasketsProvider; 
