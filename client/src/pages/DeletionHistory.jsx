import React from 'react';

import Footer from "../components/base/footer";
import DeletionHistory from "../components/deletionHistory";
import HeaderSuperUser from '../components/base/headerSuperUser';


const deletionHistory = () => {
    return (
        <div>
            <HeaderSuperUser/>
            <DeletionHistory />
            <Footer/>
        </div>
    )
}

export default deletionHistory; 
