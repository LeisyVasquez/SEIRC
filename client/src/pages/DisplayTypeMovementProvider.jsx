import React from 'react';

import Header from '../components/base/header';
import Footer from '../components/base/footer';
import DisplayTypeMovementProvider from '../components/displayTypeMovementProvider';


const displayTypeMovementProvider = () => {
    return (
        <div>
            <Header />
            <DisplayTypeMovementProvider/>
            <Footer />
        </div>
    )
}

export default displayTypeMovementProvider;