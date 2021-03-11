import React from "react";

import { Container, Form } from "react-bootstrap";
import '../styles/home.css';

const NotAuthorized = () => {
    
    return (
        <div className="homeAdmin" >
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-50" >
                <h1 className="mx-auto my-5">403</h1>
                <h2 className="mx-auto my-5">No tienes permiso para acceder a este sitio.</h2>
            </Container>
        </div>
    );   
}

export default NotAuthorized;