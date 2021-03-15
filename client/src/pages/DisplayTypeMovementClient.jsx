import React from 'react';

import HeaderAdmin from "../components/base/headerAdmin";
import Footer from '../components/base/footer';
import DisplayTypeMovementClient from '../components/displayTypeMovementClient';


const displayTypeMovementClient = () => {
    return (
        <div>
            <HeaderAdmin />
            <DisplayTypeMovementClient/>
            <Footer />
        </div>
    )
}

export default displayTypeMovementClient;