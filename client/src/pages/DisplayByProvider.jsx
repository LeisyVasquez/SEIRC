import React from 'react';

import HeaderAdmin from "../components/base/headerAdmin";
import HeaderSuper from '../components/base/headerSuperUser'; 
import Footer from "../components/base/footer";
import DisplayByProvider from "../components/displayByProvider";
import {getFromLocal} from '../functions/localStorage'

const displayByProvider = () => {
    return (
        <div>
            {getFromLocal('role') ==="superUsuario"?<HeaderSuper/>:<HeaderAdmin/>}
            <DisplayByProvider />
            <Footer/>
        </div>
    )
}

export default displayByProvider; 