import React from 'react';

import HeaderAdmin from '../components/base/headerAdmin'
import Footer from '../components/base/footer'
import DeleteMovementProvider from '../components/deleteMovementProvider'


const deleteMovementProvider = () => {
    return (
        <div>
            <HeaderAdmin />
            <DeleteMovementProvider />
            <Footer />
        </div>
    )
}

export default deleteMovementProvider;