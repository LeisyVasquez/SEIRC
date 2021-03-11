import React from 'react';

import HeaderAdmin from '../components/base/headerAdmin'
import Footer from '../components/base/footer'
import LoanReturnProvider from '../components/loanReturnProvider'


const loanReturnProvider = () => {
    return (
        <div>
            <HeaderAdmin />
            <LoanReturnProvider/>
            <Footer />
        </div>
    )
}

export default loanReturnProvider;