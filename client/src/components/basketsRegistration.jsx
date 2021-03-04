//import {React, useState, useEffect} from "react";
//import api from '../axios/axios';
//import { saveToLocal } from "../localStorage/localStorage";
//import swal from "sweetalert2";
import React from "react";
import {Container, Form} from "react-bootstrap";
import '../styles/basketsRegistration.css';

const basketsRegistration = () => {
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
                    <Form.Control as="select" className="mb-3">
                        <option>Proveedor</option>
                        <option>Empresa</option>
                    </Form.Control>
                    <input
                        type="email"
                        id="username"
                        className="form-control mb-3"
                        placeholder="Nombre de la canasta"
                    />
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Descripción"
                    />
                    <button type="button" className="boton3 mt-5 mr-3 w-40 h-50">Cancelar</button>
                    <button type="button" className="boton2 mt-5 ml-3 w-40 h-50">Finalizar</button>
                </form>
            </Container>
        </div>
    );
}

export default basketsRegistration;