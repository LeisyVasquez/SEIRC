import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import swal from "sweetalert2";
import api from '../axios/axios';
import BasketsTable from './base/basketsTable';
import {getFromLocal} from '../functions/localStorage'
import '../styles/orderHistory.css'


const OrderHistory = () => {

    let [historyGeneral, setHistoryGeneral] = useState([]);
    const [namesByHistory, setNamesByHistory] = useState([]);
    const [hoursByHistory, setHoursByHistory] = useState([]);
    const [typeUser,setTypeUser] = useState("");

    useEffect(() => {
        comprobation();
        setTypeUser(getFromLocal('typeUser'));
        getHistory();
    }, [])

    function comprobation(){
        api.post('/routeComprobation',{typeUser:['administrador','superUsuario']},{headers:{'authorization':`Bearer ${getFromLocal('tokenUser')}`}
    })
        .then((res)=>{
            if(res.status===201) window.location.href = '/notAuthorized'
        }).catch((err)=>{
            window.location.href = '/notAuthorized'
        });
    }


    //Petiión al servidor
    const getHistory = () => {
        console.log(typeUser)
        api.get(`/getHistoryByTypeUser/${getFromLocal('typeUser')}`)
            .then(res => {
                setHistoryGeneral(res.data.historyGeneral);
                setNamesByHistory(res.data.namesByHistory);
                setHoursByHistory(res.data.hoursByHistory);
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

    //Llamada y función para mostrar la alerta con las canastillas
    const handleShowBaskets = (e) => {
        showBaskets(e.target.value);
    }
    const showBaskets = (idCard) => {
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

    //Filtrar por nombre
    const filterName = (e) => {
        if (namesByHistory.includes(e.target.value))
            setHistoryGeneral(historyGeneral.filter(cards => cards.name === e.target.value));
        else getHistory()
        if (!e.target.value) document.getElementById("form").reset();
    }

    //Filtrar por tipo de movimiento
    const filterMovemenType = (e) => {
        let valueInput = e.target.value;
        if (valueInput === 'Préstamo') valueInput = 'prestamo'
        if (valueInput === 'Devolución') valueInput = 'devolucion'
        if (valueInput === 'prestamo' || valueInput === 'devolucion')
            setHistoryGeneral(historyGeneral.filter(cards => cards.movemenType === valueInput));
        else {
            getHistory();
            document.getElementById("form").reset();
        }
    }

    //Filtrar por fecha 
    const filterDate = (e) => {
        const valueInput = e.target.value;
        const split = valueInput.split("-")
        const date = `${split[2]}/${split[1]}/${split[0]}`;
        const filterD = historyGeneral.filter(cards => cards.date === date);
        setHistoryGeneral(filterD);
        if (filterD.length === 0) {
            swal.fire({
                icon: 'warning',
                title: 'No hay historiales en la fecha seleccionada',
                confirmButtonText: "Entendido"
            })
            getHistory()
            document.getElementById("form").reset();
        }
    }

    //Filtrar por hora
    const filterHour = (e) => {
        const valueInput = e.target.value;
        const filterH = historyGeneral.filter(cards => cards.hour === valueInput)
        const inputLength = valueInput.length;

        if (hoursByHistory.includes(valueInput))
            setHistoryGeneral(filterH);
        else if (inputLength === 5) {
            swal.fire({
                icon: 'warning',
                title: 'No hay historiales en la hora seleccionada',
                confirmButtonText: "Entendido"
            })
            getHistory()
            document.getElementById("form").reset();
        }
        if (!valueInput) {
            document.getElementById("form").reset()
            getHistory()
        };
    }


    return (
        <div className="orderHistory">
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-70">
                <BasketsTable />
                <h1 className="mx-auto mb-4">Historiales {typeUser === 'cliente'?'clientes':'proveedores'}</h1>

                {/* Sección de filtros*/}
                <div className="w-75 mx-auto mb-4">
                    <form id="form">
                        <input
                            type="search"
                            className="form-control mb-4 mr-3"
                            placeholder={`Nombre del ${typeUser}`}
                            list="names"
                            onChange={filterName}
                        />
                        <datalist id="names">
                            {
                                namesByHistory.map((name) =>
                                    <option>{name}</option>
                                )
                            }
                        </datalist>
                        <div class="input-group">
                            <Form.Group >
                                <Form.Control as="select" onChange={filterMovemenType}>
                                    <option>Tipo de movimiento</option>
                                    <option>Préstamo</option>
                                    <option>Devolución</option>
                                </Form.Control>
                            </Form.Group>
                            <input type="date" className="form-control ml-4" placeholder="Contraseña" onChange={filterDate} />
                            <input
                                type="search"
                                className="form-control ml-4"
                                placeholder="Hora"
                                list="hoursHistorys"
                                onChange={filterHour}
                            />
                            <datalist id="hoursHistorys">
                                {
                                    hoursByHistory.map((hour) =>
                                        <option>{hour}</option>
                                    )
                                }
                            </datalist>
                        </div>
                    </form>
                </div>

                {/* Tarjetas con los historiales*/}
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {
                        historyGeneral.map((data) =>
                            <div className="col">
                                <div className=" card h-100 w-100">
                                    <div className="card-body">

                                        <div className="h-25">
                                            <h5 className="card-title" id="nombre">{data.name}</h5>
                                        </div>
                                        <p className="card-text">{data.movemenType === "prestamo" ? "Préstamo" : "Devolución"}</p>
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

export default OrderHistory;