import React from 'react';

import HeaderAdmin from '../components/base/headerAdmin'
import Footer from '../components/base/footer'
import Filtros from '../components/filtros'


const filtros = () => {
    return (
        <div>
            <HeaderAdmin />
            <Filtros />
            <Footer />
        </div>
    )
}

export default filtros;