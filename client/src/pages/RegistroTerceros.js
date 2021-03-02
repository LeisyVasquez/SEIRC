import React from 'react';

import Header from '../components/base/header'
import Footer from '../components/base/footer'
import RegistroTercerosBody from '../components/registroTercerosBody'

const RegistroTerceros = () => {
    return (
        <div className="RegistroTerceros">
            <Header />
            <RegistroTercerosBody />
            <Footer />
        </div>
    )
}

export default RegistroTerceros;