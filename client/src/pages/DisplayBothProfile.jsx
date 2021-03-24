import React from 'react';

import HeaderThirdParty from '../components/base/headerThirdParty';
import Footer from '../components/base/footer';
import DisplayClientProviderProfile from '../components/displayClientProviderProfile';



const displayBothProfile = () => {
    return (
        <div>
            <HeaderThirdParty />
            <DisplayClientProviderProfile />
            <Footer />
        </div>
    )
}

export default displayBothProfile;