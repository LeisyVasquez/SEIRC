import React from 'react';

import HeaderAdmin from '../components/base/headerAdmin'
import Footer from '../components/base/footer'
import BasketsRegistration from '../components/basketsRegistration'


const basketsRegistration = () => {
    return (
        <div>
            <HeaderAdmin />
            <BasketsRegistration />
            <Footer />
        </div>
    )
}

export default basketsRegistration;