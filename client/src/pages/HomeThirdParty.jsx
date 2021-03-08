import React from 'react';

import HeaderThirdParty from '../components/base/headerThirdParty'
import Footer from '../components/base/footer'
import HomeThirdParty from '../components/homeThirdParty'


const homeThirdParty = () => {
    return (
        <div>
            <HeaderThirdParty />
            <HomeThirdParty />
            <Footer />
        </div>
    )
}

export default homeThirdParty;