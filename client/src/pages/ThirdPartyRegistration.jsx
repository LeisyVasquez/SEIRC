import React from 'react';

import Header from '../components/base/header';
import Footer from '../components/base/footer';
import ThirdPartyRegistrationBody from '../components/thirdPartyRegistrationBody';

const ThirdPartyRegistration = () => {
    return (
        <div className="thirdPartyRegistration">
            <Header />
            <ThirdPartyRegistrationBody />
            <Footer />
        </div>
    )
}

export default ThirdPartyRegistration;