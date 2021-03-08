import React from 'react';

import HeaderAdmin from '../components/base/headerAdmin';
import Footer from '../components/base/footer';
import ThirdPartyRegistrationBody from '../components/thirdPartyRegistrationBody';

const ThirdPartyRegistration = () => {
    return (
        <div className="thirdPartyRegistration">
            <HeaderAdmin />
            <ThirdPartyRegistrationBody />
            <Footer />
        </div>
    )
}

export default ThirdPartyRegistration;