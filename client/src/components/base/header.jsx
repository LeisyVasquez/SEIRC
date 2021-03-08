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

                        <Nav.Link href="/homeAdmin" className="navItem">Inicio</Nav.Link>

                        <NavDropdown title="Cliente" id="basic-nav-dropdown" className="navItem">
                            <NavDropdown.Item href="#action/3.1">Añadir mov.</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">V. Tipo mov.</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">V. Cliente</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">V. Tipo canastilla</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Proveedor" id="basic-nav-dropdown" className="navItem">
                            <NavDropdown.Item href="#action/3.1">Añadir mov.</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">V. Tipo mov.</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">V. Cliente</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">V. Tipo canastilla</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Registro" id="basic-nav-dropdown" className="navItem">
                            <NavDropdown.Item href="#action/3.1">Usuario</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Canastilla</NavDropdown.Item>
                        </NavDropdown>

                        <div /*className="circulo"*/>
                            <NavDropdown drop="left" menuAlign="right" id="basic-nav-dropdown" className="navItem flecha">
                                <NavDropdown.Item href="#action/3.1">Cerrar sesión</NavDropdown.Item>
                            </NavDropdown>
                        </div>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header;