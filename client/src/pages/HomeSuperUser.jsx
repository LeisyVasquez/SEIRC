import React from 'react';

import Header from '../components/base/header'
import Footer from '../components/base/footer'
import HomeSuperUser from '../components/homeSuperUser'


const homeSuperUser = () => {
    return (
        <div>
            <Header />
            <HomeSuperUser />
            <Footer />
        </div>
    )
}

export default homeSuperUser;