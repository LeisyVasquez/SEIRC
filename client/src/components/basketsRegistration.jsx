import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
import api from '../axios/axios';
import ButtonCancel from './base/buttonCancel';
import { Container, Form } from "react-bootstrap";
import '../styles/basketsRegistration.css';
import { getFromLocal } from '../functions/localStorage'


const BasketsRegistration = () => {
    const [basketsData, setBasketsData] = useState({});
    useEffect(() => {
        comprobation();
    }, []);

    function comprobation() {
        api.post('/routeComprobation', { typeUser: ['administrador'] }, { headers: { 'authorization': `Bearer ${getFromLocal('tokenUser')}` } })
            .then((res) => {
                if (res.status === 201) window.location.href = '/notAuthorized'
            }).catch((err) => {
                window.location.href = '/notAuthorized'
            });
    }
    const data = (e) => {
        let name = e.target.id;
        let value = e.target.value;
        setBasketsData((state) => ({
            ...basketsData,
            [name]: value,
        }));
    }
    const sendData = () => {
        const data = {
            name: basketsData.name,
            type: basketsData.type,
            description: basketsData.description
        }
        api.post("/registerBaskets", data).then((res, err) => {
            if (res.status === 500) {
                swal.fire({
                    icon: "error",
                    title: "Error en el servidor",
                    text: "Intente registrar de nuevo la canasta o vuelta más tarde",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "red",
                });
            } else if (res.status === 200) {
                swal.fire({
                    icon: "error",
                    title: "El tipo de canastilla ya existe",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "red",
                });
            } else if (res.status === 201) {
                swal.fire({
                    icon: "success",
                    title: "Canasta creada con éxito",
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
        <div className="basketsRegistration" >
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-50" >
                <h1 className="m-auto">Registro de canastillas</h1>
                <form className="form-signin mt-5 py-4" id="form">
                    <Form.Group >
                        <Form.Control as="select" className="mb-3" id="type" onChange={data}>
                            <option>-- Selecciona el dueño --</option>
                            <option>Proveedor</option>
                            <option>Empresa</option>
                            <option>Empresa-Proveedor</option>
                        </Form.Control>
                    </Form.Group>
                    <input
                        type="email"
                        id="name"
                        className="form-control mb-3"
                        placeholder="Nombre de la canasta"
                        onChange={data}
                    />
                    <textarea
                        class="form-control"
                        id="description"
                        rows="2"
                        placeholder="Descripción"
                        onChange={data}
                    />
                    <ButtonCancel />
                    <button type="button" className="boton2 ml-3 w-40 h-50" onClick={sendData}>Finalizar</button>
                </form>
            </Container>
        </div>
    );
}

export default BasketsRegistration;