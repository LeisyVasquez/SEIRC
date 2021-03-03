import React from 'react';

import '../../styles/header.css'

import { Nav } from 'react-bootstrap';

const Header = () => {
    return (
        <div className="header">
            <Nav
                activeKey="/"
            >
                <Nav.Item>
                    <Nav.Link href="/"><img src="https://github.com/LeisyVasquez/SEIRC/blob/main/client/public/images/logo.png?raw=true" alt="logo" /></Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default Header;