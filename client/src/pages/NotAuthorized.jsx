import React from 'react';

import HeaderAdmin from '../components/base/headerAdmin'
import Footer from '../components/base/footer'
import NotAuthorized from '../components/notAuthorized'


const notAuthorized = () => {
    return (
        <div>
            <Header />
            <NotAuthorized />
            <Footer />
        </div>
    )
}

export default notAuthorized;