import React, { useState, useEffect } from "react";
import api from '../axios/axios';
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import '../styles/typeMovement.css';
import swal from "sweetalert2";

const DisplayByBaskets = () => {

    useEffect(
        () => {
            getSumBasketsHistory();
        }, []
    )

    const [sumLoan, setSumLoan] = useState([]);
    const [sumReturn, setSumReturn] = useState([]);
    const [data, setData] = useState([]);

    const getSumBasketsHistory = () => {
        api.get('/getSumBasketsHistory')
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err))
    }




    return (
        <div className="typeMovement" >
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-70">
                <h1 className="m-auto py-5">Visualización por tipo de canastilla</h1>
                <Row className="p-4">
                    <Col>
                        <input
                            type="date"
                            className="form-control w-60 m-auto" />
                    </Col>
                    <Col>
                        <div className="mb-5">
                            <input
                                type="search"
                                className="form-control w-75 m-auto"
                                placeholder="Tipo de canastilla"
                                list="listBaskets"
                            />
                            <datalist id="listBaskets">
                                <option>101-Verde</option>
                                <option>102-Azul</option>
                            </datalist>
                        </div>
                    </Col>
                </Row>

                <Table striped bordered hover responsive="sm">
                    <thead>
                        <tr>
                            <th>Código-nombre canastilla</th>
                            <th>Préstamo</th>
                            <th>Devolución</th>
                            <th>Deuda</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((data) =>
                                <tr>
                                    <td>{data.codeBasket}</td>
                                    <td>{data.sumLoan}</td>
                                    <td>{data.sumReturn}</td>
                                    <td>{data.debt}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>

            </Container>
        </div>



    );

}

export default DisplayByBaskets;