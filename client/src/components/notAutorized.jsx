import React from "react";

import { Container } from "react-bootstrap";
import '../styles/home.css';

const NotAuthorized = () => {
    
    return (
        <div className="notAuthorized" >
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-50" >
                <h1 className="mx-auto my-5">430</h1>
                <h1>¡No tiene permiso para acceder a este sitio!</h1>
            </Container>
        </div>
    );   
}

export default NotAuthorized;