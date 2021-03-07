import React from 'react';

import Header from '../components/base/header';
import Footer from '../components/base/footer';
import Navbar from '../components/base/navbar'
import AdminRegistrationBody from '../components/adminRegistrationBody';

const AdminRegistration = () => {
    return (
        <div className="thirdPartyRegistration">
            <Header />
            <Navbar />
            <AdminRegistrationBody />
            <Footer />
        </div>
    )
}

export default AdminRegistration;