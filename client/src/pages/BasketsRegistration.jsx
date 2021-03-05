import React from 'react';

import Header from '../components/base/header'
import Footer from '../components/base/footer'
import BasketsRegistration from '../components/basketsRegistration'
import '../styles/login.css';

const basketsRegistration = () => {
    return (
        <div className="">
            <Header />
            <BasketsRegistration />
            <Footer />
        </div>
    )
}

export default basketsRegistration;