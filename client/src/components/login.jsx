//import {React, useState, useEffect} from "react";
//import api from '../axios/axios';
//import { saveToLocal } from "../localStorage/localStorage";
//import swal from "sweetalert2";
import React from "react";
import  Container from "react-bootstrap/Container";
import '../styles/login.css';

const login = () => {
    return (
        <div className="login">
            <Container className="text-center mt-2 mx-auto my-5 p-5" style={{ width: "40rem" }}>
                <form className="form-signin mt-5 py-4">
                    <input
                        type="email"
                        id="email"
                        className="form-control mb-3"
                        placeholder="Correo electrónico"
                        name="correo"
                    />
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name="contrasena"
                    />
                    <a href="/" className="boton1">
                    <input  type="button" value="Iniciar Sección" className="boton1 mt-5"/>
          </a>
                </form>
            </Container>
        </div>
    );
}

export default login;