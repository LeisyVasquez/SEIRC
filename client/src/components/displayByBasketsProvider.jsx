import React, { useState, useEffect } from "react";
import api from '../axios/axios';
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import '../styles/displayTypeMovementAndTypeBaskets.css';
import swal from "sweetalert2";

const DisplayByBasketsProvider = () => {

    useEffect(
        () => {
            getSumTotalBasketsHistory();
        }, []
    )

    const [listBasketsSet, setListBasketsSet] = useState(new Set());
    const [dataDatalist, setDataDatalist] = useState([]);
    let [dataTable, setDataTable] = useState([]);

    const getSumTotalBasketsHistory = () => {
        api.get('/getSumTotalBasketsHistory/proveedor')
            .then(res => {
                setDataTable(res.data.arrayTable);
                setDataDatalist(res.data.basketNamesAndCodes);
                saveListNamesAndCodesBaskets(res.data.basketNamesAndCodes);
            })
            .catch(err => {
                swal.fire({
                    icon: 'error',
                    title: 'Error en el servidor',
                    text: 'Intente de nuevo o regrese más tarde',
                    confirmButtonText: "Entendido"
                })
            })
    }

    const codeBasket = (e) => {
        const inputValue = e.target.value;
        if (listBasketsSet.has(inputValue)) {
            setDataTable(dataTable.filter(cards => cards.codeBasket === inputValue));
        }
    }

    const date = (e) => {
        const valueInput = e.target.value;
        const split = valueInput.split("-")
        const date = `${split[2]}/${split[1]}/${split[0]}`;
        const data = {
            "date": date,
            "typeUser": "proveedor"
        }
        api.post('/sumBasketsHistoryByData', data)
            .then(res => {
                setDataTable(res.data.arrayTable);
            })
            .catch(err => {
                swal.fire({
                    icon: 'error',
                    title: 'Error en el servidor',
                    text: 'Intente de nuevo o regrese más tarde',
                    confirmButtonText: "Entendido"
                })
            })
    }

    function saveListNamesAndCodesBaskets(list) {
        const codeBaskestSetAux = new Set();
        for (let i = 0; i < list.length; i++) {
            codeBaskestSetAux.add(list[i]);
        }
        setListBasketsSet(codeBaskestSetAux)
    }

    return (
        <div className="typeBaskets" >
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-70">
                <h1 className="m-auto py-5">Visualización por tipo de canastilla proveedor</h1>
                <Row className="p-4">
                    <Col>
                        <input
                            type="date"
                            className="form-control w-60 m-auto"
                            onChange={date}
                        />
                    </Col>
                    <Col>
                        <div className="mb-5">
                            <input
                                type="search"
                                className="form-control w-75 m-auto"
                                placeholder="Tipo de canastilla"
                                list="listBaskets"
                                onChange={codeBasket}
                            />
                            <datalist id="listBaskets">
                                {
                                    dataDatalist.map((data) =>
                                        <option>{data}</option>
                                    )
                                }
                            </datalist>
                        </div>
                    </Col>
                </Row>



                <div >
                    <Table striped bordered hover responsive="sm" className="table-sm">
                        <thead >
                            <tr>
                                <th>Código-nombre canastilla</th>
                                <th>Préstamo</th>
                                <th>Devolución</th>
                                <th>Deuda</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataTable.map((data) =>
                                    <tr>
                                        <td className="text-start">{data.codeBasket}</td>
                                        <td>{data.sumLoan}</td>
                                        <td>{data.sumReturn}</td>
                                        <td>{data.debt}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    );
}
export default DisplayByBasketsProvider;