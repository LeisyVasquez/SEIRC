import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import swal from "sweetalert2";
import api from '../axios/axios';

import '../styles/orderHistory.css'


const OrderHistoryClient = () => {
    let [historyGeneral, setHistoryGeneral] = useState([]);
    const [namesClientsByHistory, setNamesClientsByHistory] = useState([]);

    useEffect(() => {
        getHistory();
    }, [])


    const getHistory = () => {
        api.get('/getHistoryByTypeUser/cliente')
            .then(res => {
                setHistoryGeneral(res.data.historyGeneral);
                setNamesClientsByHistory(res.data.namesByHistory);
            })
            .catch(err => {
                swal.fire({
                    icon: 'error',
                    title: 'Error en el servidor',
                    text: 'Intente de nuevo o regrese más tarde',
                    confirmButtonText: "Entendido"
                })
            })
        console.log(namesClientsByHistory)
    }

    const handleShowBaskets = (e) => {
        showBaskets(e.target.value);
    }

    function showBaskets(idCard) {
        const basketsDataCard = historyGeneral.filter(cards => cards._id === idCard);
        const objectDataBasketsById = basketsDataCard[0].baskets;
        let html = '<table style="width:100%"><th>Código</th><th>Cantidad</th>';
        for (const property in objectDataBasketsById) {
            html += `<tr><td>${property}</td><td>${objectDataBasketsById[property]}</td><tr>`;
        }
        html += '</table>'
        swal.fire({
            icon: 'info',
            title: 'Canastillas',
            html: html,
            confirmButtonText: "Entendido"
        })
    }

    const filterName = (e) => {
        if (namesClientsByHistory.includes(e.target.value))
            setHistoryGeneral(historyGeneral.filter(cards => cards.name === e.target.value));
        else getHistory()
    }

    return (
        <div className="orderHistory">
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-70">
                <h1 className="mx-auto mb-4">Historiales</h1>

                {/* Sección de filtros*/}
                <div className="w-75 mx-auto mb-4">
                    <input
                        type="search"
                        id="name"
                        className="form-control mb-4 mr-3"
                        placeholder="Nombre de cliente"
                        list="namesClients"
                        onChange={filterName}
                    />
                    <datalist id="namesClients">
                        {
                            namesClientsByHistory.map((name) =>
                                <option>{name}</option>
                            )
                        }
                    </datalist>


                    <div class="input-group">
                        <Form.Group >
                            <Form.Control as="select" id="typeMovement" >
                                <option>Tipo de movimiento</option>
                                <option>Préstamo</option>
                                <option>Devolución</option>
                            </Form.Control>
                        </Form.Group>
                        <input type="date" id="date" className="form-control ml-4" placeholder="Contraseña" />
                        <input type="time" id="hour" className="form-control ml-4" />
                    </div>
                </div>

                {/* Tarjetas con las orders*/}
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {
                        historyGeneral.map((data) =>
                            <div className="col">
                                <div className=" card h-100 w-100">
                                    <div className="card-body">

                                        <div className="h-25">
                                            <h5 className="card-title" id="nombre">{data.name}</h5>
                                        </div>
                                        <p className="card-text">{data.movemenType}</p>
                                        <p className="card-text">{data.date}</p>
                                        <p className="card-text">{data.hour}</p>
                                        <button type="button" className="iconAdd mr-2" value={data._id} onClick={handleShowBaskets}>+</button>
                                    </div>
                                </div>
                            </div>

                        )}
                </div>
            </Container>

        </div>
    );
}

export default OrderHistoryClient;