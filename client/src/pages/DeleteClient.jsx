import React from 'react';

import HeaderAdmin from '../components/base/headerAdmin'
import Footer from '../components/base/footer'
import DeleteClient from '../components/deleteClient'


const deleteClient = () => {
    return (
        <div>
            <HeaderAdmin />
            <DeleteClient />
            <Footer />
        </div>
    )
}

export default deleteClient;