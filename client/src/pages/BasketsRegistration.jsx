import React from 'react';

import Header from '../components/base/header'
import Footer from '../components/base/footer'
import BasketsRegistration from '../components/basketsRegistration'


const basketsRegistration = () => {
    return (
        <div>
            <Header />
            <BasketsRegistration />
            <Footer />
        </div>
    )
}

export default basketsRegistration;