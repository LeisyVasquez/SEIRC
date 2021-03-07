import React from 'react';

import Header from '../components/base/header';
import Footer from '../components/base/footer';
import AdminRegistrationBody from '../components/adminRegistrationBody';

const AdminRegistration = () => {
    return (
        <div className="thirdPartyRegistration">
            <Header />
            <AdminRegistrationBody />
            <Footer />
        </div>
    )
}

export default AdminRegistration;