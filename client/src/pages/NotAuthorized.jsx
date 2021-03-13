import React from 'react';

import HeaderAdmin from '../components/base/headerAdmin'
import Footer from '../components/base/footer'
import NotAuthorized from '../components/notAutorized'


const notAuthorized = () => {
    return (
        <div>
            <HeaderAdmin />
            <NotAuthorized />
            <Footer />
        </div>
    )
}

export default notAuthorized;