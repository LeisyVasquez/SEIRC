import React from 'react';
import { Form } from 'react-bootstrap';
import '../styles/thirdPartyRegistration.css';


const ThirdPartyRegistrationBody = () => {
    
    return (
        <div className="thirdPartyRegistrationBody">
            <h2>Registro de terceros</h2>

            <div className="formulario">
                <Form>
                    <div className="fila">
                        <select className="formInput">
                            <option value="">Tipo</option>
                            <option value="cliente">Cliente</option>
                            <option value="croveedor">Proveedor</option>
                            <option value="cliente/proveedor">Cliente - Proveedor</option>
                        </select>
                        <input type="text" className="formInput" placeholder="Contacto" />
                        <input type="text" className="formInput" placeholder="Usuario" />
                    </div>

                    <div className="fila">
                        <input type="text" className="formInput" placeholder="Nombre" />
                        <input type="text" className="formInput" placeholder="Dirección" />
                        <input type="text" className="formInput" placeholder="Contraseña" />
                    </div>
                </Form>
            </div>

            <div className="botones">
                <button className="formButton">Cancelar</button>
                <button className="formButton" type="submit">Aceptar</button>
            </div>

        </div>
    )
}

export default ThirdPartyRegistrationBody;