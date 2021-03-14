import React,{useState,useEffect} from "react";
import api from '../axios/axios';
import {Container,Row,Col,Form,Table} from 'react-bootstrap';
import '../styles/typeMovement.css';
import swal from "sweetalert2";

const TypeMovementClient = () =>{


    return(
        <div className="typeMovement" >
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-70">
                <h1 className="m-auto py-5">Visualización por tipo de movimiento</h1>
                <Row className="p-4">
                    <Col>
                        <input
                            type="date"
                            className="form-control w-60 m-auto"/> 
                    </Col>
                    <Col>
                        <Form.Group >
                            <Form.Control as="select" id="typeMovement"  className="form-control w-60 m-auto">
                                <option value="">Tipo de movimiento</option>
                                <option value="prestamo">Prestamo</option>
                                <option value="devolucion">Devolucion</option>
                            </Form.Control>
                        </Form.Group>       
                    </Col>
                </Row>
                
                <Table striped bordered hover responsive="sm">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Tipo de movimiento</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>27/02/2021</td>
                            <td>Préstamo</td>
                            <td>1000</td>
                        </tr>
                        <tr>
                            <td>27/02/2021</td>
                            <td>Devolución</td>
                            <td>800</td>
                        </tr>

                    </tbody>
                </Table>
                
               

                
            </Container>
        </div>



    );

}

export default TypeMovementClient;