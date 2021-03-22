import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import swal from "sweetalert2";
import api from '../../axios/axios';
import '../../styles/basketsTable.css'


const BasketsTable = () => {
    const [namesAndCodesBaskets, setNamesAndCodesBaskets] = useState([]);

    useEffect(() => {
        getNamesAndCodesBaskets();
    }, [])

    const getNamesAndCodesBaskets = () => {
        api.get('/getNamesAndCodesBaskets')
            .then(res => {
                setNamesAndCodesBaskets(res.data);
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

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="basketsTable">
            <input type="image" alt="iconInfo" src="https://raw.githubusercontent.com/JuanManuel-GAA/equipo7_gaa_ppi2020/master/Recursos%20gu%C3%ADa/icon%20info.png" className="iconInfo" onClick={handleShow} />
            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
                centered
                style={{ background: 'rgb(120, 252, 3, 0.2)' }}
            >
                <Modal.Header closeButton >
                    <Modal.Title>Lista de códigos y nombres de canastas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table class="table table-hover table-bordered  table-sm w-75 my-3 mx-auto">
                        <thead>
                            <tr>
                                <th scope="col">Código</th>
                                <th scope="col">Nombre</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                namesAndCodesBaskets.map((data) =>
                                    <tr>
                                        <th scope="row">{data[0]}</th>
                                        <td>{data[1]}</td>

                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </div>
    );
}


export default BasketsTable;