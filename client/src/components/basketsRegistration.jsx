import React, { useEffect, useState } from "react";//import { saveToLocal } from "../localStorage/localStorage";
import swal from "sweetalert2";
import api from '../axios/axios';
import { Container, Form } from "react-bootstrap";
import '../styles/basketsRegistration.css';

const BasketsRegistration = () => {
    const [basketsData, setBasketsData] = useState({});
    useEffect(() => { });

    const data = (e) => {
        let name = e.target.id;
        let value = e.target.value;
        setBasketsData((state) => ({
            ...basketsData,
            [name]: value,
        }));
        console.log(basketsData);
    }

    const sendData = () => {
        console.log(basketsData)
        const data = {
            name: basketsData.name,
            type: basketsData.type,
            description: basketsData.description,
            baseQuantily: basketsData.baseQuantily
        }
        api.post("/registerBaskets", data).then((res, err) => {
            if (res.status === 500) {
                swal.fire({
                    icon: "error",
                    title: "Error en el servidor",
                    text: "Intente iniciar sección de nuevo o vuelta más tarde",
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
            } else if (res.status === 400) {
                swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `${res.data.message}`,
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "red",
                });
            }
            /*
            else{
                swal.fire({
                    icon: "error",
                    title: "Digite todos los campos necesarios",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "#f96332",
                  });
            }
            */
        })
    }


    return (
        <div className="basketsRegistration" >
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-50" >
                <h1 className="m-auto">Registro de canastillas</h1>
                <form className="form-signin mt-5 py-4">
                    {/*
                        <input type="text" list="listapropietario" placeholder="Propietario" className="form-control mb-3" />
                         <datalist id="listapropietario">
                        <option>Empresa</option>
                        <option>Proveedor</option>
                        </datalist>
                    */}
                    <Form.Group >
                        <Form.Control as="select" className="mb-3" id="type" onChange={data}
                        >
                            <option>Proveedor</option>
                            <option>Empresa</option>
                        </Form.Control>
                    </Form.Group>
                    <input
                        type="email"
                        id="name"
                        className="form-control mb-3"
                        placeholder="Nombre de la canasta"
                        onChange={data}
                    />
                    <input
                        type="email"
                        id="baseQuantily"
                        className="form-control mb-3"
                        placeholder="Cantidad base"
                        onChange={data}
                    />
                    <textarea 
                        class="form-control" 
                        id="description" 
                        rows="2" 
                        placeholder="Descripción" 
                        onChange={data}
                    />

                    <button type="button" className="boton3 mt-5 mr-3 w-40 h-50">Cancelar</button>
                    <button type="button" className="boton2 mt-5 ml-3 w-40 h-50" onClick={sendData}>Finalizar</button>
                </form>
            </Container>
        </div>
    );
}

export default BasketsRegistration;