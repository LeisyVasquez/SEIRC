import React, { useEffect, useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import swal from "sweetalert2";
import api from '../axios/axios';

import ButtonCancel from './base/buttonCancel';

import '../styles/thirdPartyRegistration.css';

const ThirdPartyRegistrationBody = () => {
    const [userData, setUserData] = useState({});
    useEffect(() => { });

    const data = (e) => {
        let name = e.target.id;
        let value = e.target.value;
        setUserData((state) => ({
            ...userData,
            [name]: value,
        }));
    }

    const sendData = () => {
        const data = {
            name: userData.name,
            typeUser: userData.typeUser,
            phone: userData.phone,
            direction: userData.direction,
            userName: userData.userName,
            password: userData.password
        }
        api.post("/registerThirdParties", data).then((res, err) => {
            if (res.status === 500) {
                swal.fire({
                    icon: "error",
                    title: "Error en el servidor",
                    text: "Intente nuevamente",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "red",
                });
            } else if (res.status === 200) {
                swal.fire({
                    icon: "error",
                    title: "El nombre o nombre de usuario ya existe",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "red",
                });
            } else if (res.status === 201) {
                swal.fire({
                    icon: "success",
                    title: "¡Usuario registrado con éxito!",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "#70db24",
                });
            } else if (res.status === 225) {
                swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `${res.data.message}`,
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "red",
                });
            }
        })
    }


    return (
        <div className="thirdPartyRegistrationBody">
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-50" >
                <h2>Registro de terceros</h2>
                <form className="form-signin mt-5" id="form">
                    <input type="text" id="name" className="form-control mb-3" placeholder="Nombre del usuario" maxlength="50" onChange={data} />
                    <Form.Group >
                        <Form.Control as="select" id="typeUser" onChange={data}>
                            <option value="">Tipo de usuario</option>
                            <option value="cliente">Cliente</option>
                            <option value="proveedor">Proveedor</option>
                            <option value="clienteProveedor">Cliente-Proveedor</option>
                        </Form.Control>
                    </Form.Group>
                    <input type="number" id="phone" className="form-control mb-3" placeholder="Teléfono" maxlength="10" onChange={data} />

                    <input type="text" id="direction" className="form-control mb-3" placeholder="Dirección" maxlength="100" onChange={data} />
                    <div class="input-group">
                        <input type="text" id="userName" className="form-control mb-3 mr-3" placeholder="Nombre de usuario" maxlength="50" onChange={data} />
                        <input type="password" id="password" className="form-control " placeholder="Contraseña" onChange={data} />
                    </div>
                    <ButtonCancel />
                    <button type="button" className="boton2 mt-4 ml-3 w-40 h-50" onClick={sendData}>Finalizar</button>
                </form>
            </Container>
        </div>
    )
}

export default ThirdPartyRegistrationBody;