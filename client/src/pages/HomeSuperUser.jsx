import React from 'react';

import HeaderSuperUser from '../components/base/headerSuperUser'
import Footer from '../components/base/footer'
import HomeSuperUser from '../components/homeSuperUser'


const homeSuperUser = () => {
    return (
        <div>
            <HeaderSuperUser />
            <HomeSuperUser />
            <Footer />
        </div>
    )
}

export default homeSuperUser;