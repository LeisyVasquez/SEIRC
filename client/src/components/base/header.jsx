import React from 'react';

import '../../styles/header.css';

import { Navbar } from 'react-bootstrap';

const Header = () => {
    return (
        <div className="header">
            <Navbar expand="lg">
                <Navbar.Brand href="#home"><img src="https://github.com/LeisyVasquez/SEIRC/blob/main/client/public/images/logo.png?raw=true" alt="logo" /></Navbar.Brand>
            </Navbar>
        </div>
    )
}

export default Header;