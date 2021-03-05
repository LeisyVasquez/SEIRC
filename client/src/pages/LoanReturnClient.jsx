import React from 'react';

import Header from '../components/base/header'
import Footer from '../components/base/footer'
import LoanReturnClient from '../components/loanReturnClient'


const loanReturnClient = () => {
    return (
        <div>
            <Header />
            <LoanReturnClient />
            <Footer />
        </div>
    )
}

export default loanReturnClient;