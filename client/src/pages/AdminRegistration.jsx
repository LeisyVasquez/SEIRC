import React from 'react';

import HeaderSuperUser from '../components/base/headerSuperUser';
import Footer from '../components/base/footer';
import AdminRegistrationBody from '../components/adminRegistrationBody';

const AdminRegistration = () => {
    return (
        <div className="thirdPartyRegistration">
            <HeaderSuperUser />
            <AdminRegistrationBody />
            <Footer />
        </div>
    )
}

export default AdminRegistration;