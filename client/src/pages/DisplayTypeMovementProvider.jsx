import React from 'react';

import HeaderAdmin from "../components/base/headerAdmin";
import Footer from '../components/base/footer';
import DisplayTypeMovementProvider from '../components/displayTypeMovementProvider';


const displayTypeMovementProvider = () => {
    return (
        <div>
            <HeaderAdmin />
            <DisplayTypeMovementProvider/>
            <Footer />
        </div>
    )
}

export default displayTypeMovementProvider;