import React from 'react';

import '../../styles/header.css';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const HeaderThirdParty = () => {
    return (
        <div className="header">
            <Navbar expand="lg">
                <Navbar.Brand href="/homeThirdParty"><img src="https://github.com/LeisyVasquez/SEIRC/blob/main/client/public/images/logo.png?raw=true" alt="logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav mr-auto">

                        <Nav.Link href="/homeThirdParty" className="navItem">Inicio</Nav.Link>

                        <Nav.Link href="#" className="navItem">Visualización</Nav.Link>

                        <div /*className="circulo"*/>
                            <NavDropdown drop="left" menuAlign="right" id="basic-nav-dropdown" className="navItem flecha">
                                <NavDropdown.Item href="/">Cerrar sesión</NavDropdown.Item>
                            </NavDropdown>
                        </div>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default HeaderThirdParty;