import React, { useState, useEffect } from 'react';
import swal from "sweetalert2";
import api from '../axios/axios';
import { Container } from "react-bootstrap";
import '../styles/displayByClientProvider.css';
import BasketsTable from './base/basketsTable';
import {getFromLocal} from '../functions/localStorage'
const DisplayByClient = () => {

    useEffect(
        () => {
            comprobation()
            getGeneralOrder()
        }, []
    );

    function comprobation(){
        api.post('/routeComprobation',{typeUser:['administrador','superUsuario']},{headers:{'authorization':`Bearer ${getFromLocal('tokenUser')}`}})
        .then((res)=>{
            if(res.status===201) window.location.href = '/notAuthorized'
        }).catch((err)=>{
            window.location.href = '/notAuthorized'
        });
    }

    const [orderData, setOrderData] = useState([]);
    const [listNamesClients, setListNamesClients] = useState([]);
    const [listNamesClientsSet, setListNamesClientsSet] = useState(new Set());
    const [listQuantityBaskets, setListQuantityBaskets] = useState({});
    const [totalQuantityBaskets, setTotalQuantityBaskets] = useState(0);

    const handleShowBaskets = (e) => {
        showBaskets(e.target.value);
    }


    function saveClient(list) {
        const clientSetAux = new Set();
        for (let i = 0; i < list.length; i++) {
            clientSetAux.add(list[i]);
        }
        setListNamesClientsSet(clientSetAux)
    }

    const getGeneralOrder = () => {
        api.get(`/getGeneralOrder/cliente`)
            .then(res => {
                if (res.status === 254) {
                    swal.fire({
                        icon: 'error',
                        title: 'Error en el servidor',
                        text: 'Por favor vuelva más tarde',
                    })

                } else if (res.status === 255) {
                    swal.fire({
                        icon: 'error',
                        title: 'No hay registros',
                        text: 'Ingrese prestamos o devoluciones',
                    })
                }
                else {
                    setOrderData(res.data[0]);
                    setListNamesClients(res.data[1]);
                    setListQuantityBaskets(res.data[2]);
                    setTotalQuantityBaskets(res.data[3]);
                    saveClient(res.data[1]);
                }
            })
            .catch(err => {
                swal.fire({
                    icon: 'error',
                    title: 'Error en el servidor',
                    text: 'Por favor vuelva más tarde',
                })
            })
    }

    const nameClient = (e) => {
        const name = e.target.value;
        if (listNamesClientsSet.has(name)) {
            api.get(`/getOrderByName/cliente/${name}`)
                .then(res => {
                    if (res.status === 254) {
                        swal.fire({
                            icon: 'error',
                            title: 'Error en el servidor',
                            text: 'Por favor vuelva más tarde',
                        })
                    }
                    else if (res.status === 255) {
                        swal.fire({
                            icon: 'error',
                            title: 'No hay registros para ese cliente',
                            text: 'Ingrese prestamos o devoluciones',
                        })
                    }
                    else {
                        setOrderData(res.data)
                    }
                })
                .catch(err => {
                    swal.fire({
                        icon: 'error',
                        title: 'Error en el servidor',
                        text: 'Por favor vuelva más tarde',
                    })
                })
        } else getGeneralOrder()
    }

    function showBaskets(idCard) {
        const orderDataCard = orderData.filter(cards => cards._id === idCard);
        const objectDataBasketsById = orderDataCard[0].consolidated;
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


    return (
        <div className="displayByClientProvider">
            <Container className="text-center mt-2 my-5 mx-auto p-5 bosy w-70">
                <BasketsTable className="float-end" />
                <label className="float-start labelTotal w-25 p-3 col">Cantidad total: {totalQuantityBaskets}</label>
                <h1 className="mx-auto py-3 mb-3">Visualización por cliente</h1>

                {/* Sección de búsqueda*/}
                <div className="mb-5">
                    <input
                        type="search"
                        className="form-control w-75 m-auto"
                        placeholder="Nombre del cliente"
                        list="listClients"
                        onChange={nameClient}
                    />
                    <datalist id="listClients">
                        {listNamesClients.map((clien) => (
                            <option>{clien}</option>
                        ))}
                    </datalist>
                </div>

                {/* Tarjetas con las orders*/}
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {orderData.map((item) =>
                        <div className="col">
                            <div className=" card h-100 w-100" key={item._id}>
                                <div className="card-body">
                                    <div className="h-25">
                                        <h5 className="card-title" id="nombre">{item.name}</h5>
                                    </div>
                                    <p className="card-text">Debe en total {listQuantityBaskets[item.name]} canastillas</p>
                                    <button type="button" className="iconAdd mr-2" value={item._id} onClick={handleShowBaskets}>+</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default DisplayByClient;