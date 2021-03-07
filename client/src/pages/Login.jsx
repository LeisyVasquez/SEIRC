import React from 'react';

import Header from '../components/base/header';
import Footer from '../components/base/footer';
import Login from '../components/login';


const login = () => {
    return (
        <div>
            <Header />
            <Login />
            <Footer />
        </div>
    )
}

export default login;