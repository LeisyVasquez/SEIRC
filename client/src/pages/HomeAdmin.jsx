import React from 'react';

import HeaderAdmin from '../components/base/headerAdmin'
import Footer from '../components/base/footer'
import HomeAdmin from '../components/homeAdmin'


const homeAdmin = () => {
    return (
        <div>
            <HeaderAdmin />
            <HomeAdmin />
            <Footer />
        </div>
    )
}

export default homeAdmin;