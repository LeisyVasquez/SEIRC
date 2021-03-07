import React from 'react';

import '../../styles/header.css';

import { Navbar, Nav, Dropdown, NavDropdown } from 'react-bootstrap';

const Header = () => {
    return (
        <div className="header">
            <Navbar expand="lg">
                <Navbar.Brand href="#home"><img src="https://github.com/LeisyVasquez/SEIRC/blob/main/client/public/images/logo.png?raw=true" alt="logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav mr-auto">
                        <Nav.Link href="/" className="navItem">Login</Nav.Link>
                        <Nav.Link href="/register" className="navItem">Registro_Terceros</Nav.Link>
                        
                            <NavDropdown title="Pruebame" id="basic-nav-dropdown" className="navItem">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            </NavDropdown>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header;