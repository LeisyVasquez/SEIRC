import React from 'react';

import '../../styles/header.css';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { saveToLocal, remove} from "../../functions/localStorage"

const HeaderSuperUser = () => {
    return (
        <div className="header">
            <Navbar expand="lg">
                <Navbar.Brand href="/homeSuperUser"><img src="https://github.com/LeisyVasquez/SEIRC/blob/main/client/public/images/logo.png?raw=true" alt="logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav mr-auto">

                        <Nav.Link href="/homeSuperUser" className="navItem">Inicio</Nav.Link>

                        <Nav.Link href="/adminRegistration" className="navItem">Reg. Admin</Nav.Link>

                        <NavDropdown title="Cliente" id="basic-nav-dropdown" className="navItem">
                            <NavDropdown.Item href="/displayTypeMovementClient">V. Tipo mov.</NavDropdown.Item>
                            <NavDropdown.Item href="/displayByClient">V. Cliente</NavDropdown.Item>
                            <NavDropdown.Item href="/displayByBasketsClient">V. Tipo canastilla</NavDropdown.Item>
                           </NavDropdown>

                        <NavDropdown title="Proveedor" id="basic-nav-dropdown" className="navItem">
                            <NavDropdown.Item href="/displayTypeMovementProvider">V. Tipo mov.</NavDropdown.Item>
                            <NavDropdown.Item href="/displayByProvider">V. Proveedor</NavDropdown.Item>
                            <NavDropdown.Item href="/displayByBasketsProvider">V. Tipo canastilla</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Historiales" id="basic-nav-dropdown" className="navItem">
                            <NavDropdown.Item href="/orderHistory" onClick={() => { { saveToLocal('typeUser', 'proveedor') } }}>Historial proveedor</NavDropdown.Item>
                            <NavDropdown.Item href="/orderHistory" onClick={() => { saveToLocal('typeUser', 'cliente') }}>Historial cliente</NavDropdown.Item>
                            <NavDropdown.Item href="/deletionHistory">Historial eliminaciones</NavDropdown.Item>
                        </NavDropdown>

                        <div /*className="circulo"*/>
                            <NavDropdown drop="left" menualign="right" id="basic-nav-dropdown" className="navItem flecha">
                                <NavDropdown.Item href="/" onClick={()=>{remove()}}>Cerrar sesión</NavDropdown.Item>
                            </NavDropdown>
                        </div>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default HeaderSuperUser;