import React from 'react';

import '../../styles/header.css';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { saveToLocal,remove } from "../../functions/localStorage" ;

const HeaderAdmin = () => {
    return (
        <div className="header">
            <Navbar expand="lg">
                <Navbar.Brand href="/homeAdmin"><img src="https://github.com/LeisyVasquez/SEIRC/blob/main/client/public/images/logo.png?raw=true" alt="logo" className="img-fluid" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav mr-auto">

                        <Nav.Link href="/homeAdmin" className="navItem">Inicio</Nav.Link>

                        <NavDropdown title="Cliente" id="basic-nav-dropdown" className="navItem">
                            <NavDropdown.Item href="/loanReturnClient">Añadir mov.</NavDropdown.Item>
                            <NavDropdown.Item href="/deleteMovementClient">Eliminar mov.</NavDropdown.Item>
                            <NavDropdown.Item href="/orderHistory" onClick={()=>{saveToLocal('typeUser', 'cliente')}}>Historial</NavDropdown.Item>
                            <NavDropdown.Item href="/displayTypeMovementClient">V. Tipo mov.</NavDropdown.Item>
                            <NavDropdown.Item href="/displayByClient">V. Cliente</NavDropdown.Item>
                            <NavDropdown.Item href="/displayByBasketsClient">V. Tipo canastilla</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Proveedor" id="basic-nav-dropdown" className="navItem">
                            <NavDropdown.Item href="/loanReturnProvider">Añadir mov.</NavDropdown.Item>
                            <NavDropdown.Item href="/deleteMovementProvider">Eliminar mov.</NavDropdown.Item>
                            <NavDropdown.Item href="/orderHistory" onClick={()=>{{saveToLocal('typeUser', 'proveedor')}}}>Historial</NavDropdown.Item>
                            <NavDropdown.Item href="/displayTypeMovementProvider">V. Tipo mov.</NavDropdown.Item>
                            <NavDropdown.Item href="/displayByProvider">V. Proveedor</NavDropdown.Item>
                            <NavDropdown.Item href="/displayByBasketsProvider">V. Tipo canastilla</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Registro" id="basic-nav-dropdown" className="navItem">
                            <NavDropdown.Item href="/thirdPartyRegistration">Usuario</NavDropdown.Item>
                            <NavDropdown.Item href="/basketsRegistration">Canastilla</NavDropdown.Item>
                        </NavDropdown>

                        <div /*className="circulo"*/>
                            <NavDropdown drop="left" menualign="right" id="basic-nav-dropdown" className="navItem flecha">
                                <NavDropdown.Item onClick={()=>{remove()}}href="/">Cerrar sesión</NavDropdown.Item>
                            </NavDropdown>
                        </div>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default HeaderAdmin;