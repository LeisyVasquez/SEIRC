import React from 'react';

import Header from '../components/base/header'
import Navbar from '../components/base/navbar'
import Footer from '../components/base/footer'
import Login from '../components/login'


const login = () => {
    return (
        <div>
            <Header />
            <Navbar />
            <Login />
            <Footer />
        </div>
    )
}

export default login;