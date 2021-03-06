import React from 'react';
import { Form, Container } from 'react-bootstrap';
import ButtonCancel from './base/buttonCancel';
import '../styles/thirdPartyRegistration.css';

const ThirdPartyRegistrationBody = () => {
    return (
        <div className="thirdPartyRegistrationBody">
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-50" >
                <h2>Registro de terceros</h2>
                <form className="form-signin mt-5" id="form">
                    <input type="text" className="form-control mb-3" placeholder="Nombre del usuario" />
                        <Form.Group >
                            <Form.Control as="select"  id="type">
                                <option>Tipo de usuario</option>
                                <option>Cliente</option>
                                <option>Proveedor</option>
                                <option>Cliente-Proveedor</option>
                            </Form.Control>
                        </Form.Group>
                        <input type="text" className="form-control mb-3" placeholder="Teléfono" />

                    <input type="text" className="form-control mb-3" placeholder="Dirección" />
                    <div class="input-group">
                        <input type="text" className="form-control mb-3 mr-3" placeholder="Nombre de usuario" />
                        <input type="text" className="form-control " placeholder="Contraseña" />
                    </div>
                    <ButtonCancel/>
                    <button type="button" className="boton2 mt-4 ml-3 w-40 h-50">Finalizar</button>
                </form>
            </Container>
        </div>
    )
}

export default ThirdPartyRegistrationBody;