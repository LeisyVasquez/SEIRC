import React from 'react';

import HeaderAdmin from '../components/base/headerAdmin'
import Footer from '../components/base/footer'
import PdfPreview from '../components/pdfPreview'


const pdfPreview = () => {
    return (
        <div>
            <HeaderAdmin />
            <PdfPreview />
            <Footer />
        </div>
    )
}

export default pdfPreview;