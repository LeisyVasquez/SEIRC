import React from 'react';

import Header from '../components/base/header'
import Footer from '../components/base/footer'
import HomeAdmin from '../components/homeAdmin'


const homeAdmin = () => {
    return (
        <div>
            <Header />
            <HomeAdmin />
            <Footer />
        </div>
    )
}

export default homeAdmin;