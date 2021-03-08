//import {React, useState, useEffect} from "react";
import api from '../axios/axios';
import { saveToLocal } from "../functions/localStorage";
import swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import '../styles/login.css';

const Login = () => {
    const [userData, setUserData] = useState({});
    const data = (e) =>{
       let value= e.target.value
       let name = e.target.id
       setUserData((state)=>({
         ...userData,
         [name]: value,
       }));
      
    }

    const sendData = () =>{
        console.log(userData)
        const data = {
            userName: userData.username,
            password: userData.password
        }
        console.log(data)
        api.post("/signIn", data).then((res,err)=>{
            if(res.status === 500){
                swal.fire({
                    icon: "error",
                    title: "Error en el servidor",
                    text: "Intente iniciar sección de nuevo o vuelta más tarde",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "red",
                });  
            }else if(res.status === 234){
                swal.fire({
                    icon: "error",
                    title: "El usuario no existe",
                    text: "Intente de nuevo con un usuario correcto",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "red",
                });  
            }else if(res.status === 211){
                swal.fire({
                    icon: "error",
                    title: "Contraseña incorrecta",
                    text: "Intente de nuevo con una contraseña correcta",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "red",
                });  
                
            } else if(res.status === 200){
                saveToLocal('tokenUser',res.data.token)
                console.log(res.data.token)
            }
        })
    }
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
                            onChange={data}
                        />
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Contraseña"
                            onChange={data}
                        />
                        <button type="button" className="boton1 mt-5 w-50 h-50" onClick={sendData}>Iniciar sesión</button>
                    </form>
                </Container>
        </div>
    );
}

export default Login;