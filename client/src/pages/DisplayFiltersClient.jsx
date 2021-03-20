import React from 'react';

import HeaderThirdParty from '../components/base/headerThirdParty';
import Footer from '../components/base/footer';
import DisplayFiltersClient from '../components/displayFiltersClient';



const displayFiltersClient = () => {
    return (
        <div>
            <HeaderThirdParty />
            <DisplayFiltersClient />
            <Footer />
        </div>
    )
}

export default displayFiltersClient;