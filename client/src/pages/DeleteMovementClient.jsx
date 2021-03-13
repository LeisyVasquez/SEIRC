import React from 'react';

import HeaderAdmin from '../components/base/headerAdmin'
import Footer from '../components/base/footer'
import DeleteMovementClient from '../components/deleteMovementClient'


const deleteMovementClient = () => {
    return (
        <div>
            <HeaderAdmin />
            <DeleteMovementClient />
            <Footer />
        </div>
    )
}

export default deleteMovementClient;