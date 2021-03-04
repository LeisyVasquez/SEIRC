import React from 'react';

import Header from '../components/base/header';
import Footer from '../components/base/footer';
import Navbar from '../components/base/navbar'
import ThirdPartyRegistrationBody from '../components/thirdPartyRegistrationBody';

const ThirdPartyRegistration = () => {
    return (
        <div className="thirdPartyRegistration">
            <Header />
            <Navbar />
            <ThirdPartyRegistrationBody />
            <Footer />
        </div>
    )
}

export default ThirdPartyRegistration;