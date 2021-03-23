import React from 'react';

import HeaderAdmin from "../components/base/headerAdmin";
import HeaderSuper from '../components/base/headerSuperUser'; 
import Footer from "../components/base/footer";
import DisplayByClient from "../components/displayByClient";
import {getFromLocal} from '../functions/localStorage'

const displayByClient = () => {
    return (
        <div>
            {getFromLocal('role') ==="superUsuario"?<HeaderSuper/>:<HeaderAdmin/>}
            <DisplayByClient />
            <Footer/>
        </div>
    )
}

export default displayByClient; 