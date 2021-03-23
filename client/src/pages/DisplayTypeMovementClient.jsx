import React from 'react';

import HeaderAdmin from '../components/base/headerAdmin'; 
import HeaderSuper from '../components/base/headerSuperUser'; 
import Footer from '../components/base/footer';
import DisplayTypeMovementClient from '../components/displayTypeMovementClient';
import {getFromLocal} from '../functions/localStorage'

const displayTypeMovementClient = () => {
    return (
        <div>
            {getFromLocal('role') ==="superUsuario"?<HeaderSuper/>:<HeaderAdmin/>}
            <DisplayTypeMovementClient/>
            <Footer />
        </div>
    )
}

export default displayTypeMovementClient;