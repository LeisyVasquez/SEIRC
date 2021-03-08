import React from 'react';

import HeaderAdmin from '../components/base/headerAdmin'
import Footer from '../components/base/footer'
import LoanReturnClient from '../components/loanReturnClient'


const loanReturnClient = () => {
    return (
        <div>
            <HeaderAdmin />
            <LoanReturnClient />
            <Footer />
        </div>
    )
}

export default loanReturnClient;