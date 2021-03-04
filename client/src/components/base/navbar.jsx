import React from 'react';

import { Nav } from 'react-bootstrap';

import '../../styles/navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <Nav>
                <Nav.Item>
                    <Nav.Link href="/" className="navItem">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/register" className="navItem">Registro_Terceros</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>

    )
}

export default Navbar;