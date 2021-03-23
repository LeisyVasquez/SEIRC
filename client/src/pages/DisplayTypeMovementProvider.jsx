import React from 'react';

import HeaderAdmin from "../components/base/headerAdmin";
import HeaderSuper from '../components/base/headerSuperUser'; 
import Footer from '../components/base/footer';
import DisplayTypeMovementProvider from '../components/displayTypeMovementProvider';
import {getFromLocal} from '../functions/localStorage'

const displayTypeMovementProvider = () => {
    return (
        <div>
            {getFromLocal('role') ==="superUsuario"?<HeaderSuper/>:<HeaderAdmin/>}
            <DisplayTypeMovementProvider/>
            <Footer />
        </div>
    )
}

export default displayTypeMovementProvider;