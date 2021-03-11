import React, { useState, useEffect } from "react";
import api from '../axios/axios';
import { Container, Button, Modal } from "react-bootstrap";
import '../styles/deleteClient.css';
import { getFromLocal } from '../functions/localStorage'
const DeleteClient = () => {
    const [showInsert, setShowInsert] = useState(false);
    const handleCloseInsert = () => setShowInsert(false);
    const handleShowInsert = () => setShowInsert(true);
    let flag = true; 
    let name;
    let typeUser;

    const nameClient = (e) =>{
        name = e.target.value; 
    }

    const clientHistory = () =>{
        typeUser = "cliente";
        flag = false;
        console.log(name);
        console.log(typeUser);
    }

    return (
        <div className="deleteClient" >
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-70">
                <h1 className="m-auto py-5">Eliminar movimientos de clientes</h1>

                {/* Sección de búsqueda*/}
                <div className="mb-5">
                    <input
                        type="search"
                        className="form-control w-50 m-auto d-inline"
                        placeholder="Nombre del cliente"
                        onChange={nameClient}
                    />
                    <button type="button" className="boton5 ml-5" onClick={clientHistory}>Buscar</button>
                </div>
                
                {/*Tarjetas con el historial*/}
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className=" card h-100 w-100 ">
                            <div className="card-body">
                                <input type="image" src="https://raw.githubusercontent.com/JuanManuel-GAA/equipo7_gaa_ppi2020/master/Recursos%20gu%C3%ADa/iconDelete.png" className="boton4"></input>
                                <h5 className="card-title" id="nombre">Elkin</h5>
                                <p className="card-text" id="descripcion">Prestamo</p>
                                <p className="card-text" id="descripcion">Hora</p>
                                <button type="button" className="iconAdd mr-2" onClick={handleShowInsert}>+</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Modal*/}
                <Modal show={showInsert} onHide={handleCloseInsert} centered>
                <Modal.Header closeButton style={{ background: 'rgb(112, 219, 36,0.3)' }}>
                    <Modal.Title>Más detalles de la cuenta</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: 'rgb(112, 219, 36,0.3)' }}>
                    
                </Modal.Body>
                <Modal.Footer style={{ background: 'rgb(112, 219, 36,0.3)' }}>
                    <Button variant="secondary" onClick={handleCloseInsert}>Cerrar</Button>
                    
                </Modal.Footer>
            </Modal>
            </Container>
        </div>
    );
}

export default DeleteClient;


