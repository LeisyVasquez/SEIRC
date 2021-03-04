//import {React, useState, useEffect} from "react";
//import api from '../axios/axios';
//import { saveToLocal } from "../localStorage/localStorage";
//import swal from "sweetalert2";
import React from "react";
import Container from "react-bootstrap/Container";
import '../styles/login.css';

const login = () => {
    return (
        <div className="login" >
                <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-50" >
                    <h1 className="m-auto">SEIRC</h1>
                    <form className="form-signin mt-5 py-4">
                        <input
                            type="email"
                            id="username"
                            className="form-control mb-3"
                            placeholder="Nombre de usuario"
                        />
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Contraseña"
                        />
                        <button type="button" className="boton1 mt-5 w-50 h-50">Iniciar sesión</button>
                    </form>
                </Container>
        </div>
    );
}

export default login;