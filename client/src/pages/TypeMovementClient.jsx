import React from 'react';

import Header from '../components/base/header';
import Footer from '../components/base/footer';
import TypeMovementClient from '../components/typeMovementClient';


const typeMovementClient = () => {
    return (
        <div>
            <Header />
            <TypeMovementClient/>
            <Footer />
        </div>
    )
}

export default typeMovementClient;