import React from 'react';

import Header from '../components/base/header';
import Footer from '../components/base/footer';
import DisplayTypeMovementClient from '../components/displayTypeMovementClient';


const displayTypeMovementClient = () => {
    return (
        <div>
            <Header />
            <DisplayTypeMovementClient/>
            <Footer />
        </div>
    )
}

export default displayTypeMovementClient;