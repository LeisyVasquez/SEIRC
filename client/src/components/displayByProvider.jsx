import React, { useState, useEffect } from 'react';
import swal from "sweetalert2";
import api from '../axios/axios';

import { Container } from "react-bootstrap";
import '../styles/displayByClientProvider.css';

const DisplayByProvider = () => {
    useEffect(
        () => {
            getGeneralOrder()
        }, []
    );

    const [orderData, setOrderData] = useState([]);
    const [listNamesProviders, setListNamesProviders] = useState([]);
    const [listNamesProvidersSet, setListNamesProvidersSet] = useState(new Set());
    const [listQuantityBaskets, setListQuantityBaskets] = useState({});
    const [totalQuantityBaskets, setTotalQuantityBaskets] = useState(0);

    const handleShowBaskets = (e) => {
        showBaskets(e.target.value);
    }

    //Sirve para validar que el nombre validado en el onChange si sea de la lista de nombres de clientes
    function saveProvider(list) {
        const ProviderSetAux = new Set();
        for (let i = 0; i < list.length; i++) {
            //El array con los nombres de proveedores recibidos por BD  se pone en un set 
            ProviderSetAux.add(list[i]);
        }
        //El set se guarda en el hook
        setListNamesProvidersSet(ProviderSetAux)
    }

    const getGeneralOrder = () => {
        api.get(`/getGeneralOrder/proveedor`)
            .then(res => {
                if (res.status === 254) {
                    swal.fire({
                        icon: 'error',
                        title: 'Error en el servidor',
                        text: 'Por favor vuelva más tarde',
                      })
                      
                }else if(res.status === 255) {
                    swal.fire({
                        icon: 'error',
                        title: 'No hay registros',
                        text: 'Ingrese prestamos o devoluciones',
                      })
                }
                else {
                    setOrderData(res.data[0]);
                    setListNamesProviders(res.data[1]);
                    setListQuantityBaskets(res.data[2]);
                    setTotalQuantityBaskets(res.data[3]);
                    saveProvider(res.data[1]);
                }   
            })
            .catch(err => console.log(err))
    }

    const nameProvider = (e) => {
        const name = e.target.value;
        if (listNamesProvidersSet.has(name)) {
            api.get(`/getOrderByName/proveedor/${name}`)
                .then(res => {
                    if(res.status === 254){
                        swal.fire({
                            icon: 'error',
                            title: 'Error en el servidor',
                            text: 'Por favor vuelva más tarde',
                          })
                    }
                    else if(res.status === 255){
                        swal.fire({
                            icon: 'error',
                            title: 'No hay registros para ese proveedor',
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
                <Container className="labelTotal w-25 p-3">
                    Cantidad total: {totalQuantityBaskets}
                </Container>

                <h1 className="mx-auto py-3 mb-3">Visualización por proveedores</h1>

                {/* Sección de búsqueda*/}
                <div className="mb-5">
                    <input
                        type="search"
                        className="form-control w-75 m-auto"
                        placeholder="Nombre del proveedor"
                        list="listProviders"
                        onChange={nameProvider}
                    />
                    <datalist id="listProviders">
                        {listNamesProviders.map((provider) => (
                            <option>{provider}</option>
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

export default DisplayByProvider;